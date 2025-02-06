import { BrowserRouter, Route, Routes } from "react-router";
import Homepage from "./pages/Homepage";

const App = () => {
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Homepage />} />
    </Routes>
  </BrowserRouter>;
};

export default App;
