import './App.css';
import React, { Component } from 'react';
import NavBar from './components/NavBar';
import News from './components/News';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LoadingBar from 'react-top-loading-bar'
import { useState } from 'react';



const App = () => {
  const pageSize = 30;
  const apiKey = process.env.REACT_APP_NEWS_API
  
  const [progress, setProgress] = useState(0)
  
    return (
      <>
        <BrowserRouter>
          <NavBar />
          <LoadingBar color='#f11946' progress={progress}/>
          <Routes>
            <Route exact path="/" element={<News setProgress={setProgress} apiKey={apiKey}  key={'general'} pageSize={pageSize} category="general"/>} />
            <Route exact path="/Business" element={<News setProgress={setProgress} apiKey={apiKey}  key={'business'} pageSize={pageSize} category="business"/>} />
            <Route exact path="/Entertainment" element={<News setProgress={setProgress} apiKey={apiKey}  key={'entertainment'} pageSize={pageSize} category="entertainment"/>} />
            <Route exact path="/General" element={<News setProgress={setProgress} apiKey={apiKey}  key={'general'} pageSize={pageSize} category="general"/>} />
            <Route exact path="/Health" element={<News setProgress={setProgress} apiKey={apiKey}  key={'health'} pageSize={pageSize} category="health"/>} />
            <Route exact path="/Science" element={<News setProgress={setProgress} apiKey={apiKey}  key={'science'} pageSize={pageSize} category="science"/>} />
            <Route exact path="/Sports" element={<News setProgress={setProgress} apiKey={apiKey}  key={'sports'} pageSize={pageSize} category="sports"/>} />
            <Route exact path="/Technology" element={<News setProgress={setProgress} apiKey={apiKey}  key={'technology'} pageSize={pageSize} category="technology"/>} />
          </Routes>
        </BrowserRouter>
      </>
    )
}


export default App
