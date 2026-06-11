import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";

// layout
import Layout from "./components/Layout/Layout";

// pages
import Login from "./pages/Login";
import User from "./pages/User";
import Onboarding from "./pages/Onboarding";
import Profile from "./pages/Profile";

import Dashboard from "./pages/Dashboard";
import Record from "./pages/Record";
import Items from "./pages/Items";
import Set from "./pages/Set";
import List from "./pages/List";

import Overview from "./pages/Overview";

function AppRoutes() {
  const location = useLocation();

  // Sidebarを出さないページ
  const hideLayout = ["/login", "/user", "/onboarding"];

  const isHidden = hideLayout.includes(location.pathname);

  if (isHidden) {
    return (
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/user" element={<User />} />
        <Route path="/onboarding" element={<Onboarding />} />
      </Routes>
    );
  }

  return (
    <Layout>
      <Routes>
        {/* ログイン系 */}
        <Route path="/profile" element={<Profile />} />

        {/* ダッシュボード */}
        <Route path="/" element={<Dashboard />} />
        <Route path="/:date" element={<Dashboard />} />

        {/* 食事記録 */}
        <Route path="/:date/meal/:mealType" element={<Record />} /> 

        {/* マスタ系 */}
        <Route path="/items" element={<Items />} />
        <Route path="/set" element={<Set />} />
        <Route path="/list" element={<List />} />

        {/* アプリ概要 */}
        <Route path="/overview" element={<Overview />} />
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