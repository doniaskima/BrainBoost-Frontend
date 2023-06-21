import React, { useEffect, useState } from 'react';
import WrapperProject from '../components/Tasks/WrapperProject';
import CreatePost from '../components/Post/CreatePost';
import { useParams } from 'react-router';
import axios from 'axios';
import { toast } from 'react-toastify';
import { BASE_URL } from '../utils/utils';
import moment from 'moment';
import PostItem from '../components/Post/PostItem';
import { useQuery, useMutation } from 'react-query';

export default function PostList() {
  const [userId, setUserId] = useState('');
  const { projectId } = useParams();

  const { data: postList, isLoading: isPostListLoading, isError: isPostListError, refetch: refetchPostList } = useQuery('postList', () =>
    axios.get(`${BASE_URL}/api/posts/getPosts`)
  );

  const fetchUserId = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/users/getUserId`);
      console.log('User ID Response:', response);
      const userId = response.data.id; // Update this line
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

  const addPostMutation = useMutation((content) =>
    axios.post(`${BASE_URL}/api/posts/addPost`, {
      projectId: projectId,
      content: content,
    })
  );

  const addPost = (content) => {
    addPostMutation.mutate(content);
  };

  useEffect(() => {
    fetchUserId();
  }, []);

  useEffect(() => {
    if (addPostMutation.isSuccess) {
      toast.success('Successfully created a new post');
      refetchPostList();
    }
    if (addPostMutation.isError) {
      toast.error('Failed to create the post!');
    }
  }, [addPostMutation.isSuccess, addPostMutation.isError]);

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
            {isPostListLoading ? (
              <div>Loading...</div>
            ) : isPostListError ? (
              <div>Error loading post list</div>
            ) : (
              postList.map((post, index) => (
                <PostItem
                  key={index}
                  {...post}
                  userId={user.userId}
                  date={moment(post.createdAt).format('YYYY-MM-DD')}
                />
              ))
            )}
          </div>
        </div>
      </WrapperProject>
    </div>
  );
}
