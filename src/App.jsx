import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import "alertifyjs/build/css/alertify.css";
//Components
import LoginForm from "./pages/LoginForm.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import Projects from "./pages/Projects.jsx";
import Estimations from "./pages/Estimations.jsx";
import Register from "./pages/Register.jsx";
import ForgotPassword from "./pages/ForgotPassword.jsx";
import Sidebar from "./components/Sidebar.jsx";
import { useSelector } from "react-redux";

function App() {
  const { isAuthenticated } = useSelector((state) => state.auth);
  console.log("isAuthenticated", isAuthenticated);
  return (
    <>
      <Router>
        {isAuthenticated && <Sidebar />}
        <Routes>
          {/* <Route path="/" element={<LoginForm />} /> */}
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/estimations" element={<Estimations />} />
          <Route path="/signup" element={<Register />} />
          <Route path="/signin" element={<LoginForm />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
