import React, { useState } from 'react';
import 'react-quill/dist/quill.snow.css';
import ReactQuill from 'react-quill';
import { Button, Modal } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { blogService } from '../../services/blog/api';

const EditorBlog: React.FC = () => {

  const [content, setContent] = useState('');
  const { projectId } = useParams();
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

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
    blogService
    .addBlog({
      content: content,
    })
    .then((res) => {
      let blogId = res.data.data._id;
      console.log("blogId",blogId)
      toast.success('Success');
      console.log("blogId",blogId)
      navigate(-1);
    }).catch(() => {});
   
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
      
          <button className="bookmarkBtn" onClick={handleSaveModal}     >
  <span className="IconContainer"> 
    <svg viewBox="0 0 384 512" height="0.9em" className="icon"><path d="M0 48V487.7C0 501.1 10.9 512 24.3 512c5 0 9.9-1.5 14-4.4L192 400 345.7 507.6c4.1 2.9 9 4.4 14 4.4c13.4 0 24.3-10.9 24.3-24.3V48c0-26.5-21.5-48-48-48H48C21.5 0 0 21.5 0 48z"></path></svg>
  </span>
  <p className="text">Save</p>
</button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default EditorBlog;