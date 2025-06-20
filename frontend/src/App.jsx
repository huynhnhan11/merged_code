import { BrowserRouter as Router, Routes, Route, Outlet } from 'react-router-dom';
import LandingPage from '../pages/LandingPage';
import LoginPage from '../pages/LoginPage';
import Patients from '../pages/Patients';
import Prescriptions from '../pages/Prescriptions';
import PrescriptionForm from '../components/prescriptions/PrescriptionForm';
import Invoices from '../pages/Invoices';
import Drugs from '../pages/Drugs';
import Stock from '../pages/StockEntryList';
import Reports from '../pages/Reports';
import PrescriptionDetail from "../components/details/PrescriptionDetail";
import Navbar from '../components/layout/Navbar';

const DashboardLayout = () => (
  <div style={{ display: "flex", minHeight: "100%"}}>
    <Navbar />
    <main className="main-content">
      <Outlet />
    </main>
  </div>
);

function App() {
  return (
    <Router>
      <Routes>
        {/* Trang không có sidebar */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />

        {/* Các trang có sidebar */}
        <Route element={<DashboardLayout />}>
          <Route path="/patients" element={<Patients />} />
          <Route path="/prescriptions" element={<Prescriptions />} />
          <Route path="/invoices" element={<Invoices />} />
          <Route path="/drugs" element={<Drugs />} />
          <Route path="/reports" element={<Reports />} />
          <Route path="/stock" element={<Stock />} />
          <Route path="/prescriptions/detail/:MaPhieu" element={<PrescriptionDetail />} />
          <Route path="/prescriptions/new/:patientId" element={<PrescriptionForm />} />
          <Route path="/prescriptions/create" element={<PrescriptionForm />} />
          <Route path="/prescriptions/create/:MaBenhNhan" element={<PrescriptionForm />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
