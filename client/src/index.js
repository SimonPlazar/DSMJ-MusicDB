import React from 'react';
import ReactDOM from 'react-dom/client';
import {Provider} from "react-redux";
import {createStore, applyMiddleware, compose} from "redux";
import { thunk } from 'redux-thunk';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import LandingPage from './components/LandingPage/LandingPage';
import App from './App';
import Dashboard from './components/DashBoard/dashboard';
import Input from './components/Logic/input';

import './index.css';
import reportWebVitals from './reportWebVitals';

import reducers from "./reducers";

const store = createStore(reducers, compose(applyMiddleware(thunk)));

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Provider store={store}>
        <React.StrictMode>
            {/*<App />*/}
            {/*<LandingPage />*/}
            {/*<Dashboard />*/}
            {/*<Input />*/}

            <Router>
                <Routes>
                    <Route path="/" element={<Dashboard />} />
                    <Route path="/import-export" element={<Input />} />
                </Routes>
            </Router>

        </React.StrictMode>
    </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
