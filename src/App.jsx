import "@styles/App.sass";
import { NavBar } from "@components";
import {
  LandingPage,
  NotFound,
  Login,
  Signup,
  Dashboard,
  History,
} from "@pages";
import { Routes, Route } from "react-router-dom";
import IsPrivate from "./components/IsPrivate"; // <== IMPORT
import IsAnon from "./components/IsAnon"; // <== IMPORT

function App() {
  return (
    <div className="App">
      <NavBar />

      <Routes>
        <Route path="/" element={<LandingPage />} />

        <Route
          path="/login"
          element={
            <IsAnon>
              <Login />
            </IsAnon>
          }
        />

        <Route
          path="/signup"
          element={
            <IsAnon>
              <Signup />
            </IsAnon>
          }
        />

        <Route
          path="/dashboard"
          element={
            <IsPrivate>
              <Dashboard />
            </IsPrivate>
          }
        />

        <Route
          path="/dashboard/history"
          element={
            <IsPrivate>
              <History />
            </IsPrivate>
          }
        />

        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
