import React, { useEffect, useState } from 'react';
import WrapperProject from '../components/Tasks/WrapperProject';
import CreatePost from '../components/Post/CreatePost';
import { useParams } from 'react-router';
import axios from 'axios';
import { toast } from 'react-toastify';
import { BASE_URL } from '../utils/utils';
import moment from 'moment';
import PostItem from '../components/Post/PostItem';

export default function PostList() {
  const [userId, setUserId] = useState('');
  const { projectId } = useParams();
  const [listOnline, setListOnline] = useState([]);
  const [postList, setPostList] = useState([]);
  const [user, setUser] = useState('');

  const fetchUserId = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/users/getUserId`);
      console.log('User ID Response:', response);
      const userId = response.data.id;
      console.log('User ID:', userId);
      if (userId) {
        setUserId(userId);
      } else {
        toast.error('User ID is missing in the response');
      }
    } catch (error) {
      toast.error('Login session ended');
    }
  };

  const addPost = (content) => {
    axios
      .post(`${BASE_URL}/api/posts/addPost`, {
        projectId: projectId,
        content: content,
      })
      .then(async (res) => {
        toast.success('Successfully created a new post');
        setPostList(res.data);
        console.log(res.data);
      })
      .catch((err) => {
        toast.error('Failed to create the post!');
      });
  };

  const getListPost = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/users/getUserInfo`, {
        params: {
          userId: userId,
        },
      });
      setUser(response.data.data);
      console.log(response.data);
    } catch (error) {
      toast.error('Failed to retrieve user information!');
    }
    try {
      const response = await axios.post(`${BASE_URL}/api/posts/getPost`, {
        projectId: projectId,
      });
      setPostList(response.data || []);
      console.log("setListPosts",response.data)
    } catch (error) {
      toast.error('Failed to retrieve posts!');
    }

  };

  useEffect(() => {
    fetchUserId();
    getListPost();
  }, []);

  return (
    <div className="post-list">
      <WrapperProject>
        <div className="d-flex flex-row justify-content-start">
          <div className="col-8 mx-2">
            <CreatePost
              author={user ? { name: user.name, avatar: user.avatar } : null}
              funcCreatePost={(content) => {
                addPost(content);
              }}
            />
            {postList.map((post) => (
              <PostItem
                key={post._id}
                {...post}
                userId={userId}
                date={moment(post.createdAt).format('YYYY-MM-DD')}
              />
            ))}
          </div>
        </div>
      </WrapperProject>
    </div>
  );
}
