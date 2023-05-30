import "./App.css";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Sort from "./Components/Sort/sort";
import Result from "./Components/Result/Result";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Sort />} />
          <Route path="/result" element={<Result />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
