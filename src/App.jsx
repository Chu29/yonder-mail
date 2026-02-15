import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./pages/Home/HomePage";
import LoginPage from "./pages/Login/LoginPage";
import RecordingPage from "./pages/Recording/RecordingPage";
import PreviewPage from "./pages/Preview/PreviewPage";
import SchedulePage from "./pages/Schedule/SchedulePage";
import ConfirmationPage from "./pages/Confirmation/ConfirmationPage";
import MyMessagesPage from "./pages/MyMessages/MyMessagesPage";
import AboutPage from "./pages/About/AboutPage";
import FAQPage from "./pages/FAQ/FAQPage";
import ToastContainer from "./components/ToastContainer";

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/recording" element={<RecordingPage />} />
          <Route path="/preview" element={<PreviewPage />} />
          <Route path="/schedule" element={<SchedulePage />} />
          <Route path="/confirmation" element={<ConfirmationPage />} />
          <Route path="/messages" element={<MyMessagesPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/faqs" element={<FAQPage />} />
        </Routes>
      </BrowserRouter>
      <ToastContainer />
    </>
  );
};

export default App;
