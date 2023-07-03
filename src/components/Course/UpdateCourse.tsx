import React, { useState,useEffect } from 'react';
import { Formik } from "formik";
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import Fab from '@mui/material/Fab';
import Button from '@mui/material/Button';
import * as yup from 'yup';
import { useNavigate,useParams } from "react-router";
import { Link } from 'react-router-dom';
import { BASE_URL } from '../../utils/utils';
import axios from 'axios';

//<FontAwesomeIcon icon="far fa-video" />

const UpdateCourse = () => {
    const {id}=useParams()
    const [selectedOption, setSelectedOption] = useState('');
    const [pageVisible, setPageVisible] = useState(true);
    const [image, setImage] = useState(null);
    const [data,setData]=useState([]);
    const navigate = useNavigate();
    console.log("data",data)
    const [courseData, setCourseData] = useState({});
    const fetchCourses = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/api/courses/getAllCourses`);
        console.log(response.data);
        setData(response.data);
      } catch (error) {
        console.log(error);
      }
    };
  
    // Use useEffect to fetch the courses data when the component mounts
    useEffect(() => {
      fetchCourses();
    }, []);
    useEffect(() => {
      const fetchCourseData = async () => {
        try {
          const response = await axios.get(`http://localhost:3002/api/courses/searchById/${id}`);
          setCourseData(response.data);
        } catch (error) {
          console.log(error);
        }
      };
  
      fetchCourseData();
    }, [id]);

 
  const initialValues = {
    image: "",
    title: "",
    bio: "",
    description: "",
    categorie: "",
    free: false,
    actual_Price: "",
    discount_Price: "",
    DetailedDescription: ""
};
    const handleFormSubmit = async () => {
      const formData = {};  
      const courseId = courseData?._id;  
      try {
        const response = await axios.put(`${BASE_URL}/api/courses/updateCourse/${courseId}`, formData);
        console.log(response.data);
  
        if (response.data) {
          navigate("/formateur/listecourformateur");
        }
      } catch (error) {
        console.log('Error:', error);
      }
    };
