// import React, { useEffect, useState } from 'react';
import socketIOClient from 'socket.io-client';
import config from '../configg';

const ENDPOINT = `${config.API_URL}/project`;
export default socketIOClient(ENDPOINT);
