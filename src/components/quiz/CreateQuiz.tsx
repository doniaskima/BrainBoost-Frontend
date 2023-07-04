import { Formik, FieldArray, ErrorMessage, getIn } from "formik";
import * as yup from 'yup';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import RadioGroup, { useRadioGroup } from '@mui/material/RadioGroup';
import Radio from '@mui/material/Radio';
import FormControlLabel from '@mui/material/FormControlLabel';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import SendIcon from '@mui/icons-material/Send';
import Stack from '@mui/material/Stack';
import { useEffect, useState } from "react";
import { uid } from "uid";
import Swal from 'sweetalert2'
import { Link as RouterLink, useLocation, useNavigate, useParams } from "react-router-dom";
import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined';
import axios from 'axios';
import { userService } from "../../services/user/api";
import { toast } from "react-toastify";

const CreateQuiz = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [userId, setUserId] = useState("");
  const [test, settest] = useState([]);
  const initialValues = {
    name: "",
    description: "",
    questions: [{ question: '', responses: ['', '', '', ''], correctAnswer: 0 }]
  };
  useEffect(() => {
    userService
      .getUserId()
      .then((res) => {
        setUserId(res.data.data.id);
        console.log(userId)
      })
      .catch((err) => {
        toast.error('Session expired');
      });
  }, []);
  const checkoutSchema = yup.object().shape({
    name: yup.string().required("Required"),
    description: yup.string().required("Required"),
    questions: yup.array().of(
      yup.object().shape({
        question: yup.string().required('Question is required'),
        responses: yup.array()
          .of(yup.string().required('Response is required'))
          .min(4, 'At least four responses are required')
          .max(4, 'Only four responses are allowed')
          .required('Responses are required'),
      })
    ),
  });

  const handleFormSubmit = async (value, { resetForm }) => {
    try {
      const quizResponse = await axios.post('http://localhost:3002/api/quiz/createQuiz', {
        name: value.name,
        description: value.description,
        coach: userId,
      });
      const quizId = quizResponse.data._id;
      let tab = [];

      value.questions.forEach((item) => {
        let opt = [];
        item.responses.forEach((x) => {
          opt.push({ id: uid(), answer: x });
        });
        let question = {
          questionText: item.question,
          CoachId: localStorage.getItem("userid"),
          QuizId: quizId,
          correctAnswer: item.responses[item.correctAnswer],
          Options: opt,
        };
        tab.push(question);
      });

      const questionsResponse = await axios.post('http://localhost:3002/api/quiz/CreateQuestion', tab);
      console.log(questionsResponse);
      if (questionsResponse) {
        Swal.fire(
          'Success',
          `Quiz added successfully`,
          'success'
        );

        resetForm({
          name: "",
          description: "",
          questions: [{ question: '', responses: ['', '', '', ''], correctAnswer: 0 }]
        });
        navigate("/listOfquizzes");
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: "Something went wrong!",
        });
      }
    } catch (error) {
      console.error("Error:", error);
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: "Something went wrong!",
      });
    }
  };

  return (
    <>
      <div className="boxxx p-8" style={{ marginBottom: "50px" }}>
        <Formik
          initialValues={initialValues}
          validationSchema={checkoutSchema}
        
        >
          {({  values, errors, touched, setFieldValue, handleBlur, handleChange, handleSubmit, }) => (
            <form onSubmit={handleFormSubmit}>
              <Typography variant="h4" gutterBottom>
                Add your Quiz
              </Typography>
              <TextField
                fullWidth
                label="Quiz Name"
                name="name"
                variant="outlined"
                margin="normal"
                value={values.name}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.name && errors.name ? true : false}
                helperText={touched.name && errors.name}
              />
              <TextField
                fullWidth
                multiline
                rows={4}
                label="Description"
                name="description"
                variant="outlined"
                margin="normal"
                value={values.description}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.description && errors.description ? true : false}
                helperText={touched.description && errors.description}
              />
              <FieldArray name="questions">
                {({ push, remove }) => (
                  <div>
                    {values.questions.map((q, index) => (
                      <div key={index}>
                        <Typography variant="h6" gutterBottom>
                          Question {index + 1}
                        </Typography>
                        <TextField
                          fullWidth
                          multiline
                          rows={2}
                          label="Question"
                          name={`questions.${index}.question`}
                          variant="outlined"
                          value={q.question}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          error={
                            getIn(touched, `questions.${index}.question`) &&
                            getIn(errors, `questions.${index}.question`)
                              ? true
                              : false
                          }
                          helperText={
                            getIn(touched, `questions.${index}.question`) &&
                            getIn(errors, `questions.${index}.question`)
                          }
                        />
                        <RadioGroup
                          name={`questions.${index}.correctAnswer`}
                          value={q.correctAnswer.toString()}
                          onChange={handleChange}
                          onBlur={handleBlur}
                        >
                          <Stack direction="row">
                            {q.responses.map((res, resIndex) => (
                              <div key={resIndex}>
                                <FormControlLabel
                                  control={
                                    <Radio
                                      color="primary"
                                      value={resIndex.toString()}
                                    />
                                  }
                                />
                                <TextField
                                  fullWidth
                                  label={`Response ${resIndex + 1}`}
                                  name={`questions.${index}.responses.${resIndex}`}
                                  variant="outlined"
                                  value={res}
                                  onChange={handleChange}
                                  onBlur={handleBlur}
                                  error={
                                    getIn(
                                      touched,
                                      `questions.${index}.responses.${resIndex}`
                                    ) &&
                                    getIn(
                                      errors,
                                      `questions.${index}.responses.${resIndex}`
                                    )
                                      ? true
                                      : false
                                  }
                                  helperText={
                                    getIn(
                                      touched,
                                      `questions.${index}.responses.${resIndex}`
                                    ) &&
                                    getIn(
                                      errors,
                                      `questions.${index}.responses.${resIndex}`
                                    )
                                  }
                                />
                                <DeleteForeverOutlinedIcon
                                  onClick={() => remove(index)}
                                  style={{ cursor: "pointer" }}
                                />
                              </div>
                            ))}
                          </Stack>
                        </RadioGroup>
                        <Button
                          onClick={() => {
                            push({ question: '', responses: ['', '', '', ''], correctAnswer: 0 });
                          }}
                          startIcon={<AddIcon />}
                          style={{ marginBottom: "10px" }}
                        >
                          Add a response
                        </Button>
                      </div>
                    ))}
                  </div>
                )}
              </FieldArray>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                endIcon={<SendIcon />}
                style={{ marginTop: "10px" }}
              >
                Add the quiz
              </Button>
            </form>
          )}
        </Formik>
      </div>
    </>
  );
};

export default CreateQuiz;
