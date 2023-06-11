import React, { useState } from 'react';
import { Button, Modal, ModalBody, ModalFooter } from 'reactstrap';

const ModalCreate = ({ createProject }) => {
  const [state, setState] = useState(false);

  const openModal = () => {
    setState(true);
  };

  const closeModal = () => {
    setState(false);
  };

  const handleCreateProject = () => {
    let name = document.getElementById('name').value;
    let description = document.getElementById('description').value;
    let avatar =
      'https://tuoitredoisong.net/wp-content/uploads/2019/10/dich-Project-la-gi-trong-tieng-viet.jpg';
    createProject(name, description, avatar);
  };

  return (
    <div>
      <Button color="primary" onClick={openModal}>
        Open Modal
      </Button>

      <Modal size="lg" isOpen={state} centered toggle={closeModal}>
        <ModalBody>
          {/* Modal content */}
          <form>
            {/* Form inputs */}
            <input id="name" type="text" placeholder="Please enter project name" />
            <textarea id="description" style={{ height: '100px' }} placeholder="Please enter project description"></textarea>
          </form>
        </ModalBody>
        <ModalFooter>
          {/* Modal buttons */}
          <Button color="primary" onClick={handleCreateProject}>
            Create
          </Button>
          <Button color="danger" onClick={closeModal}>
            Close
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
};

export default ModalCreate;
