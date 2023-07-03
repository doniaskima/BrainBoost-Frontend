import React from 'react';
import Button from '@mui/material/Button';
import { Formik } from 'formik';
import { faCloudUpload } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Fab from '@mui/material/Fab';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import axios from 'axios';
import * as yup from 'yup';
import { v4 as uuidv4 } from 'uuid';
import { FilterTiltShiftTwoTone } from '@mui/icons-material';
import { useParams } from 'react-router-dom';

const Uploadpdf = () => {
  const { id } = useParams();
  const [pdfFiles, setPdfFiles] = React.useState(null);
  const [etat, setEtat] = React.useState({});
  const inputRef = React.useRef();
  const navigate = useNavigate();
  console.log(pdfFiles);

  const handleFormSubmit = async () => {
    try {
      const response1 = await axios.post('http://localhost:3002/api/pdfs/createPdf');
      console.log('add pdf', response1.data);

      if (response1.data && response1.data.data && response1.data.data._id) {
        const pdfId = response1.data.data._id;
        const response2 = await axios.put(`http://localhost:3002/api/pdfs/updatePdf/${id}`, { pdfId });

        console.log('update pdf', response2.data);

        if (response2.data && response2.data.data) {
          navigate('/listpdf');
        }
      }
    } catch (err) {
      console.log('test2', err);
    }
  };

  const handleRemoveFile = (index) => {
    setPdfFiles(null);
  };

  const getFileType = (fileName) => {
    if (!fileName) {
      return '';
    }
    const extension = fileName.split('.').pop().toLowerCase();
    return extension;
  };

  const initialValues = {
    file: '',
    description: '',
  };

  const checkoutSchema = yup.object().shape({
    description: yup.string().required('Required'),
  });

  return (
    <div className="wrapper">
      <div className="box">
        <div className="input-bx">
          <h2 className="upload-area-title">Upload your exercise</h2>
          <Formik onSubmit={handleFormSubmit} initialValues={initialValues} validationSchema={checkoutSchema}>
            {({ values, errors, touched, setFieldValue, handleBlur, handleChange, handleSubmit }) => (
              <form onSubmit={handleSubmit}>
                <div className="uploaded">
                  <label className="uploaded">PDF Description</label>
                  <div>
                    <textarea
                      name="description"
                      rows="3"
                      cols="100"
                      placeholder="Enter your description"
                      autoFocus
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.description}
                      error={!!touched.description && !!errors.description}
                    ></textarea>
                  </div>
                </div>
                <div className="uploadlabel">
                  <input
                    type="file"
                    id="contained-button-file"
                    style={{ display: 'none' }}
                    onBlur={handleBlur}
                    onChange={(e) => {
                      setFieldValue('file', e.target.files[0]);
                      console.log('aaaaaaaaaaaaa', e.target.files[0]);
                      const newFile = {
                        id: uuidv4(),
                        name: e.target.files[0].name,
                        type: e.target.files[0].type,
                        // content: secc // File content (if needed)
                      };
                      setPdfFiles(newFile);
                    }}
                    name="file"
                    ref={inputRef}
                  />
                  <span>
                    <FontAwesomeIcon icon={faCloudUpload} className="" />
                  </span>
                  <button type="submit" onClick={() => inputRef.current.click()}>
                    Click to upload
                  </button>
                </div>
                <Button style={{ marginTop: '20px', width: '100%' }} variant="contained" type="submit">
                  Finish
                </Button>
              </form>
            )}
          </Formik>
        </div>
        {pdfFiles != null ? (
          <div className="filewrapper">
            <h3 className="uploaded">Uploaded Documents</h3>
            <div className="showfilebox" key={pdfFiles.id}>
              <div className="left">
                <span className={`filetype ${getFileType(pdfFiles.name)}`}>{getFileType(pdfFiles.name)}</span>
                <h3>{pdfFiles.name}</h3>
              </div>
              <div className="right">
                <span onClick={() => setPdfFiles(null)}>&#215;</span>
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default Uploadpdf;
