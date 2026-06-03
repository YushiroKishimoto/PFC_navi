import { BrowserRouter, Routes, Route } from "react-router-dom";

// pages
import Login from "./pages/Login";
import User from "./pages/User";
import Onboarding from "./pages/Onboarding";
import Profile from "./pages/profile";

import Dashboard from "./pages/Dashboard/Today";
import DailyRecord from "./pages/Dashboard/Daily";

import Record from "./pages/Record";
import ItemRegister from "./pages/Items";
import SetPage from "./pages/Set";
import List from "./pages/List";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* SCR-001 */}
        <Route path="/login" element={<Login />} />

        {/* SCR-002 */}
        <Route path="/user" element={<User />} />

        {/* SCR-003 */}
        <Route path="/onboarding" element={<Onboarding />} />

        {/* SCR-004 */}
        <Route path="/profile" element={<Profile />} />

        {/* SCR-005 */}
        <Route path="/" element={<Dashboard />} />

        {/* SCR-006 */}
        <Route path="/records/:date" element={<DailyRecord />} />

        {/* SCR-007 */}
        <Route path="/records/:date/meal" element={<Record />} />

        {/* SCR-008 */}
        <Route path="/items/register" element={<ItemRegister />} />

        {/* SCR-009 */}
        <Route path="/set" element={<SetPage />} />

        {/* SCR-010 */}
        <Route path="/list" element={<List />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
