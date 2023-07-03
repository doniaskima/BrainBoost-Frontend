import React, { useEffect } from "react";
import { Box, CircularProgress, useTheme } from "@mui/material";
import { DataGrid, GridToolbar, GridActionsCellItem } from "@mui/x-data-grid";
import EditIcon from '@mui/icons-material/Edit';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { useDispatch, useSelector } from 'react-redux';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
 
import moment from "moment";

const TrainerPdfList = () => {
  const theme = useTheme();
  let navigate = useNavigate();


  useEffect(() => {
   
  }, []);

  console.log(dataPDF.pdfs);

  const columns = [
    {
      field: 'file',
      type: 'actions',
      headerName: 'PDF',
      width: 100,
      cellClassName: 'actions',
      getActions: (params) => [
        <a href={"http://localhost:8000/" + params?.row?.file} target="_blank">
          <GridActionsCellItem
            icon={<PictureAsPdfIcon />}
            label="pdf"
            color="success"
          />
        </a>,
      ]
    },
    { field: "courseTitle", headerName: "PDF Name", width: 150 },
    {
      field: "createdDate", headerName: "PDF Date", valueGetter: rowData => {
        return moment(rowData.row.createdDate).format('LLL')
      }, width: 200
    },
    {
      field: 'actions',
      type: 'actions',
      headerName: 'Actions',
      width: 100,
      cellClassName: 'actions',
      getActions: (params) => [
        <GridActionsCellItem
          icon={<EditIcon />}
          label="Edit"
          onClick={() => { navigate(`/trainer/updatepdf/${params.row._id}`) }}
        />,
      ]
    },
  ];

  return (
    <>
      <Box m="20px">
        <Box>
          <div className="boxxx" style={{ padding: "20px", width: "50%" }}>
            <div className="card-header" style={{ display: "flex", justifyContent: "space-between" }}>
              <h2 style={{ fontSize: "2rem" }}>PDF List</h2>
            </div>
            {status === "loading" ? (
              <div style={{
                display: "flex",
                justifyContent: "center",
                marginTop: "81px"
              }}>
                <CircularProgress />
              </div>
            ) : (
              <Box
                m="8px 0 0 0"
                width="100%"
                height="80vh"
              >
                <DataGrid
                  getRowId={(row) => row?._id}
                   rows={dataPDF?.pdfs || []}
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
            )}
          </div>
        </Box>
      </Box>
    </>
  );
};

export default TrainerPdfList;
