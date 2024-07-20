import React from "react";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import ScrollToTop from "./ScrollToTop";
import Home from "./pages/Home";
import FreeAuthRoute from "./routes/FreeAuthRoute";
import ProtectedRoute from "./routes/ProtectedRoute";
import Login from "./pages/admin/UserLogin";
import SignUp from "./pages/admin/SignUp";
import Add from "./pages/admin/Add";

const CreateRoutes = () => {
  return (
    <BrowserRouter>
      <ScrollToTop>
        <Routes>
          <Route path="/login">
            <Route
              path="/login"
              exact
              element={
                <FreeAuthRoute title={"Sign In"}>
                  <Login />
                </FreeAuthRoute>
              }
            />
          </Route>
          <Route path="/signup">
            <Route
              path="/signup"
              exact
              element={
                <FreeAuthRoute title={"Sign Up"}>
                  <SignUp />
                </FreeAuthRoute>
              }
            />
          </Route>
          {/* Front Page Route */}
          <Route path="/">
            <Route
              path="/"
              exact
              element={
                <ProtectedRoute title={"Home"}>
                  <Home />
                </ProtectedRoute>
              }
            />
          </Route>
          <Route path="/add">
            <Route
              path="/add"
              exact
              element={
                <ProtectedRoute title={"Add"}>
                  <Add />
                </ProtectedRoute>
              }
            />
          </Route>
          <Route path="/edit/:id">
            <Route
              path="/edit/:id"
              exact
              element={
                <ProtectedRoute title={"edit"}>
                  <Add />
                </ProtectedRoute>
              }
            />
          </Route>
        </Routes>
      </ScrollToTop>
    </BrowserRouter>
  );
};

export default CreateRoutes;
