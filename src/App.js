import { useState } from "react";
import "./App.css";
import Home from "./components/pages/Home";
import TodoLists from "./components/pages/TodoLists";

function App() {
  const [dataChange, setDataChange] = useState(0);
  return (
    <div className="App">
      <Home />
      <TodoLists setDataChange={setDataChange} dataChange={dataChange} />
    </div>
  );
}

export default App;
