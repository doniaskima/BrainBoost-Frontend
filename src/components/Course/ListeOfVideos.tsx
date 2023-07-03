import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import ReplayIcon from '@mui/icons-material/Replay';
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import CircularProgress from '@mui/material/CircularProgress';

const ListAllVideosTrainer: React.FC = () => {

  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getallVideobycreateur());
  }, []);

  console.log(videoDataCreator);

  return (
    <>
      <div className="boxxx" style={{ marginBottom: "50px" }}>
        <div className="card-header">
          <h2 style={{ fontSize: "2rem" }}>List of all Videos</h2>
        </div>
        {status === "loading" ? (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              marginTop: "81px"
            }}
          >
            <CircularProgress />
          </div>
        ) : (
          videoDataCreator?.videos?.map(item => (
            <div
              style={{
                padding: "29px",
                backgroundColor: "#F8F8F9",
                margin: "38px 39px 11px",
                borderRadius: "14px"
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <div className="media align-items-center" style={{ display: "flex" }}>
                  <video controls src={'http://localhost:8000/' + item?.VideoUrl} style={{ width: "303px" }}></video>
                  <div className="media-body" style={{ padding: "22px" }}>
                    <div>
                      <span className="text-muted"><b>Title: </b>{item?.title}</span>{' '}
                      <div>
                        <span className="text-muted"><b>Category: </b>{item?.category}</span>  {'   '}
                        <br />
                        <span className="text-muted"><b>Duration: </b> {item?.duration}</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: "16px", padding: "29px", justifyContent: "center" }}>
                  <Button variant="outlined" startIcon={<ReplayIcon />} onClick={() => { navigate(`/formateur/updatevideo/${item._id}`) }}>EDIT</Button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </>
  );
};

export default ListAllVideosTrainer;
