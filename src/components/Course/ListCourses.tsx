import React, { useState, useEffect } from "react";
import axios from 'axios';
import { Box, CircularProgress, useTheme, Typography } from "@mui/material";
import { DataGrid, GridToolbar, GridActionsCellItem } from "@mui/x-data-grid";
import EditIcon from '@mui/icons-material/Edit';
import Swal from 'sweetalert2';
import OndemandVideoIcon from '@mui/icons-material/OndemandVideo';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import QuizIcon from '@mui/icons-material/Quiz';
import ReplayIcon from '@mui/icons-material/Replay';
import CheckIcon from '@mui/icons-material/Check';
import { BASE_URL } from "../../utils/utils";
import DeleteIcon from '@mui/icons-material/Delete';
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";

const ListeCourFormateur = () => {
  const theme = useTheme();
  let navigate = useNavigate();
  const [courses, setCourses] = useState([]);

  const fetchCourses = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/api/courses/getAllCourses`);
      console.log(response.data);
      setCourses(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  // Use useEffect to fetch the courses data when the component mounts
  useEffect(() => {
    fetchCourses();
  }, []);
  // console.log(courses?.slice()?.sort(function (a, b) {
  //   return new Date(b?.createdAt) - new Date(a?.createdAt);
  // }));
  const handleDeleteCourse = (courseId) => {
    axios.delete(`http://localhost:3002/api/courses/deleteCourse/${courseId}`)
      .then((response) => {
        console.log(response.data); // If you want to see the response data from the server
        Swal.fire(
          'Success',
          `Successfully deleted your course`,
          'success'
        );
        // You can also choose to update the courses list here if needed
      })
      .catch((error) => {
        console.log(error);
        Swal.fire(
          'Error',
          'Failed to delete the course',
          'error'
        );
      });
  };

  const handleUpdateCourse = (courseId) => {
    axios.put(`http://localhost:3002/api/courses/updateCourse/${courseId}`, { isfinish: true })
      .then((response) => {
        console.log(response.data); // If you want to see the response data from the server
        Swal.fire(
          'Success',
          `Course creation completed and it is now visible on the platform`,
          'success'
        );
        // You can also choose to trigger any other actions or updates here if needed
      })
      .catch((error) => {
        console.log(error);
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: "Something went wrong!",
        });
      });
  };

  const sendEmail = async (email: string) => {
    if (email) {
      axios.post("http://localhost:8000/courses/informer", { email: email })
        .then(response => {
          console.log("Email sent successfully!");
        })
        .catch(error => {
          console.error("Error sending email:", error);
        });
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: "Invalid email!",
      });
    }
  };

  const columns = [
    {
      field: 'actions',
      type: 'actions',
      headerName: 'Actions',
      width: 100,
      cellClassName: 'actions',
      getActions: (params) => {
        console.log("11111111111", params);
        return [
          <Link to={"/formateur/updatecour/" + params.row._id}>
            <GridActionsCellItem
              icon={<EditIcon />}
              label="Edit"
              onClick={() => { }}
            />
          </Link>,
          <GridActionsCellItem
            icon={<DeleteIcon  />}
            label="Delete"
            color="error"
            onClick={(event) => {
              handleDeleteCourse(params.row._id);
            }}
          />,
          <GridActionsCellItem
            icon={<OndemandVideoIcon />}
            label="All video"
            color="success"
            onClick={(event) => {
              navigate(`/formateur/listecourvideoformateur/${params.row._id}`);
            }}
          />,
        ];
      }
    },
    { field: "titre", headerName: "Course Title", width: 200 },
    { field: "categorie", headerName: "Category", width: 200 },
    { field: "free", headerName: "Free?", width: 100 },
    { field: "actual_Price", headerName: "Original Price", width: 80 },
    { field: "discount_Price", headerName: "Discount Rate", width: 120 },
    {
      field: "isDeleted",
      headerName: "Course State",
      width: 200,
      valueGetter: rowData => {
        return rowData.row?.isDeleted ? "Course not available" : "Course available";
      },
    },
    { field: "nb_user", headerName: "Number of Orders", width: 180 },
    {
      field: 'Courfini',
      type: 'actions',
      headerName: 'Course Creation Completed?',
      width: 300,
      cellClassName: 'actions',
      getActions: (params) => [
        !params.row?.isfinish ? <Button variant="outlined" startIcon={<CheckIcon />} onClick={() => {
          if (params.row?.isDeleted) {
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: "This course is not available!",
            });
          } else {
            handleUpdateCourse(params.row?._id);
          }
        }}>
          Creation Completed
        </Button> : <p>Course Creation Completed</p>,
      ],
    },
    {
      field: 'Affecter PDF',
      type: 'actions',
      headerName: 'Assign a PDF file',
      width: 200,
      cellClassName: 'actions',
      getActions: (params) => [
        <Button variant="outlined" startIcon={<PictureAsPdfIcon />} onClick={() => { navigate(`/formateur/uploadpdf/${params.row._id}`) }}>
          ADD PDF
        </Button>,
      ],
    },
    {
      field: 'AFFECTERQUIZ',
      type: 'actions',
      headerName: 'Assign a quiz',
      width: 200,
      cellClassName: 'actions',
      getActions: (params) => [
        <Button variant="outlined" startIcon={<QuizIcon />} onClick={() => { navigate(`/formateur/createquiz/${params.row._id}`) }}>
          ADD Quiz
        </Button>,
      ],
    },
    {
      field: 'AFFECTERvideo',
      type: 'actions',
      headerName: 'Assign a Video',
      width: 200,
      cellClassName: 'actions',
      getActions: (params) =>
        [
          <Button variant="outlined" startIcon={<OndemandVideoIcon />} onClick={() => { navigate(`/formateur/uploadVideoPage/${params.row._id}`) }}>
            ADD Video
          </Button>,
        ],
    },
  ];

  return (
    <>
      <Box m="20px" className="hoverwhite">
        <Box className="hoverwhite">
          <div className="boxxx" style={{ padding: "20px", width: "100%" }} >
            <div className="card-header" style={{ display: "flex", justifyContent: "space-between" }}>
              <h2 style={{ fontSize: "2rem" }}>List of Courses</h2>
              <Link to="/formateur/UploadCours">
                <Button variant="outlined" startIcon={<AddIcon />}>Add a new course</Button>
              </Link>
            </div>
          
              <Box
                m="8px 0 0 0"
                width="100%"
                height="80vh"
                className="hoverwhite"
              >
                <DataGrid className="hoverwhite"
                  getRowId={(row) => row?._id}
                  rows={(courses?.slice()?.sort(function (a, b) {
                    return new Date(b?.createdAt) - new Date(a?.createdAt);
                  })) || []}
                  columns={columns}
                  components={{ Toolbar: GridToolbar }}
                  initialState={{
                    pagination: {
                      paginationModel: {
                        pageSize: 8,
                      },
                    },
                  }}
                  pageSizeOptions={[8]}
                />
              </Box> 
          </div>
        </Box>
      </Box>
    </>
  );
};

export default ListeCourFormateur;
