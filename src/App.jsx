import "@styles/App.sass";
import { NavBar } from "@components";
import { LandingPage, NotFound, Login, Signup, Dashboard, History } from "@pages";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <NavBar />
      
      <Routes>
        <Route path="/" element={<LandingPage />} />

        <Route path="/login" element={<Login />} />

        <Route path="/signup" element={<Signup />} />

        <Route path="/dashboard" element={<Dashboard />} />

        <Route path="/dashboard/history" element={<History />} />

        <Route path="*" element={<NotFound />} />

      </Routes>
    </div>
  );
}

export default App;
