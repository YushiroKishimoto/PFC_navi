import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";

// layout
import Layout from "./components/Layout/Layout";
import PrivateRoute from "./components/PrivateRoute";

// pages
import Login from "./pages/Login";
import User from "./pages/User";
import Onboarding from "./pages/Onboarding";
import Profile from "./pages/Profile";
import PasswordReset from "./pages/PasswordReset";

import Dashboard from "./pages/Dashboard";
import Record from "./pages/Record";
import Items from "./pages/Items";
import Set from "./pages/Set";
import List from "./pages/List";
import Analysis from "./pages/Analysis";

import Overview from "./pages/Overview";

function AppRoutes() {
  const location = useLocation();

  // Sidebarを出さないページ
  const hideLayout = ["/login", "/user", "/onboarding", "/password-reset"];

  const isHidden = hideLayout.includes(location.pathname);

  if (isHidden) {
    return (
      <Routes>
        {/* 認証不要 */}
        <Route path="/login" element={<Login />} />
        <Route path="/user" element={<User />} />
        <Route path="/password-reset" element={<PasswordReset />} />
        
        {/* 認証必須 */}
        <Route element={<PrivateRoute />}>
          <Route path="/onboarding" element={<Onboarding />} />
        </Route>
      </Routes>
    );
  }

  return (
    <Layout>
      <Routes>
        {/* 認証必須 */}
        <Route element={<PrivateRoute />}>
          {/* ログイン系 */}
          <Route path="/profile" element={<Profile />} />

          {/* ダッシュボード */}
          <Route path="/" element={<Dashboard />} />
          <Route path="/:date" element={<Dashboard />} />

          {/* 食事記録 */}
          <Route path="/:date/meal/:mealType" element={<Record />} /> 

          <Route path="/analysis" element={<Analysis />} />

          {/* マスタ系 */}
          <Route path="/items" element={<Items />} />
          <Route path="/set" element={<Set />} />
          <Route path="/list" element={<List />} />

          {/* アプリ概要 */}
          <Route path="/overview" element={<Overview />} />
        </Route>
      </Routes>
    </Layout>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
}