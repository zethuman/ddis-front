import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
// import WelcomePage from './Pages/WelcomePage'
// import CommunityPage from './Pages/CommunityPage'
// import LocalPage from './Pages/LocalPage'
import NotFoundPage from "./Pages/NotFoundPage";
import "./App.css";
import MainPage from "./Pages/MainPage";

const App = () => {
  return (
    <BrowserRouter basename="/">
      <Routes>
        <Route path="/" element={<MainPage />} />
        {/* <Route path="/community" element={<CommunityPage />} />
        <Route path="/local" element={<LocalPage />} /> */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
};
export default App;
