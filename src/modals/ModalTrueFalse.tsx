import React from 'react';
import { Modal, Button } from 'react-bootstrap';

interface Props {
  size?: 'sm' | 'lg' | 'xl';
  show: boolean;
  data: {
    title: string;
    button_1: {
      title: string;
    };
    button_2: {
      title: string;
    };
  };
  onlyTitle?: boolean;
  setClose: () => void;
  funcOnHide?: () => void;
  funcButton_1: () => void;
  funcButton_2: () => void;
}

const ModalTrueFalse: React.FC<Props> = ({
  size,
  show,
  data,
  onlyTitle,
  setClose,
  funcOnHide,
  funcButton_1,
  funcButton_2,
}: Props) => {
  const handleHide = () => {
    setClose();
    if (funcOnHide) {
      funcOnHide();
    }
  };

  const handleButton1Click = () => {
    funcButton_1();
    setClose();
  };

  const handleButton2Click = () => {
    funcButton_2();
    setClose();
  };

  return (
    <>
      <Modal
        className="modal-confirm"
        size={size}
        show={show}
        onHide={handleHide}
        scrollable
        centered
      >
        <Modal.Header closeButton className="d-flex flex-column">
          <div className="icon-box">
            <i className="fas fa-exclamation-circle"></i>
          </div>
          <h4 className="modal-title w-100 mt-4 ">Are you sure?</h4>
        </Modal.Header>
        <Modal.Body>
          <p>
            {onlyTitle
              ? data.title
              : `Do you really want to ${data.title}? This process cannot be undone.`}
          </p>
        </Modal.Body>
        <Modal.Footer className="d-flex justify-content-center">
          <Button
            variant="secondary"
            onClick={handleButton1Click}
          >
            {data.button_1.title}
          </Button>
          <Button
            variant="danger"
            onClick={handleButton2Click}
          >
            {data.button_2.title}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ModalTrueFalse;
