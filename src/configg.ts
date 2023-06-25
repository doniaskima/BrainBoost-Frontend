const dev = {
    // API_URL: 'https://qlda-project.herokuapp.com/',
    API_URL: 'http://localhost:3002',
  };
  // https://morioh.com/p/a29f242c1515
  const prod = {
    API_URL: 'http://localhost:3002',
  };
  
  const config = process.env.NODE_ENV === 'production' ? prod : dev;
  

export default {
    ...config,
};  