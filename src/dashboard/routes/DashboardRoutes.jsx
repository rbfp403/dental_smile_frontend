import { Navigate, Route, Routes } from "react-router-dom";
import {
  ConsultasAtendidas,
  DashboardPage,
  Ganancias,
  ListaGastos,
  ListaIngresos,
  ListaProcedOdon,
  ListaTiposConsOdon,
  ListaTiposPagos,
  ListaTiposTratam,
  PacientesPanel,
  ProcedRealizados,
} from "../pages";

export const DashboardRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<DashboardPage />} />
      <Route path="/*" element={<Navigate to="/administracion" />} />
      <Route path="/listaprocedimientosodon" element={<ListaProcedOdon />} />
      <Route path="/listatiposconsodon" element={<ListaTiposConsOdon />} />
      <Route path="/listatipostratam" element={<ListaTiposTratam />} />
      <Route path="/listatipospagos" element={<ListaTiposPagos />} />
      <Route path="/listaingresos" element={<ListaIngresos />} />
      <Route path="/listagastos" element={<ListaGastos />} />

      {/* paneles */}
      <Route path="/pacientes_data" element={<PacientesPanel />} />
      <Route path="/consultas_atendidas" element={<ConsultasAtendidas />} />
      <Route path="/procedimientos_realizados" element={<ProcedRealizados />} />
      <Route path="/ganancias_data" element={<Ganancias />} />
    </Routes>
  );
};
