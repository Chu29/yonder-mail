import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./pages/Home/HomePage";
import LoginPage from "./pages/Login/LoginPage";
import RecordingPage from "./pages/Recording/RecordingPage";
import PreviewPage from "./pages/Preview/PreviewPage";
import SchedulePage from "./pages/Schedule/SchedulePage";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/recording" element={<RecordingPage />} />
        <Route path="/preview" element={<PreviewPage />} />
        <Route path="/schedule" element={<SchedulePage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
