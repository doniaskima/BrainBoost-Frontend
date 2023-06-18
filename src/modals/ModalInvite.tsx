import React, { useState } from 'react';
import { Button, Modal, ModalBody, ModalFooter } from 'reactstrap';
import { BASE_URL } from '../utils/utils';
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

  const inviteMember = (email: string) => {
    axios
      .post(`${BASE_URL}/api/project/inviteJoinProject`, {
        projectId: projectId,
        emailInvite: email,
      })
      .then((res) => {
        console.log(res);
        toast.success('Invitation to join the project has been sent');
      })
      .catch((err) => {
        console.log(err);
        console.log(email);
        console.log(projectId);
        toast.error(err.response?.data?.error || 'An unexpected error occurred');
      });
  };

  function validateEmail(email: string) {
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
            <h2 className="text-black">Invite your team</h2>
            <p className="invite-team-subtitle">
              Trello makes teamwork your best work. Invite your new team members to get going!
            </p>
            <div className="invite-team-input-container">
              <input
                type="text"
                id="email-member"
                placeholder="admin@gmail.com"
                data-test-id="add-members-input"
                className="inputbox-input mt-4 mb-4"
                onChange={(e) => {
                  let email = e.target.value;
                  if (validateEmail(email)) {
                    setCheckMail(true);
                  } else {
                    setCheckMail(false);
                  }
                }}
                style={{ minWidth: '2px' }}
              />
              <div className="invite-team-tip">
                <strong>Pro tip!</strong> Paste as many emails here as needed.
              </div>
            </div>
          </div>
        </ModalBody>
        <ModalFooter>
          <button
            data-test-id="team-invite-submit-button"
            onClick={() => {
              let email = (document.getElementById('email-member') as HTMLInputElement).value;
              inviteMember(email);
              setState(false);
            }}
            className="btn btn-info"
            disabled={!checkMail}
          >
            Invite to Workspace
          </button>
          <Button color="primary" onClick={toggle}>
            Close
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
};

export default ModalInvite;
