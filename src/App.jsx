import Agent from "./pages/Agent";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Agent />} />
      </Routes>
    </Router>
  );
}

export default App;
