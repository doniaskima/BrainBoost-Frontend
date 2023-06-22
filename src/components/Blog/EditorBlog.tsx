import React, { useState } from 'react';
import 'react-quill/dist/quill.snow.css';
import ReactQuill from 'react-quill';
import { Button, Modal } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import { BASE_URL } from '../../utils/utils';


const EditorBlog: React.FC = () => {
  const [content, setContent] = useState('');
  const { projectId } = useParams();
  const [showModal, setShowModal] = useState(false);

  const modules = {
    toolbar: [
      [{ header: [1, 2, false] }],
      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
      [{ list: 'ordered' }, { list: 'bullet' }],
      ['link', 'image'],
      ['clean'],
    ],
  };

  const formats = [
    'header',
    'bold',
    'italic',
    'underline',
    'strike',
    'blockquote',
    'list',
    'bullet',
    'link',
    'image',
  ];

  const onEditorChange = (value) => {
    setContent(value);
  };

  const saveContent = () => {
    if (content !== '') {
      setShowModal(true);
    } else {
      toast.warning('Please enter content!!!');
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleSaveModal = () => {
    // Perform save functionality here
    // Example axios request:
    axios.post(`${BASE_URL}/save-content`, { content })
      .then((response) => {
        console.log('Save response:', response.data);
        // Handle success
        toast.success('Content saved successfully!');
      })
      .catch((error) => {
        console.error('Save error:', error);
        // Handle error
        toast.error('Failed to save content.');
      });

    setShowModal(false);
  };

  return (
    <div className="editor-blog">
      <h2 className="editor-blog-title">Create a Stunning Blog Post</h2>
      <div className="editor-blog-wrapper">
        <ReactQuill
          value={content}
          onChange={onEditorChange}
          modules={modules}
          formats={formats}
          className="editor-blog-content"
          placeholder="Write something amazing..."
        />
      </div>
      <Button className="editor-blog-save" variant="primary" onClick={saveContent}>
        Save
      </Button>

      <Modal show={showModal} onHide={handleCloseModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Save</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Are you sure you want to save the content?</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleSaveModal}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default EditorBlog;
