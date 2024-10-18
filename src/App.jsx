import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { AuthProvider, PrivateRoute, useAuth } from "./Context/AuthContext";
import Login from "./Components/Login";
import DragAndDrop from "./components/DragAndDrop";
import Card from "./components/Card";
import Video from "./components/Video";
import Toast from "./Components/Toast";
import SignUp from "./Components/SignUp";

const AppContent = () => {
  const { user, logout, isLoggedIn } = useAuth();

  return (
    <>
      <div className="p-container">
        {user && (
          <nav className="bg-gray-800 p-4 mb-4">
            <div className="flex justify-between items-center">
              <span className="text-white">Welcome, {user.email}</span>
              <button
                onClick={logout}
                className="bg-red-500 text-white px-4 py-2 rounded"
              >
                Logout
              </button>
            </div>
          </nav>
        )}

        <Routes>
          <Route path="/signup" element={<SignUp />} />
          <Route path="/" element={<Login />} />
          <Route
            path="/dragDrop"
            element={
              <PrivateRoute
                element={() => <DragAndDrop accept={[".jpg", ".mp4"]} />}
                requiredRole="user"
              />
            }
          />
          <Route
            path="/card"
            element={
              isLoggedIn ? (
                <Card
                  imageUrl="./tx_logo.png"
                  title="Karan"
                  content="Hi how are you and what are you doing"
                  customStyles={{
                    card: {
                      maxWidth: "500px",
                      backgroundColor: "#f0f0f0",
                    },
                    title: {
                      color: "#007bff",
                      fontSize: "1.5rem",
                    },
                    content: {
                      fontStyle: "italic",
                    },
                  }}
                />
              ) : (
                <Login />
              )
            }
          />
          <Route
            path="/video"
            element={
              isLoggedIn && user.role === "admin" ? (
                <Video
                  isYouTube={true}
                  controls={false}
                  light={"./tx_logo.png"}
                  width={"500px"}
                  src="https://www.youtube.com/embed/dQw4w9WgXcQ"
                />
              ) : (
                <Login />
              )
            }
          />

          <Route
            path="/unauthorized"
            element={<div>Unauthorized Access</div>}
          />
        </Routes>

        <Toast />
      </div>
    </>
  );
};

const App = () => (
  <AuthProvider>
    <AppContent />
  </AuthProvider>
);

export default App;
