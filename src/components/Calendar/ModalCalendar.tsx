import React from 'react';
import { Modal } from 'react-bootstrap';

const ModalCalendar: React.FC<any> = (props: any) => {
  // props: funcQuit(), show, date

  const formatDate = () => {
    let date = props.date.getDate().toString();
    let month = (props.date.getMonth() + 1).toString();
    let year = props.date.getFullYear().toString();
    return (
      (date.length < 2 ? '0' + date : date) +
      '/' +
      (month.length < 2 ? '0' + month : month) +
      '/' +
      year
    );
  };

  const listTaskUnfinished = () => {
    let list = [];
    props.listTaskId.map((value, i) => {
      if (
        props.data.listTask[value].typeTask !== 'Complete' &&
        equalDate(
          new Date(props.data.listTask[value].deadline),
          new Date(Date.now())
        ) !== -1
      ) {
        list.push(props.data.listTask[value]);
      }
    });
    return list;
  };

  const listTaskFinished = () => {
    let list = [];
    props.listTaskId.map((value, i) => {
      if (props.data.listTask[value].typeTask === 'Complete') {
        list.push(props.data.listTask[value]);
      }
    });
    return list;
  };

  const listTaskOverdeadline = () => {
    let list = [];
    props.listTaskId.map((value, i) => {
      if (
        props.data.listTask[value].typeTask !== 'Complete' &&
        equalDate(
          new Date(props.data.listTask[value].deadline),
          new Date(Date.now())
        ) === -1
      ) {
        list.push(props.data.listTask[value]);
      }
    });
    return list;
  };

  function equalDate(date1, date2) {
    // date1 > date2: 1; date1 === date2: 0; date1 < date2: -1
    let d1 = date1.getDate(),
      m1 = date1.getMonth(),
      y1 = date1.getFullYear();
    let d2 = date2.getDate(),
      m2 = date2.getMonth(),
      y2 = date2.getFullYear();
    if (y1 < y2) {
      return -1;
    } else if (y1 > y2) {
      return 1;
    } else {
      // y1 === y2
      if (m1 < m2) {
        return -1;
      } else if (m1 > m2) {
        return 1;
      } else {
        if (d1 < d2) {
          return -1;
        } else if (d1 === d2) {
          return 0;
        } else {
          return 1;
        }
      }
    }
  }

  return (
    <>
      <Modal
        size="lg"
        show={props.show}
        onHide={() => {
          props.funcQuit();
        }}
        scrollable
        centered
      >
        <Modal.Header closeButton></Modal.Header>
        <Modal.Body>
          <div className="row d-flex justify-content-center mb-2">
            <div className="col-3">
              <div className="d-flex justify-content-start">
                <div
                  className="btn btn-outline-primary"
                  onClick={(e) => {
                    props.funcSelectDate(
                      new Date(
                        props.date.getFullYear(),
                        props.date.getMonth(),
                        props.date.getDate() - 1
                      )
                    );
                  }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="25"
                    height="25"
                    fill="currentColor"
                    className="bi bi-arrow-left"
                    viewBox="0 0 16 16"
                  >
                    <path
                      fillRule="evenodd"
                      d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z"
                    />
                  </svg>
                </div>
              </div>
            </div>
            <div className="col-6 d-flex justify-content-center">
              <h2 className="pt-2">{formatDate()}</h2>
            </div>
            <div className="col-3">
              <div className="d-flex justify-content-end">
                <div
                  className="btn btn-outline-primary"
                  onClick={(e) => {
                    props.funcSelectDate(
                      new Date(
                        props.date.getFullYear(),
                        props.date.getMonth(),
                        props.date.getDate() + 1
                      )
                    );
                  }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="25"
                    height="25"
                    fill="currentColor"
                    className="bi bi-arrow-right"
                    viewBox="0 0 16 16"
                  >
                    <path
                      fillRule="evenodd"
                      d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8z"
                    />
                  </svg>
                </div>
              </div>
            </div>
          </div>
          <div
            className="row d-flex justify-content-center mt-5 mb-2"
            style={{ height: '500px' }}
          >
            <div className="col-11">
              <div className="row">
                <h3 className="text-warning">Unfinished Tasks:</h3>
                <div className="row" style={{ width: '100%' }}>
                  {listTaskUnfinished().map((value, i) => {
                    return (
                      <>
                        <div
                          className="card"
                          style={{
                            width: '23%',
                            padding: '10px',
                            border: '2px solid #FFC107',
                            marginLeft: '2%',
                            marginBottom: '2%',
                          }}
                        >
                          <div className="card-body">
                            <h4 className="card-title text-priamry">
                              {value.taskname}
                            </h4>
                            <p
                              style={{
                                fontWeight: 'bold',
                                fontSize: '11px',
                                margin: '0px',
                              }}
                            >
                              <span>Project name: </span>
                              <span style={{ color: '#007BFF' }}>
                                {value.projectName}
                              </span>
                            </p>
                          </div>
                        </div>
                      </>
                    );
                  })}
                </div>
              </div>
              <div className="row mt-3">
                <h3 className="text-success">Finished Tasks:</h3>
                <div className="row" style={{ width: '100%' }}>
                  {listTaskFinished().map((value, i) => {
                    return (
                      <>
                        <div
                          className="card"
                          style={{
                            width: '23%',
                            padding: '10px',
                            border: '2px solid #08b530',
                            marginLeft: '2%',
                            marginBottom: '2%',
                          }}
                        >
                          <div className="card-body">
                            <h4 className="card-title text-priamry">
                              {value.taskname}
                            </h4>
                            <p
                              style={{
                                fontWeight: 'bold',
                                fontSize: '11px',
                                margin: '0px',
                              }}
                            >
                              <span>Project name: </span>
                              <span style={{ color: '#007BFF' }}>
                                {value.projectName}
                              </span>
                            </p>
                          </div>
                        </div>
                      </>
                    );
                  })}
                </div>
              </div>
              <div className="row mt-3">
                <h3 className="text-danger">Tasks Over Deadline:</h3>
                <div className="row" style={{ width: '100%' }}>
                  {listTaskOverdeadline().map((value, i) => {
                    return (
                      <>
                        <div
                          className="card"
                          style={{
                            width: '23%',
                            padding: '10px',
                            border: '2px solid #e22e2f',
                            marginLeft: '2%',
                            marginBottom: '2%',
                          }}
                        >
                          <div className="card-body">
                            <h4 className="card-title text-priamry">
                              {value.taskname}
                            </h4>
                            <p
                              style={{
                                fontWeight: 'bold',
                                fontSize: '11px',
                                margin: '0px',
                              }}
                            >
                              <span>Project name: </span>
                              <span style={{ color: '#007BFF' }}>
                                {value.projectName}
                              </span>
                            </p>
                          </div>
                        </div>
                      </>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default ModalCalendar;
