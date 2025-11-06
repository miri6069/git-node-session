import 'primereact/resources/themes/lara-light-cyan/theme.css'; // ✅ תמה אחת בלבד
import 'primereact/resources/primereact.min.css'; // ✅ קומפוננטות בסיס
import 'primeicons/primeicons.css'; // ✅ אייקונים
import 'primeflex/primeflex.css'; // ✅ Flex/Grid
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { Provider } from 'react-redux';
import store from "./app/store"
import { BrowserRouter as Router } from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <Router>
        <App />
      </Router>
    </Provider>
  </React.StrictMode>
);