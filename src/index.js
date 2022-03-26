import React from 'react';
import ReactDOM from 'react-dom';

import App from './App';
import ContextProvider from './Context/ContextProvider';
import { ChakraProvider } from '@chakra-ui/react'
ReactDOM.render(
  <ContextProvider >
    <ChakraProvider>
  <React.StrictMode>
    <App />
  </React.StrictMode>
  </ChakraProvider>
  </ContextProvider>,
  document.getElementById('root')
);

