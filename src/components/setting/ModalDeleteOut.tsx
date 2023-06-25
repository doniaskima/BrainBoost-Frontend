import React from 'react';
import { useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import { projectService } from "../../../services/projects/api";
import socket from '../../../socketioClient';
import { Input } from 'reactstrap';
import { toast } from 'react-toastify';

const ModalDeleteOut: React.FC<any> = (props: any) => {
  const [backGround, setBackGround] = useState("#ff6875");

  const deleteProject = () => {
    projectService.deleteProject({ projectId: props.project.projectId }).then((res) => {
      toast.success("Successfully deleted project");
      socket.emit('loadMember', res.data.data.listUser);
      window.location.href = "/admin/index";
    }).catch((err) => {
      toast.error("Error when leaving/deleting project!");
    });
  }

  const outProject = () => {
    projectService.deleteMember({ projectId: props.project.projectId, memberId: props.userId }).then((res) => {
      toast.success("Successfully left project!");
      window.location.href = "/admin/index";
    }).catch((err) => {
      toast.error('Error! Unable to leave project temporarily!')
    })
  }

  return (
    <>
      <Modal
        size={props.size ? 'sm' : props.size}
        show={props.show} // false: Not displayed, true: displayed
        onHide={() => {
          props.funcQuit()
        }}
        scrollable
        centered>
        <Modal.Header closeButton>
          <Modal.Title>
              <h3>{props.title === 1 ? "DELETE PROJECT" : "LEAVE PROJECT"}</h3>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="row d-flex justify-content-center">
              <div className="col-10">
                  <div className="row">
                    <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" className="bi bi-exclamation-triangle" viewBox="0 0 16 16">
                            <path d="M7.938 2.016A.13.13 0 0 1 8.002 2a.13.13 0 0 1 .063.016.146.146 0 0 1 .054.057l6.857 11.667c.036.06.035.124.002.183a.163.163 0 0 1-.054.06.116.116 0 0 1-.066.017H1.146a.115.115 0 0 1-.066-.017.163.163 0 0 1-.054-.06.176.176 0 0 1 .002-.183L7.884 2.073a.147.147 0 0 1 .054-.057zm1.044-.45a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566z"/>
                            <path d="M7.002 12a1 1 0 1 1 2 0 1 1 0 0 1-2 0zM7.1 5.995a.905.905 0 1 1 1.8 0l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995z"/>
                        </svg>
                        <span className="ml-3">Type <b>"{props.project.nameProject}"</b> to {props.title === 1? "delete" : "leave"} project <b>{props.project.nameProject}</b></span>
                  </div>
                    <div className="row mt-3">
                        <Input id="text-confirm" onChange={(e) => {
                            if(e.target.value !== "" && e.target.value.toLowerCase() === props.project.nameProject.toLowerCase()) {
                                setBackGround("#fa0019");
                            }   else {
                                setBackGround("#ff6875");
                            }
                        }}></Input>
                    </div>
              </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
            <div className="row d-flex justify-content-center">
                <div className="col lg-6">
                <Button
                    style={{
                    border: 'none',
                    width: '100%',
                    backgroundColor: "#eaeaea",
                    color: "#777777",
                    }}
                    onClick={(e) => {
                    props.funcQuit();
                    }}>
                    <b className="text-dark">Cancel</b>
                </Button>
                </div>
                <div className="col lg-6">
                <Button
                    style={{
                    border: 'none',
                    width: '100%',
                    backgroundColor: backGround,
                    color: "white",
                    }}
                    disabled={backGround === "#ff6875" ? true : false}
                    onClick={(e) => {
                      if(props.title === 1) {
                        deleteProject();
                      } else {
                        outProject();
                      }
                        props.funcYes();
                    }}>
                    <b>Confirm</b>
                </Button>
                </div>
            </div>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ModalDeleteOut;
