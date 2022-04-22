import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import NotFoundPage from "./Pages/NotFoundPage";
import "./App.css";
import MainPage from "./Pages/MainPage";
import { ProvideLoading } from "./context/useLoading";
import LoadingDialog from "./context/LoadingDialog";

const App = () => {
  return (
    <ProvideLoading>
      <ToastContainer />
      <LoadingDialog />
      <BrowserRouter basename="/">
        <Routes>
          <Route exact path="/" element={<MainPage />} />
          {/* <Route path="/community" element={<CommunityPage />} />
        <Route path="/local" element={<LocalPage />} /> */}
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </BrowserRouter>
    </ProvideLoading>
  );
};
export default App;
