import { useNavigate, NavLink } from "react-router-dom";
import {
  FaUser,
  FaFileMedical,
  FaFileInvoiceDollar,
  FaPills,
  FaWarehouse,
  FaChartBar,
  FaSignOutAlt,
  FaUserMd
} from "react-icons/fa";
import "./Nav.css";

const menuItems = [
  { label: "Bệnh nhân", icon: <FaUser />, path: "/patients" },
  { label: "Phiếu khám bệnh", icon: <FaFileMedical />, path: "/prescriptions" },
  { label: "Hóa đơn", icon: <FaFileInvoiceDollar />, path: "/invoices" },
  { label: "Thuốc", icon: <FaPills />, path: "/drugs" },
  { label: "Nhập kho", icon: <FaWarehouse />, path: "/stock" },
  { label: "Báo cáo", icon: <FaChartBar />, path: "/reports" },
];

export default function Navbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Thêm logic xóa token/session nếu cần
    navigate("/");
  };

  return (
    <aside className="sidebar">
      <img src="src\assets\logo-txt.png" alt="Logo" className="sidebar-logo" />
      <nav className="sidebar-menu">
        {menuItems.map(item => (
          <NavLink
            to={item.path}
            key={item.path}
            className={({ isActive }) =>
              isActive ? "sidebar-link active" : "sidebar-link"
            }
          >
            <span className="sidebar-icon">{item.icon}</span>
            <span className="sidebar-label">{item.label}</span>
          </NavLink>
        ))}
      </nav>
      <div className="sidebar-footer">
        <div className="sidebar-divider"></div>
        <div className="sidebar-user">
          <FaUserMd />
          <span>Dr. Henry Huynh</span>
        </div>
        <button className="sidebar-logout" onClick={handleLogout}>
          <FaSignOutAlt />
          <span>Đăng xuất</span>
        </button>
      </div>
    </aside>
  );
}
