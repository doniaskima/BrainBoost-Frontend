import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { Button, Modal, ModalBody, ModalFooter } from 'reactstrap';
import { projectService } from '../services/projects/api';

const ModalInvite: React.FC<{
  state: boolean;
  setState: Function;
  projectId: string;
}> = ({ state, setState, projectId }) => {
  const [checkMail, setCheckMail] = useState(false);
  const inviteMember = (email) => {
    projectService
      .inviteJoinProject({
        projectId: projectId,
        emailInvite: email,
      })
      .then((res) => {
        toast.success('Invitation to join the project has been sent.');
      })
      .catch((err) => {
        toast.error(
          err.response?.data?.error || 'An unexpected error occurred.',
        );
      });
  };
  function validateEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  }
  return (
    <div className="modal-create">
      <Modal
        isOpen={state}
        className="modal-create-toptic"
        aria-labelledby="contained-modal-title-vcenter"
        centered>
        {/* <ModalHeader></ModalHeader> */}
        <ModalBody>
          <div className="org-members-page-layout-list">
            <div>
              <div className="org-members-section active">
                <div className="org-members-empty-container">
                  <div className="_2cjYZcP98PeOVS">
                    <div className="_2ozyzeoG-varDs">
                      <div className="_2-T1xH-fhIz60N">Invite your team</div>
                      <div className="_2XVmjWq1Ds8-i2">
                        Trello makes teamwork your best work. Invite your new
                        team members to get going!
                      </div>
                      <div className="_3RR1FYJnGwUrS_">
                        <label className="_3PdcYVtRuHTlvL">
                          <span className="_1h9PvS3YBMEHS9">
                            Workspace members
                          </span>
                          <div className="multi-select-autocomplete-container">
                            <div className="autocomplete-input-container is-empty">
                              <div className="autocomplete-selected">
                                <input
                                  type="text"
                                  id="email-member"
                                  placeholder="admin@gmail.com"
                                  data-test-id="add-members-input"
                                  className="autocomplete-input"
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
                              </div>
                            </div>
                            <div className="_2wzRTdc1Iq0neb">
                              <strong>Pro tip!</strong> Paste as many emails
                              here as needed.
                            </div>
                            <button
                              data-test-id="team-invite-submit-button"
                              onClick={() => {
                                let email = (document.getElementById(
                                  'email-member',
                                ) as HTMLInputElement).value;
                                inviteMember(email);
                                setState(false);
                              }}
                              className="btn btn-info"
                              disabled={checkMail ? false : true}>
                              Invite to Workspace
                            </button>
                          </div>
                        </label>
                      </div>
                    </div>
                    <div className="_3Z-f1YeQfWWnEG ml-5">
                      <div className="_3qyYZ_ffqe5APT">
                        <img
                          width="342"
                          height="256"
                          src="https://a.trellocdn.com/prgb/dist/images/organization/empty-board.d1f066971350650d3346.svg"
                          alt=""
                          role="presentation"
                        />
                        <img
                          className="_2kERTJdH-fq4Hp"
                          src="https://a.trellocdn.com/prgb/dist/images/organization/green-face.1a4590e4c12ebbbd161a.svg"
                          alt=""
                          role="presentation"
                        />
                        <img
                          className="_2AfucOdcPC0oXo"
                          src="https://a.trellocdn.com/prgb/dist/images/organization/red-face.38df5b8182a69e1e98c7.svg"
                          alt=""
                          role="presentation"
                        />
                        <img
                          className="_3mOaNaiDiY3qs_"
                          src="https://a.trellocdn.com/prgb/dist/images/organization/blue-face.3644a080c0c1fc8ab4b6.svg"
                          alt=""
                          role="presentation"
                        />
                        <img
                          className="_1ZDrdsuKzdWg_4"
                          src="https://a.trellocdn.com/prgb/dist/images/organization/purple-face.24f3616b6ae9196090b1.svg"
                          alt=""
                          role="presentation"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="org-members-section">
                <div className="org-members-empty-container">
                  <img
                    className="org-members-guest-illustration"
                    alt="Boards shared with friends"
                    src="https://a.trellocdn.com/prgb/dist/images/organization/guests.9f6e43073b1d76e08c4b.svg"
                  />
                  <div className="org-members-empty-content">
                    <h1 className="org-members-heading">
                      <span>Boards shared with friends</span>
                    </h1>
                    <p className="org-members-subheading">
                      <span>
                        If clients, contractors, or friends are added to
                        Workspace boards, they'll appear here.
                      </span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={() => setState(false)}>
            Close
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
};

export default ModalInvite;
