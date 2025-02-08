import { BrowserRouter, Route, Routes } from "react-router";
import Homepage from "./pages/Homepage";
import Navbar from "./components/Navbar";
import AuthRoutes from "./routes/AuthRoutes";
import GuestRoutes from "./routes/GuestRoutes";
import Dashboard from "./pages/users/Dashboard";
import UpdateEvent from "./pages/events/UpdateEvent";
import EventList from "./pages/events/EventList";
import Login from "./pages/users/Login";
import Register from "./pages/users/Register";
import CreateNewEvent from "./pages/events/CreateNewEvent";

const App = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route index path="/" element={<Homepage />} />

        <Route element={<AuthRoutes />}>
          <Route index path="events" element={<EventList />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="create-event" element={<CreateNewEvent />} />
          <Route path="update" element={<UpdateEvent />} />
        </Route>

        <Route element={<GuestRoutes />}>
          <Route path="login" element={<Login />} />
          <Route path="signup" element={<Register />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
