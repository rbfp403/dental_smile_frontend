import { Navigate, Route, Routes } from "react-router-dom";
import { AppTheme } from "../theme";
import { AgendaRoutes } from "../agenda";
import { DashboardRoutes } from "../dashboard";
import { PacientesRoutes } from "../pacientes";
import { LoginPage } from "../auth/pages";

//
//
//

export const AppRouter = () => {
  return localStorage.getItem("auth") !== "true" ? (
    <Routes>
      <Route path="/auth/login" element={<LoginPage />} />
      <Route path="/*" element={<Navigate to="/auth/login" />} />
    </Routes>
  ) : (
    <AppTheme>
      <Routes>
        <Route path="/*" element={<Navigate to={"/agenda"} />} />
        <Route path="/agenda/*" element={<AgendaRoutes />} />
        <Route path="/administracion/*" element={<DashboardRoutes />} />
        <Route path="/pacientes/*" element={<PacientesRoutes />} />
      </Routes>
    </AppTheme>
  );
};
