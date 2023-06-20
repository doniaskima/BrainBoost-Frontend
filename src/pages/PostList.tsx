import React, { useState } from 'react'
import WrapperProject from '../components/Tasks/WrapperProject'
import CreatePost from '../components/Post/CreatePost'
import { useParams } from 'react-router';

export default function PostList() {
    const { projectId } = useParams();
    const [listOnline, setListOnline] = useState([]);
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

  };
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
            </div>
        </div>
        </WrapperProject>
    </div>
  )
}
