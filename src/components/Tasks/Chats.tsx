/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { UncontrolledTooltip } from 'reactstrap';
 
import { useNavigate } from 'react-router-dom';
import socket from '../../socketioClient';
import { chatService } from '../../services/chat/api';
import { userService } from '../../services/user/api';

const Chat: React.FC = () => {
  const navigate = useNavigate();
  const [targetId, setTargetId] = useState(null);
  const [roomSocket, setRoomSocket] = useState(null);
  const [listContent, setlistContent] = useState([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [listChat, setlistChat] = useState([]);
  const [info, setInfo] = useState({ avatar: '', username: '' });
  const [userId, setUserId] = useState(null);
  const [avatar, setAvatar] = useState<
    Array<{
      avatar: string;
      _id: string;
    }>
  >([]);
  const hashCode = (string) => {
    var hash = 0,
      i,
      chr;
    if (string.length === 0) return hash;
    for (i = 0; i < string.length; i++) {
      chr = string.charCodeAt(i);
      hash = (hash << 5) - hash + chr;
      hash |= 0;
    }
    return hash;
  };
  useEffect(() => {
    socket.on('loadChat', (data) => {
      setlistContent(data.data.chatList);
      let div = document.getElementById('list-content-chat');
      div.scrollTop = div?.scrollHeight;
    });
    socket.emit('joinRoom', { roomId: roomSocket });
    chatService
      .getChat({ projectId: targetId })
      .then((res) => {
        setlistContent(res.data.data);
        let div = document.getElementById('list-content-chat');
        div.scrollTop = div?.scrollHeight;
      })
      .catch((err) => {});
  }, [targetId]);
  useEffect(() => {
    userService
      .getUserInfo()
      .then((res) => {
        setUserId(res.data.data.userId);
        setInfo(res.data.data);
      })
      .catch((err) => {
        toast.error('Unable to load data!');
      });
  }, []);
  useEffect(() => {
    chatService
      .getListChat()
      .then((res) => {
        let data = res.data.data;
        let array = data.projectChat;
        data.friendChat.forEach((element) => {
          element.type = 'chatUser';
          array.push(element);
        });
        setlistChat(array);
        let _avatar = [];
        if (array[0]?.type === 'chatUser') {
          _avatar.push({
            avatar: array[0]?.avatar,
            _id: array[0]?._id,
          });
        } else {
          array[0]?.users?.forEach((user) => {
            _avatar.push({
              avatar: user.avatar,
              _id: user?._id,
            });
          });
        }
        setAvatar(_avatar);
        setTargetId(array[0]._id);
      })
      .catch(() => {});
  }, [userId]);
  const addChat = (content: String) => {
    chatService
      .addChat({
        projectId: targetId,
        friendId: targetId,
        userId: userId,
        content: content,
      })
      .then((res) => {
        setlistContent(res.data.data);
        socket.emit('chatting', {
          chatList: res.data.data,
          roomId: roomSocket,
        });
      })
      .catch((err) => {});
  };
  return (
    <div className="chat pt-5 pt-md-8 card">
      <div className="chat-container">
        <div className="list-chat">
          <div className="info-user-chat">
            <img src={info.avatar} className="avatar-chat" alt="" />
            <span>{info.username}</span>
          </div>
     
          {listChat.map((item, index) => (
            <div
              className={
                index === activeIndex
                  ? 'list-user-chat active'
                  : 'list-user-chat'
              }
        
              onClick={() => {
                if (item.type) {
                  setRoomSocket(hashCode(item._id) + hashCode(userId));
                } else {
                  setRoomSocket(item._id);
                }
                setTargetId(item._id);
                setActiveIndex(index);
                let _avatar = [];
                if (item?.type === 'chatUser') {
                  _avatar.push({
                    avatar: item?.avatar,
                    _id: item?._id,
                  });
                } else {
                  item?.users?.forEach((user) => {
                    _avatar.push({
                      avatar: user?.avatar,
                      _id: user?._id,
                    });
                  });
                }
                setAvatar(_avatar);
              }}>
              <div className="avatar-chat-group d-flex justify-content-center align-items-center">
                <img
                  src={item.avatar}
                  className="avatar-chat-small-first"
                  alt=""
                />
              </div>
              <div className="name-contentchat">
                <span>{item.name ? item.name : item.username}</span>
              </div>
            </div>
          ))}
        </div>
        <div className="content-chat">
          <div className="info-current-chat">
            <div className="info-current-left">
              {avatar.map((src) => (
                <img
                  style={{ cursor: 'pointer' }}
                  onClick={() => {
                    navigate('/admin/user-profile/' + src._id);
                  }}
                  src={
                    src.avatar ||
                    'https://randomuser.me/api/portraits/men/42.jpg'
                  }
                  className="avatar-chat"
                  alt=""
                />
              ))}
            </div>
            
          </div>
          <div className="list-content-chat" id="list-content-chat">
            {listContent.map((item) =>
              item.userId._id === userId ? (
                <div className="info-current">
                  <span>{item.content}</span>
                  <UncontrolledTooltip delay={0} target="user-id1">
                    {item.userId.username}
                  </UncontrolledTooltip>
                  <img
                    src={item.userId.avatar}
                    className="avatar-chat"
                    alt=""
                    id="user-id1"
                  />
                </div>
              ) : (
                <div className="info-current-friend">
                  <img
                  
                    src={item.userId.avatar}
                    className="avatar-chat"
                    alt=""
                    id="user-id"
                  />
                  <UncontrolledTooltip delay={0} target="user-id">
                    {item.userId.username}
                  </UncontrolledTooltip>
                  <span>{item.content}</span>
                </div>
              ),
            )}
          </div>
          <div className="flex">
            <input
              type="text"
              className="form-control bg-white border-1 small text-dark"
              placeholder="Type a message..."
              aria-label="Search"
              aria-describedby="basic-addon2"
              id="input-message"
              onChange={(event) => {
                event.target.onkeyup = (key) => {
                  let content = document.getElementById(
                    'input-message',
                  ) as HTMLInputElement;
                  if (key.keyCode === 13) {
                    addChat(content.value);
                    content.value = '';
                  }
                };
              }}
            />
            <div className="input-group-append">
            <button className="send-btn" onClick={(event) => {
                  let content = document.getElementById(
                    'input-message',
                  ) as HTMLInputElement;
                  addChat(content.value);
                  content.value = '';
                }}>
  <div className="svg-wrapper-1">
    <div className="svg-wrapper">
      <svg height="24" width="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path d="M0 0h24v24H0z" fill="none"></path>
        <path d="M1.946 9.315c-.522-.174-.527-.455.01-.634l19.087-6.362c.529-.176.832.12.684.638l-5.454 19.086c-.15.529-.455.547-.679.045L12 14l6-8-8 6-8.054-2.685z" fill="currentColor"></path>
      </svg>
    </div>
  </div>
  <span>Send</span>
</button>
              
            </div>
          </div>
        </div>
      </div>
      
    </div>
  );
};

export default Chat;
