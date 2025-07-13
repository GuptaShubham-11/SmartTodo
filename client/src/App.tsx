import { BrowserRouter, Route, Routes } from 'react-router-dom';

import {
  PublicRoute,
  Signup,
  Signin,
  ProtectedRoute,
  Layout,
} from './components';

import { useEffect, useState } from 'react';
import { useAuthStore } from './store/authStore';
import { userApi } from './api/userApi';
import { Board, Dashboard, Group, Home, KanbanBoard } from './pages';
import { Loader } from 'lucide-react';

function App() {
  const { login, logout } = useAuthStore();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getCurrentUser = async () => {
      try {
        const response = await userApi.getCurrentUser();
        // console.log(response);

        if (response.statusCode < 400) {
          login(response.data);
        }
      } catch {
        logout();
      } finally {
        setLoading(false);
      }
    };

    getCurrentUser();
  }, []);

  if (loading) {
    return <Loader />;
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <PublicRoute>
              <Home />
            </PublicRoute>
          }
        />
        <Route
          path="/signup"
          element={
            <PublicRoute>
              <Signup />
            </PublicRoute>
          }
        />
        <Route
          path="/signin"
          element={
            <PublicRoute>
              <Signin />
            </PublicRoute>
          }
        />
        <Route
          element={
            <ProtectedRoute>
              <Layout />
            </ProtectedRoute>
          }
        >
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/groups"
            element={
              <ProtectedRoute>
                <Group />
              </ProtectedRoute>
            }
          />
          <Route
            path="/groups/:groupId/boards"
            element={
              <ProtectedRoute>
                <Board />
              </ProtectedRoute>
            }
          />
          <Route
            path="/groups/:groupId/boards/:boardId"
            element={
              <ProtectedRoute>
                <KanbanBoard />
              </ProtectedRoute>
            }
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