console.log(selectedOption)
    const checkoutSchema = yup.object().shape({
          image: yup.mixed().required("Required"),
         title: yup.string().required("Required"),
        bio: yup.string().required("Required"),
        description: yup.string().required("Required"),
        categorie: yup.string().required("Required"),
        DetailedDescription: yup.string().required("Required"),
        actual_Price: yup.number().required("Required"),
        discount_Price: yup.number().required("Required"),
    })
 
    const handleOptionChange = (event) => {
        const { value } = event.target;
        setSelectedOption(value === selectedOption ? '' : value);
    };


    const InvisibleInput = () => {
        const inputStyle = {
            display: 'none'
        }
    }
        ;
    return <Formik  enableReinitialize={true} onSubmit={handleFormSubmit} initialValues={initialValues} validationSchema={checkoutSchema}>
        {({ values, errors, touched, setFieldValue, handleBlur, handleChange, handleSubmit, }) => {
            console.log(values)
            setSelectedOption(values?.free)
            return (
                <form onSubmit={handleSubmit}>
                    {pageVisible && (
                        <div style={{ overflowX: "hidden", width: "100vw", height: "80vh" }}>
                            <div className="boxxx" style={{ width: '1400px' }}>
                                <h2 style={{ fontSize: "2rem", margin: "11PX" }} className="text-center">Update Cours</h2>
                                <div style={{ padding: "29px", backgroundColor: "#F8F8F9", margin: "13PX 39PX 11px" }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                        <div className="media align-items-center " style={{ display: "flex" }}>

                                            <div className="play-video" style={{
                                                width: "400px",
                                                height: "370px",
                                                border: "3px dashed silver",
                                                backgroundColor: "white",
                                                cursor: "pointer",
                                                marginTop: "40px",
                                                borderRadius: '10px',
                                                alignItems: "center",
                                                justifyContent: "center",
                                                display: "flex",
                                                flexDirection: "column",
                                                 gap: "13px"
                                            }}>
                                               <img className="imgcour "
                                                    style={{}}
                                                    src={image == null ? values.image ? "http://localhost:8000/" + values.image : "./images.png" : URL.createObjectURL(image)} alt="" />
                                              <><input type="file"
                                                    accept="image/*"
                                                    style={{ display: "none", }}
                                                    id="button-file"
                                                    onChange={e => {
                                                        setFieldValue("image", e.target.files[0])
                                                        setImage(e.target.files[0])
                                                    }} />

                                                <label htmlFor="button-file">
                                                    <Fab component="span" >
                                                        <AddPhotoAlternateIcon />
                                                    </Fab>
                                                </label></> 
                                            </div>

                                            <div className="shadow-box ms-7 mt-12">
                                                <div className="form-group mb-3">
                                                    <label for="Titre">Titre Cours</label>
                                                    <input className="form-control " style={{ width: '400px' }}
                                                        name="title"
                                                        id="idTitre"
                                                        autoFocus
                                                        placeholder="Entrez votre title"
                                                        onBlur={handleBlur}
                                                        onChange={handleChange}
                                                        value={values.title}
                                                        error={!!touched.title && !!errors.title}

                                                    />

                                                </div>
                                                <div className="form-group">
                                                    <label for="Nom">catégorie</label>

                                                    <select className="  form-control mb-3" aria-label=".form-select-lg example"
                                                        onBlur={handleBlur}
                                                        name="categorie"
                                                        onChange={handleChange}
                                                        value={values.categorie}
                                                        error={!!touched.categorie && !!errors.categorie}
                                                        helperText={touched.categorie && errors.categorie} >
                                                        <option hidden>Cliquez ici pour choisir une catégorie</option>
                                                        <option value="Python">Python</option>
                                                        <option value="Développement web">Développement web</option>
                                                        <option value="Data Science">Data Science</option>
                                                        <option value="Machine learning">Machine learning</option>
                                                        <option value="AWS certification">AWS certification</option>
                                                        <option value="Design">Design</option>
                                                    </select>

                                                </div>
                                                <div className="form-group mb-3">
                                                    <label for="description">Description Cour</label>
                                                    <textarea className="form-control mb-3"
                                                        style={{ width: '400px', marginTop: '3px' }}
                                                        id="desc" rows="4"
                                                        name="description"
                                                        placeholder="Entrez votre description"
                                                        autoComplete="new-text"
                                                        onBlur={handleBlur}
                                                        onChange={handleChange}
                                                        value={values.description}
                                                        error={!!touched.description && !!errors.description}
                                                        helperText={touched.description && errors.description} />
                                                </div>

                                                <label for="montant">Montant</label>
                                                <div>

                                                    <FormControlLabel
                                                        control={<Checkbox />}
                                                        name='free'
                                                        value="Gratuit"
                                                        label="Gratuit"
                                                        checked={selectedOption === "Gratuit" || values.free}
                                                        onChange={handleOptionChange}
                                                    />
                                                    <FormControlLabel
                                                        control={<Checkbox />}
                                                        label="Prix"
                                                        name='Prix'
                                                        value="Prix"
                                                        checked={selectedOption === "Prix" || !values.free}
                                                        onChange={handleOptionChange}
                                                    />
                                                    {selectedOption == "Prix" || !values.free && (
                                                        <div style={{ display: 'flex' ,alignItems: 'center' }}>
                                                             <input type='text'
                                                             className="form-control mb-3 "
                                                             style={{ width: '190px', InvisibleInput, display: 'none'}} id=""
                                                             readOnly disabled
                                                             name='free'
                                                             onBlur={handleBlur}
                                                             onChange={handleChange}
                                                             value= "false"
                                                             />
                                                            <input type="text" className="form-control mb-3 "
                                                                style={{ width: '190px' }} id="idTitre"
                                                                aria-describedby="emailHelp"
                                                                name='actual_Price'
                                                                type="number"
                                                                placeholder="Entrez votre prix"
                                                                onBlur={handleBlur}
                                                                onChange={handleChange}
                                                                value={values.actual_Price}
                                                                error={!!touched.actual_Price && !!errors.actual_Price}
                                                                helperText={touched.actual_Price && errors.actual_Price} />

                                                            <input type="text" className="form-control mb-3 "
                                                                style={{ width: '200px', marginLeft: '10px' }} id="discountprix"
                                                                aria-describedby="emailHelp"
                                                                name="discount_Price"
                                                                type="number"
                                                                placeholder="Entrez le prix discounté"
                                                                onBlur={handleBlur}
                                                                onChange={handleChange}
                                                                value={values.discount_Price}
                                                                error={!!touched.discount_Price && !!errors.discount_Price}
                                                                helperText={touched.discount_Price && errors.discount_Price}
                                                            />
                                                        </div>
                                                    )}
                                                    {selectedOption == "Gratuit" && (
                                                        <div style={{ display: 'flex', alignItems: 'center' }}>
                                                             <input type='text'
                                                             className="form-control mb-3 "
                                                             style={{ width: '190px', InvisibleInput, display: 'none'}} id=""
                                                             readOnly disabled
                                                             name='free'
                                                             onBlur={handleBlur}
                                                             onChange={handleChange}
                                                             value= "true"
                                                             />
                                                            <input className="form-control mb-3 "
                                                                style={{ width: '190px', InvisibleInput, display: 'none' }} id=""
                                                                readOnly disabled
                                                                name='actual_Price'
                                                                onBlur={handleBlur}
                                                                onChange={handleChange}
                                                                type="number"
                                                                value={values.actual_Price}
                                                            //  error={!!touched.actual_Price && !!errors.actual_Price}
                                                            // helperText={touched.actual_Price && errors.actual_Price} 
                                                            />

                                                            <input className="form-control mb-3 "
                                                                style={{ width: '200px', marginLeft: '10px', InvisibleInput, display: 'none' }} id="discountprix"
                                                                name="discount_Price"
                                                                readOnly disabled
                                                                hidden
                                                                onBlur={handleBlur}
                                                                onChange={handleChange}
                                                                type="number"
                                                                value={values.discount_Price}
                                                            // error={!!touched.discount_Price && !!errors.discount_Price}
                                                            // helperText={touched.discount_Price && errors.discount_Price}
                                                            />
                                                        </div>
                                                    )}
                                                </div>


                                            </div>

                                        </div>
                                        <div className='shadow-box ms-5 mt-12'>
                                            <div className="form-group mb-3">
                                                <label for="connaissance">Ce que vous-aves apprenez</label>
                                                <textarea className="form-control" style={{ width: '400px', marginTop: '3px' }}
                                                    id="desc" rows="7" placeholder="entrez ici les pré-connaissance de l'étudiant"
                                                    autoComplete="new-text"
                                                    onBlur={handleBlur}
                                                    name='DetailedDescription'
                                                    onChange={handleChange}
                                                    value={values.DetailedDescription}
                                                    error={!!touched.DetailedDescription && !!errors.DetailedDescription}
                                                    helperText={touched.DetailedDescription && errors.DetailedDescription} />
                                            </div>
                                            <div className="form-group mb-3">
                                                <label for="bio">Bio for coach</label>
                                                <textarea className="form-control"
                                                    style={{ width: '400px', marginTop: '3px' }}
                                                    id="desc" rows="4" placeholder="Entrez votre Bio"
                                                    autoComplete="new-text"
                                                    name='bio'
                                                    onBlur={handleBlur}
                                                    onChange={handleChange}
                                                    value={values.bio}
                                                    error={!!touched.bio && !!errors.bio}
                                                    helperText={touched.bio && errors.bio} />
                                            </div>
                                        </div>
                                    </div>

                                    <div class="d-flex column-gap-2 justify-content-end ml-5">
                                        <div class="btn-group">
                                            <Button variant="contained" color="success" className=""
                                                style={{ margin: "0PX 1140PX " }} type='submit'>Update</Button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                    }
                </form>
            )
        }}
    </Formik >


}
export default UpdateCourse;