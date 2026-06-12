import { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { isAuthenticated } from "../utils/auth";

export default function PrivateRoute() {
  const [ok, setOk] = useState(null);

  useEffect(() => {
    isAuthenticated().then(setOk);
  }, []);

  if (ok === null) return <div>loading...</div>; // ローディング中

  return ok ? <Outlet /> : <Navigate to="/login" replace />;
}