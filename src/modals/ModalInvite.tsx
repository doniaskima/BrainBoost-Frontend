import React, { useState } from 'react';
import { Button, Modal, ModalBody, ModalFooter } from 'reactstrap';
import { BASE_URL } from "../utils/utils"
import axios from 'axios';
import { toast } from 'react-toastify';

interface ModalInviteProps {
  isOpen: boolean;
  toggle: () => void;
  state: boolean;
  setState: Function;
  projectId?: string | undefined;
}

const ModalInvite: React.FC<ModalInviteProps> = ({
  isOpen,
  toggle,
  state,
  setState,
  projectId,
}) => {
  const [checkMail, setCheckMail] = useState(false);
  const [email, setEmail] = useState('');

  const inviteMember = (email) => {
    axios.post(`${BASE_URL}/project/inviteJoinProject`, {
      projectId: projectId,
      emailInvite: email,
    })
    .then((res) => {
      toast.success('Invitation to join the project has been sent');
    })
    .catch((err) => {
      toast.error(
        err.response?.data?.error || 'An unexpected error occurred',
      );
    });
  };

  function validateEmail(email) {
    const re =
      /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    if (validateEmail(e.target.value)) {
      setCheckMail(true);
    } else {
      setCheckMail(false);
    }
  };

  return (
    <div className="modal-create">
      <Modal
        isOpen={isOpen}
        toggle={toggle}
        className="modal-create-toptic"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <ModalBody>
          <div className="invite-team-container">
            <h2 className="invite-team-title">Invite your team</h2>
            <p className="invite-team-subtitle">
              Trello makes teamwork your best work. Invite your new team members to get going!
            </p>
            <div className="invite-team-input-container">
              <input
                type="email"
                id="email-member"
                placeholder="admin@gmail.com"
                data-test-id="add-members-input"
                className={`invite-team-input ${checkMail ? '' : 'invalid'}`}
                onChange={handleInputChange}
              />
              <div className="invite-team-tip">
                <strong>Pro tip!</strong> Paste as many emails here as needed.
              </div>
            </div>
            <button
                data-test-id="team-invite-submit-button"
                onClick={() => inviteMember(email)} // Pass the email as an argument to inviteMember
                className={`invite-team-button ${checkMail ? '' : 'disabled'}`}
                disabled={!checkMail}
            >
              Invite to Workspace
            </button>

          </div>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={toggle}>
            Close
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
};

export default ModalInvite;
