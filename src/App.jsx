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
import AddEstimation from "./components/estimations/AddEstimation.jsx";
import routes from "./Routes/Routes.js";
import AddProject from "./components/projects/AddProject.jsx";

function App() {
  const { isAuthenticated } = useSelector((state) => state.auth);
  console.log("isAuthenticated", isAuthenticated);
  return (
    <>
      <Router>
        {isAuthenticated && <Sidebar />}
        <Routes>
          {/* <Route path="/" element={<LoginForm />} /> */}
          <Route path={routes.DASHBOARD} element={<Dashboard />} />
          <Route path={routes.PROJECTS} element={<Projects />} />
          <Route path={routes.ESTIMATIONS} element={<Estimations />} />
          <Route path={routes.ADDESTIMATION} element={<AddEstimation />} />
          <Route path={routes.ADDPROJECT} element={<AddProject />} />
          <Route path={routes.EDITPROJECT} element={<AddProject />} />
          <Route path={routes.SIGNUP} element={<Register />} />
          <Route path={routes.SIGNIN} element={<LoginForm />} />
          <Route path={routes.FORGOTPASSWORD} element={<ForgotPassword />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
