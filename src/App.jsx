import { Navigate, Route, Routes } from "react-router";
import MainLayout from "./layout/Main";
import React, { useState } from "react";

const UserPage = React.lazy(() => import("./pages/users"));
const ProductPage = React.lazy(() => import("./pages/products"));
const TasksPage = React.lazy(() => import("./pages/tasks"));

function App() {
  const [count, setCount] = useState(0);
  return (
    <>
      <Routes>
        <Route path="/" element={<Navigate to="/main" />} />
        <Route path="/main" element={<MainLayout count={count} />}>
          <Route path="users" element={<UserPage setCount={setCount} />} />
          <Route
            path="products"
            element={<ProductPage setCount={setCount} />}
          />
          <Route path="tasks" element={<TasksPage setCount={setCount} />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
