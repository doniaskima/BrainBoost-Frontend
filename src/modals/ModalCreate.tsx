import React, { useState } from 'react';

const ModalCreate = ({ createProject, isShowCreate, setShowCreate }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  const closeModal = () => {
    setShowCreate(false);
  };

  const handleCreate = () => {
    createProject(name, description);
    setName('');
    setDescription('');
  };

  return (
    <div className={`modal ${isShowCreate ? 'show' : ''}`}>
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Create Project</h5>
            <button type="button" className="close" onClick={closeModal}>
              <span>&times;</span>
            </button>
          </div>
          <div className="modal-body">
            <form>
              <div className="form-group">
                <label htmlFor="name">Name</label>
                <input
                  id="name"
                  type="text"
                  className="form-control"
                  placeholder="Please enter project name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label htmlFor="description">Description</label>
                <textarea
                  id="description"
                  className="form-control"
                  style={{ height: '100px' }}
                  placeholder="Please enter project description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                ></textarea>
              </div>
            </form>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-primary" onClick={handleCreate}>
              Create
            </button>
            <button type="button" className="btn btn-secondary" onClick={closeModal}>
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalCreate;
