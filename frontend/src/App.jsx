import { BrowserRouter, Route, Routes } from "react-router";
import Homepage from "./pages/Homepage";
import Navbar from "./components/Navbar";
// import AuthRoutes from "./routes/AuthRoutes";
// import GuestRoutes from "./routes/GuestRoutes";
import Dashboard from "./pages/users/Dashboard";
import CreateEvent from "./pages/Events/CreateEvent";
import UpdateEvent from "./pages/events/UpdateEvent";
import Login from "./pages/users/Login";
import Register from "./pages/users/Register";

const App = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route index path="/" element={<Homepage />} />

        {/* <Route element={<AuthRoutes />}>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="create" element={<CreateEvent />} />
          <Route path="update" element={<UpdateEvent />} />
        </Route> */}

        <Route path="dashboard" element={<Dashboard />} />
        <Route path="create-event" element={<CreateEvent />} />
        <Route path="update" element={<UpdateEvent />} />

        {/* <Route element={<GuestRoutes />}>
          <Route path="login" element={<Login />} />
          <Route path="signup" element={<Register />} />
        </Route> */}

        <Route path="login" element={<Login />} />
        <Route path="signup" element={<Register />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
