import { NavBar, IsPrivate, IsAnon } from "@components";
import {
  LandingPage,
  About,
  NotFound,
  Login,
  Signup,
  Dashboard,
  History,
  UserProfilePage,
} from "@pages";
import { Routes, Route } from "react-router-dom";

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
        <Route path="/about" element={<About />} />
        <Route
          path="/signup"
          element={
            <IsAnon>
              <Signup />
            </IsAnon>
          }
        />
        <Route
          path="/profile"
          element={
            <IsPrivate>
              <UserProfilePage />
            </IsPrivate>
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
