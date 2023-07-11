import { useEffect } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { AppTheme } from "../theme";
import { AgendaRoutes } from "../agenda";
import { DashboardRoutes } from "../dashboard";
import { PacientesRoutes } from "../pacientes";
import { LoginPage } from "../auth/pages";
import { useAuthStore } from "../hooks";

export const AppRouter = () => {
  //
  const { authenticatedStatus, checkAuthStatus } = useAuthStore();

  useEffect(() => {
    checkAuthStatus();
  }, []);

  const lastRoute = localStorage.getItem("lastRoute") || "/agenda";

  return authenticatedStatus === false ? (
    <Routes>
      <Route path="/auth/login" element={<LoginPage />} />
      <Route path="/*" element={<Navigate to="/auth/login" />} />
    </Routes>
  ) : (
    <AppTheme>
      <Routes>
        <Route path="/*" element={<Navigate to={lastRoute} />} />
        <Route path="/agenda/*" element={<AgendaRoutes />} />
        <Route path="/administracion/*" element={<DashboardRoutes />} />
        <Route path="/pacientes/*" element={<PacientesRoutes />} />
      </Routes>
    </AppTheme>
  );
};
