/* eslint-disable @typescript-eslint/no-unused-vars */
import { convertToRaw, EditorState } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import React, { useEffect, useState } from 'react';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { useParams } from 'react-router';
import { toast } from 'react-toastify';
import { Button } from 'reactstrap';

 
import axios from 'axios';
import { Assignment } from '../components/Tasks/InterfaceTask';
import { BASE_URL } from '../utils/utils';
import ModalCreateBlog from '../components/Blog/ModalCreateBlog';

const EditorBlog: React.FC = () => {
    const [userId, setUserId] = useState('');
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const [content, setContent] = useState('');
  const { projectId } = useParams();
  const [showModal, setShowModal] = useState(false);
  const [user, setUser] = useState<Assignment>(null);
  
  const onEditorStateChange = (editorState) => {
    setEditorState(editorState);
    setContent(draftToHtml(convertToRaw(editorState.getCurrentContent())));
    // console.log(draftToHtml(convertToRaw(editorState.getCurrentContent())));
  };
  
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
  useEffect(() => {
    try {
        const response =   axios.get(`${BASE_URL}/users/getUserInfo`, {
          params: {
            userId: userId,
          },
        });
        setUser({
            _id: res.data.data.userId,
            ...res.data.data,
          });
        console.log(response.data);
      } catch (error) {
        toast.error('Failed to retrieve user information!');
      }
  }, []);

  return (
    <>
      <div className="p-2 editor-blog">
        <Editor
          editorState={editorState}
          toolbarClassName="toolbarClassName"
          wrapperClassName="wrapperClassName"
          editorClassName="editorClassName"
          onEditorStateChange={onEditorStateChange}
        />
        <ModalCreateBlog
          size="xl"
          showModal={showModal}
          setShowModal={(value) => setShowModal(value)}
          content={content}
          projectId={projectId}
        />
        <Button
          className="btn-save"
          color="primary"
          onClick={() => {
            if (content !== '') {
              setShowModal(true);
            } else {
              toast.warning('Please enter content!!!');
            }
          }}>
          Save
        </Button>
      </div>
    </>
  );
};

export default EditorBlog;
