/* eslint-disable react-hooks/exhaustive-deps */
import moment from 'moment';
import React, { useEffect, useState } from 'react';

import { toast } from 'react-toastify';
import { useParams } from 'react-router-dom';
import socket from '../socketioClient';
import { postService } from '../services/posts/api';
import { userService } from '../services/user/api';
import WrapperProject from '../components/Tasks/WrapperProject';
import PostItem from '../components/Post/PostItem';
import Friend from '../components/member/Friend';
import CreatePost from '../components/Post/CreatePost';

const PostList: React.FC = () => {
  const { projectId } = useParams();
 
  const [listOnline, setListOnline] = useState([]);
  useEffect(() => {
    socket.emit('joinRoom', { roomId: projectId });
    socket.emit('loadUserOnline');
    socket.on('reloadUserOnline', (data) => {
      setListOnline(data.data);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const [postList, setPostList] = useState([]);
  const [user, setUser] = useState({
    userId: '',
    role: '',
    avatar: '',
    language: '',
    email: '',
    username: '',
    birthday: '',
  });

  const addPost = (content) => {
    postService
      .addPost({
        projectId: projectId,
        content: content,
      })
      .then(async (res) => {
        toast.success('Đã tạo post mới thành công');
        socket.emit('createdPost', {
          postList: res.data.data,
          roomId: projectId,
        });
      })
      .catch((err) => {
        toast.error('Lỗi không đăng được bài!');
      });
  };
  const getListPost = async () => {
    postService
      .getPosts(projectId)
      .then((response) => {
        setPostList(response.data.data);
      })
      .catch((err) => {});
    userService
      .getUserInfo()
      .then((response) => {
        setUser(response.data.data);
      })
      .catch((err) => {
        toast.error('Không xác định được user!');
      });
  };
  useEffect(() => {
    getListPost();
    socket.on('loadPost', (data) => {
      console.log(data);
      setPostList(data.data.postList);
    });
  }, []);
  return (
    <div className="post-list">
      <WrapperProject>
        <div className="d-flex flex-row justify-content-start">
          <div className="col-8 mx-2">
            <CreatePost
              author={{ name: user.username, avatar: user.avatar }}
              funcCreatePost={(content) => {
                addPost(content);
              }}
            />
            {postList.map((post, index) => (
              <PostItem
                key={index}
                {...post}
                userId={user.userId}
                date={moment(post.createdAt).format('YYYY-MM-DD')}
              />
            ))}
          </div>
          <Friend projectId={projectId} listOnline={listOnline} />
        </div>
      </WrapperProject>
    </div>
  );
};
export default PostList;
