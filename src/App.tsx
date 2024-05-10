import { Route, Routes } from 'react-router-dom'
import './App.css'
import { AuthLayout } from './layouts/auth-layout'
import { PrimaryLayout } from './layouts/primary-layout'
import { Home } from './pages/home/home-page'
import { Login } from './pages/login/login-page'
import { RegisterPage } from './pages/register/register-page'
import { useEffect } from 'react'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from './firebase/firebaseConfig'
import { useDispatch } from 'react-redux'
import { fetchUserInfo, login, logout } from './store/userSlice'
import { ProtectedRoutes } from './utils/protected-route'

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      if (user) {
        dispatch(login(user));
        dispatch(fetchUserInfo(user.uid));
      } else {
        dispatch(logout());
      }
    });
    return () => {
      unsub();
    };
  }, [dispatch]);

  return (
    <>
      <Routes>
        <Route path="/" element={<PrimaryLayout />}>
          <Route element={<ProtectedRoutes />} >
            <Route index element={<Home />} />
          </Route>
          {/* <Route path="friends" element={protect(Friends)} /> */}
          {/* <Route path="chat" element={protect(Chat)} /> */}
          {/* <Route path="notifications" element={protect(Notifications)} /> */}
        </Route>
        <Route path="/auth" element={<AuthLayout />}>
          <Route path="login" element={<Login />} />
          <Route path="register" element={<RegisterPage />} />
        </Route>
        <Route path="*" element={<p>page not found</p>} />
      </Routes>
    </>
  )
}

export default App
