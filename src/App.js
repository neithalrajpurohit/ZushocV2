import "./App.css";
import { Routes, Route } from "react-router-dom";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Feed from "./Components/Feed";
import Profile from "./Components/Profile";
import FollowSuggestions from "./Components/FollowSuggestions";
import ProtectedRoute from "./Components/ProtectedRoute";

function App() {
    return (
        <div>
            <Routes>
                <Route path="/signup" element={<Signup />} />
                <Route path="/login" element={<Login />} />

                <Route
                    path="/"
                    element={
                        <ProtectedRoute>
                            <Feed />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/profile/:username"
                    element={
                        <ProtectedRoute>
                            <Profile />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/followsuggestions"
                    element={
                        <ProtectedRoute>
                            <FollowSuggestions />
                        </ProtectedRoute>
                    }
                />
            </Routes>
        </div>
    );
}

export default App;
