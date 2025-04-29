import { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  Navigate,
} from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
// import reactLogo from "./assets/react.svg";
// import viteLogo from "/vite.svg";
import "./App.css";
import UpdateContestPage from "./pages/UpdateContestPage";
import EmployeePage from "./pages/EmployeePage";
import AddContestPage from "./pages/AddContestPage";
import AddParticipantPage from "./pages/AddParticipantPage";
import AllEmployees from "./pages/AllEmployees";
import UpdateParticipantPage from "./pages/UpdateParticipantPage";
import DeleteParticipantPage from "./pages/DeleteContestPage";
import DeleteContestPage from "./pages/DeleteContestPage";

function App() {
  const [role, setRole] = useState(null);

  useEffect(() => {
    const storedRole = localStorage.getItem("role");
    setRole(storedRole);
  }, []);

  const isLoggedIn = !!role;

  // const logout = () => {
  //   localStorage.clear();
  //   setRole(null);
  //   window.location.href = "/login"; // Force redirect
  // };

  return (
    <Router>
      <div>
        {/* <nav>
          <ul>
            {!isLoggedIn && (
              <>
                <li>
                  <Link to="/login">Login</Link>
                </li>
                <li>
                  <Link to="/register">Register</Link>
                </li>
              </>
            )}
            {isLoggedIn && (
              <li>
                <button onClick={logout}>Logout</button>
              </li>
            )}
          </ul>
        </nav> */}

        <Routes>
          <Route
            path="/login"
            element={
              isLoggedIn ? <Navigate to="/" /> : <Login onLogin={setRole} />
            }
          />
          <Route
            path="/register"
            element={isLoggedIn ? <Navigate to="/" /> : <Register />}
          />

          {isLoggedIn && <Route path="/employee" element={<EmployeePage />} />}
          <Route path="/employee" element={<EmployeePage />} />
          <Route path="/addcontest" element={<AddContestPage />} />
          <Route path="/addparticipant" element={<AddParticipantPage />} />
          <Route path="/employee/all" element={<AllEmployees />} />
          <Route
            path="/updateparticipant"
            element={<UpdateParticipantPage />}
          />
          <Route path="/updatecontest" element={<UpdateContestPage />} />
          <Route path="/deleteparticipant" element={<DeleteParticipantPage />} />
          <Route path="/deletecontest" element={<DeleteContestPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
