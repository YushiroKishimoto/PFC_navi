import { BrowserRouter, Routes, Route } from "react-router-dom";

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

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* ログイン系 */}
        <Route path="/login" element={<Login />} />
        <Route path="/user" element={<User />} />
        <Route path="/onboarding" element={<Onboarding />} />
        <Route path="/profile" element={<Profile />} />

        {/* ダッシュボード（今日 or 日付） */}
        <Route path="/" element={<Dashboard />} />
        <Route path="/:date" element={<Dashboard />} />

        {/* 食事記録（特定日） */}
        <Route path="/:date/meal" element={<Record />} />

        {/* マスタ系 */}
        <Route path="/items" element={<Items />} />
        <Route path="/set" element={<Set />} />
        <Route path="/list" element={<List />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;