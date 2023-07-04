import React, { useEffect, useState } from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import axios from 'axios';
import QuizIcon from '@mui/icons-material/Quiz';

const ListeQuizz = () => {
  const [dataquiz, setDataQuiz] = useState([]);
  const [status, setStatus] = useState('loading');

  useEffect(() => {
    const fetchDataQuiz = async () => {
      try {
        const response = await axios.get('http://localhost:3002/api/quiz/getAllquiz');
        const data = response.data;
        console.log('Fetched data:', data); // Check the fetched data
        setDataQuiz(data);
        setStatus('success');
      } catch (error) {
        console.log('Error fetching data:', error);
        setStatus('error');
      }
    };

    fetchDataQuiz();
  }, []);

  return (
    <>
      <div className="boxxx">
        <div className="card-header">
          <h2 style={{ fontSize: '2rem' }}>Liste de quiz passer</h2>
        </div>
        {status === 'loading' ? (
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              marginTop: '81px',
            }}
          >
            <CircularProgress />
          </div>
        ) : (
          <div className="card-body2">
            {dataquiz?.map((item, index) => (
              <div key={index} className="card4">
                <div style={{ display: 'flex', padding: '26px' }}>
                  <QuizIcon color="primary" sx={{ fontSize: 40 }} />
                  <div className="ps-3 col">
                    <h5 className="h6 mb-2">
                      <a className="stretched-link text-reset" href="#">
                        Nom de Quiz : {item?.titre}
                      </a>
                    </h5>
                    <p className="m-0">
                      <b>Description Quiz : </b>
                      {item?.description}
                    </p>
                    <p className="m-0">
                      <b>Votre note de quizz est : </b> {item?.note}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default ListeQuizz;
