import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import ReplayIcon from '@mui/icons-material/Replay';
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router";
import CircularProgress from '@mui/material/CircularProgress';
import axios from 'axios';

const ListAllVideosTrainer: React.FC = () => {
  const navigate = useNavigate();
  const [videos, setVideos] = useState([]);
 

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3002/api/video/getAllVideoByCreator/64a014c661eaaa93e4476fea');
        console.log(response.data);
        console.log("this response.data.data",response.data.videos)
        setVideos(response.data.videos)
      } catch (error) {
        // Handle any errors that occurred during the request
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

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
          videos?.map(item => (
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
