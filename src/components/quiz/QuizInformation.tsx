import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import CircularProgress from '@mui/material/CircularProgress';
import axios from 'axios';
import { Box, Grid, Typography } from '@mui/material';

const QuizInformation = () => {
    const { id } = useParams();
    const [questions, setQuestions] = useState([]);
  
    useEffect(() => {
      const fetchQuestionByIdQuiz = async () => {
        try {
          const response = await axios.get(`http://localhost:3002/api/quiz/getAllquestion/${id}`);
          const data = response.data;
          console.log('Fetched data:', data); // Check the fetched data
          setQuestions(data);
        } catch (error) {
          console.log('Error fetching data:', error);
        }
      };
  
      fetchQuestionByIdQuiz();
    }, [id]);
  
    console.log('Questions state:', questions);

  return (
    <>
      <Typography variant="h4" gutterBottom style={{ textAlign: 'center', marginTop: '50px', color: '#757575' }}>
        Questions with Answers
      </Typography>
      {questions.length === 0 ? (
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '81px' }}>
          <CircularProgress />
        </div>
      ) : (
        <div style={{ margin: 'auto', display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)' }}>
          {questions.map((item, index) => (
            <div key={index} className="card" style={{ maxWidth: '400px' }}>
              <div className="card-header">
                <h2 style={{ fontSize: '1.5rem' }}>
                  {index + 1}.{item?.questionText}
                </h2>
              </div>
              <div className="card-body" style={{ padding: '20px' }}>
                {item?.Options?.map((answer, i) => {
                  console.log('aa', item?.correctAnswer, answer?.answer);
                  return (
                    <Box
                      key={i}
                      paddingX={2}
                      paddingY={1}
                      marginY={3}
                      style={{
                        maxWidth: '500px',
                        padding: '10px',
                      }}
                      sx={{
                        borderWidth: 1,
                        borderStyle: 'solid',
                        borderColor: 'grey.300',
                        borderRadius: 4,
                        width: 'auto',
                        color: item?.correctAnswer === answer?.answer ? 'white' : 'black',
                        backgroundColor: item?.correctAnswer === answer?.answer ? '#4caf50' : 'white',
                      }}
                    >
                      <Grid container direction="row" alignItems={'center'}>
                        <Grid item marginRight={1}>
                          <Typography fontSize={16} fontWeight={'bold'}>
                            {Idx[i]}.
                          </Typography>
                        </Grid>
                        <Grid item>
                          <Typography fontWeight="normal" fontSize={16}>
                            {answer?.answer}
                          </Typography>
                        </Grid>
                      </Grid>
                    </Box>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default QuizInformation;
