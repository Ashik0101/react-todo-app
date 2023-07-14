import TodoList from "./components/TodoList";
import CreateTodo from "./components/CreateTodo";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./components/Navbar";
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<TodoList />}></Route>
          <Route path="/create" element={<CreateTodo />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
