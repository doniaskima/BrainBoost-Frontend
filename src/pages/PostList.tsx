import React, { useEffect, useState } from 'react'
import WrapperProject from '../components/Tasks/WrapperProject'
import CreatePost from '../components/Post/CreatePost'
import { useParams } from 'react-router';
import axios from 'axios';
import { toast } from 'react-toastify';
import { socket } from '../socket';
import { BASE_URL } from '../utils/utils';
import moment from 'moment';
import PostItem from '../components/Post/PostItem';

export default function PostList() {
    const { projectId } = useParams();
    const [listOnline, setListOnline] = useState([]);
    const [postList, setPostList] = useState([]);
    console.log(postList)
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
      axios
        .post(`${BASE_URL}/api/posts/addPost`, {
          projectId: projectId,
          content: content,
        })
        .then(async (res) => {
          toast.success('Successfully created a new post');
          console.log(res);
          socket.emit('createdPost', {
            postList: res.data.data,
            roomId: projectId,
          });
        })
        .catch((err) => {
          toast.error('Failed to create the post!');
        });
    };

    const getListPost = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/api/posts/getPost`, {
          params: {
            projectId: projectId,
          },
        });
        setPostList(response.data.data);
      } catch (error) {
         console.log(error);
      }
      try {
        const response = await axios.get(`${BASE_URL}/api/users/getUserInfo`);
        setUser(response.data.data);
      } catch (error) {
        toast.error('Failed to retrieve user information!');
      }
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
        </div>
        </WrapperProject>
    </div>
  )
}
