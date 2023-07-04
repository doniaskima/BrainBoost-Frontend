import { Navigation, Pagination, Scrollbar, A11y } from 'swiper';
import { Swiper, SwiperSlide, useSwiper } from 'swiper/react';

import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import {
  CardActions,
  Button,
  Grid,
  Typography,
  Box,
  Tab
} from '@mui/material';
import { toast } from 'react-toastify';
import axios from 'axios'; // Import Axios

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import { userService } from '../../services/user/api';

export const SwiperButtonNext = ({ children }: { children: React.ReactNode }) => {
  const swiper = useSwiper();
  return <button onClick={() => swiper.slideNext()}>{children}</button>;
};

export const SwiperButtonPrev = ({ children }: { children: React.ReactNode }) => {
  const swiper = useSwiper();
  return <button onClick={() => swiper.slidePrev()}>{children}</button>;
};

const SingleQuestion = () => {
  const { id } = useParams<{ id: string }>();
  const [result, setResult] = useState(false);
  const [userId , setUserId]= useState("");
  const [resultatquestion,setResultatquestion]=useState([])
  const [questions , setQuestions]= useState([]);
  const [resultQuestion, setResultQuestion] = useState<{
    score: number;
    correct: number;
    incorrect: number;
  }>({
    score: 0,
    correct: 0,
    incorrect: 0
  });

  console.log('res', resultQuestion);
 
  useEffect(() => {
    userService
      .getUserId()
      .then((res) => {
        setUserId(res.data.data.id);
      })
      .catch((err) => {
        toast.error('Session expired');
      });
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:3002/api/quiz/getAllquestion/${id}`);
        const data = response.data; // Assuming the response contains the questions data
        setQuestions(data);
        console.log(questions)
      } catch (error) {
        console.error('Error:', error);
        // Handle errors
        toast.error('Failed to fetch data from the API');
      }
    };
    fetchData();
    console.log("data",questions);
  }, [id]);

  const [itemSelected, setItemSelected] = useState<Array<{ id: number; question: number }>>([]);
  const swiper = useSwiper();
  const [selected, setSelected] = useState<number | null>(null);
  const Idx = ["A", "B", "C", "D"];

  console.log(itemSelected);

  const isItemSelected = (id: number) => {
    return itemSelected.some(item => item.id === id);
  };

  const getQuestionResult = (index: number, i: number) => {
    const result = resultatquestion.find(item => item.numquestion === index && item.numanswer === i);
    return result?.correct;
  };

  console.log("zzzz", getQuestionResult(1, 0));

  return (
    <>
      {!result ? (
        <Swiper
          style={{
            maxWidth: '600px',
            padding: "20px"
          }}
          slidesPerView={1}
          spaceBetween={30}
          allowTouchMove={false}
          onSwiper={(swiper) => console.log(swiper)}
          onSlideChange={() => console.log('slide change')}
          pagination={{ clickable: true }}
          //   navigation
        >
          {data?.questions?.map((item, index) => (
            <SwiperSlide className='card'>
              <div className="card-header">
                <h2 style={{ fontSize: "1.5rem" }}>Question {index + 1}: {item?.questionText}</h2>
              </div>
              <div className="card-body">
                {item?.Options?.map((answer, i) => {
                  return (
                    <Box
                      key={answer.id}
                      paddingX={2}
                      paddingY={1}
                      marginY={3}
                      sx={{
                        borderWidth: 1,
                        borderStyle: 'solid',
                        borderColor: isItemSelected(answer.id) ? 'white' : 'grey.300',
                        borderRadius: 4,
                        width: 'auto',
                        color: isItemSelected(answer.id) ? 'white' : 'black',
                        backgroundColor: isItemSelected(answer.id) ? 'primary.main' : 'white',
                        '&:hover': {
                          cursor: 'pointer',
                          backgroundColor: 'primary.main',
                          color: 'white',
                        },
                      }}
                      onClick={() => {
                        setSelected(index);
                        setItemSelected(prevState => {
                          const updatedItem = {
                            id: answer.id,
                            question: index
                          };
                          const existingIndex = prevState.findIndex(item => item.question === index);
                          if (existingIndex !== -1) {
                            prevState.splice(existingIndex, 1, updatedItem);
                            return prevState;
                          } else {
                            return [...prevState, updatedItem];
                          }
                        });
                      }}
                    >
                      <Grid container direction="row" alignItems={'center'}>
                        <Grid item marginRight={1}>
                          <Typography fontSize={16} fontWeight={'bold'}>
                            {Idx[i]}.
                          </Typography>
                        </Grid>
                        <Grid item>
                          <Typography fontWeight={isItemSelected(answer.id) ? 'bold' : 'normal'} fontSize={16}>
                            {answer?.answer}
                          </Typography>
                        </Grid>
                      </Grid>
                    </Box>
                  );
                })}
              </div>
              <div>
                <CardActions>
                  <Grid container justifyContent="space-between">
                    <Grid item>
                      <SwiperButtonPrev style={{ display: 'none' }}>
                        {/* <Button
                        size="large"
                      >
                        Prev
                      </Button> */}
                      </SwiperButtonPrev>
                    </Grid>
                    <Grid item>
                      <SwiperButtonNext>
                        <Button
                          size="large"
                          onClick={() => {
                            if (data?.questions?.length - 1 === index) {
                              let users = JSON.parse(JSON.stringify(user.user));
                              console.log("users", users.Quiz);
                              users.Quiz.push({ idquiz: id, note: res.score });
                              // dispatch(updateprofilequiz(users));
                              setResult(true);
                            }
                          }}
                        >
                          Next
                        </Button>
                      </SwiperButtonNext>
                    </Grid>
                  </Grid>
                </CardActions>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      ) : (
        <div style={{ marginBottom: "100px" }}>
          <Box
            paddingX={2}
            paddingY={1}
            marginY={3}
            sx={{
              borderWidth: 1,
              borderStyle: 'solid',
              borderColor: 'grey.300',
              borderRadius: 4,
              width: 'auto',
              color: 'black',
              backgroundColor: 'white',
            }}
            className='card'
            style={{
              maxWidth: '600px',
              padding: "20px",
              marginTop: "114px"
            }}
          >
            <Typography variant="h5" gutterBottom style={{ color: "#1565c0" }}>
              Your final score is: {res.score}/{data?.questions.length}
            </Typography>
            <div style={{ display: "flex", columnGap: "110px" }}>
              <Typography variant="subtitle1" gutterBottom>
                <b>Correct answer</b>
              </Typography>
              <Typography variant="subtitle1" display="block" gutterBottom>
                {res.correct}
              </Typography>
            </div>
            <div style={{ display: "flex", columnGap: "90px" }}>
              <Typography variant="subtitle1" gutterBottom>
                <b>Wrong answer</b>
              </Typography>
              <Typography variant="button" display="block" gutterBottom>
                {res.incorrect}
              </Typography>
            </div>
            <Link to={`/user/listecour`}><Button variant="contained" style={{ width: "100%", marginTop: "10px" }}>Back to course</Button></Link>
          </Box>
          <Typography variant="h4" gutterBottom style={{ textAlign: "center", marginTop: "50px", color: "#757575" }}>
            The answers
          </Typography>
          <div
            style={{
              margin: "auto",
              display: "grid",
              gridTemplateColumns: "repeat(4, 1fr)",
            }}
          >
            {
              data?.questions?.map((item, index) => {
                return (
                  <div className='card' style={{
                    maxWidth: '400px',
                  }} >
                    <div className="card-header">
                      <h2 style={{ fontSize: "1.5rem" }}>{index + 1}.{item?.questionText}</h2>
                    </div>
                    <div className="card-body" style={{ padding: "20px" }}>
                      {item?.Options?.map((answer, i) => {
                        return (
                          <Box
                            paddingX={2}
                            paddingY={1}
                            marginY={3}
                            style={{
                              maxWidth: '500px',
                              padding: "10px",
                            }}
                            sx={{
                              borderWidth: 1,
                              borderStyle: 'solid',
                              borderColor: test2(index, i) ? 'white' : 'grey.300',
                              borderRadius: 4,
                              width: 'auto',
                              color: test2(index, i) === false ? 'white' : test2(index, i) === true || answer?.answer === item?.correctAnswer ? 'white' : 'black',
                              backgroundColor: test2(index, i) === false ? '#e53935' : test2(index, i) === true || answer?.answer === item?.correctAnswer ? "#4caf50" : 'white',
                            }}
                          >
                            <Grid container direction="row" alignItems={'center'}>
                              <Grid item marginRight={1}>
                                <Typography fontSize={16} fontWeight={'bold'}>
                                  {Idx[i]}.
                                </Typography>
                              </Grid>
                              <Grid item>
                                <Typography fontWeight={test2(index, i) ? 'bold' : 'normal'} fontSize={16}>
                                  {answer?.answer}
                                </Typography>
                              </Grid>
                            </Grid>
                          </Box>
                        );
                      })}
                    </div>
                  </div>
                );
              })
            }
          </div>
        </div>
      )}
    </>
  );
};

export default SingleQuestion;
