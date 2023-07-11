import { Navigate, Route, Routes } from "react-router-dom";
import { AgendaPage } from "../pages";

export const AgendaRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<AgendaPage />} />
      <Route path="/*" element={<Navigate to="/agenda" />} />
    </Routes>
  );
};
