import { Navigate, Route, Routes } from "react-router-dom";
import { PacientesPage } from "../pages";
import { PacienteHistorial } from "../../historial/pages";
import { ConsultaPage } from "../../consulta/pages";

export const PacientesRoutes = () => {
  return (
    <Routes>
      <Route path="/*" element={<Navigate to="/pacientes" />} />
      <Route path="/" element={<PacientesPage />} />
      <Route path="/:id_pac/historial" element={<PacienteHistorial />} />
      <Route path="/:id_pac/historial/:id_cons" element={<ConsultaPage />} />
    </Routes>
  );
};
