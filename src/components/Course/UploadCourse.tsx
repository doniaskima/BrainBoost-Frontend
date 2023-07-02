import React, { useState } from 'react';
import { Formik } from "formik";
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import Fab from '@mui/material/Fab';
import Button from '@mui/material/Button';

import * as yup from 'yup';
import { useNavigate } from "react-router";
import { Link } from 'react-router-dom';

const UploadCours = () => {
    const [selectedOption, setSelectedOption] = useState('');
    const [pageVisible, setPageVisible] = useState(true);

    const [image, setImage] = useState(null)
 
    const navigate = useNavigate();

    const handleFormSubmit = async (values, { resetForm }) => {
        console.log("submitCours", values)
        // Your form submission logic here
    };

    const checkoutSchema = yup.object().shape({
        image: yup.mixed().required("Required"),
        title: yup.string().required("Required"),
        bio: yup.string().required("Required"),
        description: yup.string().required("Required"),
        categorie: yup.string().required("Required"),
        DetailedDescription: yup.string().required("Required"),
        // actual_Price: yup.number().required("Required"),
        // discount_Price: yup.number().required("Required"),
    });

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

    const handleOptionChange = (event) => {
        const { value } = event.target;
        setSelectedOption(value === selectedOption ? '' : value);
    };

    const InvisibleInput = () => {
        const inputStyle = {
            display: 'none'
        };
        return null;
    };

    return <Formik onSubmit={handleFormSubmit} initialValues={initialValues} validationSchema={checkoutSchema}>
        {({ values, errors, touched, setFieldValue, handleBlur, handleChange, handleSubmit, }) => {
            console.log(values)
            return (
                <form onSubmit={handleSubmit}>
                    {pageVisible && (
                        <div style={{ overflowX: "hidden", width: "100vw", height: "100vh" }}>
                            <div className="boxxx" style={{ width: '1400px' }}>
                                <Link to="/formateur/listecourformateur">
                                    <button type="button" className="btn-close" aria-label="Close" >
                                        <span aria-hidden="true" className="text-base ml-30" style={{ margin: "0PX 1375PX ", fontSize: "2rem" }}>
                                            &times;
                                        </span>
                                    </button>
                                </Link>
                                <h2 style={{ fontSize: "2rem", margin: "11PX" }} className="text-center">Ajouter un nouveau Cours</h2>
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
                                                display: "flex"
                                            }}>
                                                {values.image  ?<img className="imgcour "
                                                    style={{}}
                                                    src={image == null ? values.image ? "http://localhost:8000/" + values.image : "./images.png" : URL.createObjectURL(image)} alt="" />
                                              : <><input type="file"
                                                    accept="image/*"
                                                    style={{ display: "none", }}
                                                    id="button-file"
                                                    onChange={e => {
                                                        // setFieldValue("image", e.target.files[0])
                                                        // setImage(e.target.files[0])
                                                    }} />

                                                <label htmlFor="button-file">
                                                    
                                                    <div className="input-div">
 
<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" stroke-linejoin="round" stroke-linecap="round" viewBox="0 0 24 24" stroke-width="2" fill="none" stroke="currentColor" class="icon"><polyline points="16 16 12 12 8 16"></polyline><line y2="21" x2="12" y1="12" x1="12"></line><path d="M20.39 18.39A5 5 0 0 0 18 9h-1.26A8 8 0 1 0 3 16.3"></path><polyline points="16 16 12 12 8 16"></polyline></svg>
</div>
                                                   
                                                    
                                                </label></> }
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
                                                    <label for="Nom">Catégorie</label>

                                                    <select className="  form-control mb-3" aria-label=".form-select-lg example"
                                                        onBlur={handleBlur}
                                                        name="categorie"
                                                        onChange={handleChange}
                                                        value={values.categorie}
                                                        error={!!touched.categorie && !!errors.categorie}
                                                        helperText={touched.categorie && errors.categorie} >
                                                        <option hidden>Cliquez ici pour choisir une catégorie</option>
                                                        
                                                        <option value="Développement web">Développement web</option>
                                                        <option value="Développement mobile">Développement mobile</option>
                                                        <option value="Intelligence Artificielle">Intelligence artificielle</option>
                                                        <option value="AWS certification">AWS certification</option>
                                                        
                                                    </select>

                                                </div>
                                                <div className="form-group mb-3">
                                                    <label for="description">Description cours</label>
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
                                                        checked={selectedOption === "Gratuit"}
                                                        onChange={handleOptionChange}
                                                    />
                                                    <FormControlLabel
                                                        control={<Checkbox />}
                                                        label="Prix"
                                                        name='Prix'
                                                        value="Prix"
                                                        checked={selectedOption === "Prix"}
                                                        onChange={handleOptionChange}
                                                    />
                                                    {selectedOption == "Prix" && (
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

                                    <div className="d-flex column-gap-2 justify-content-end ml-5">
                                        <div className="btn-group">
                                            <button className="add-btn">
                                                Add
                                            </button>
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
};

export default UploadCours;
