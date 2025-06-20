import { useState } from "react";
import FilterBar from "../components/common/FilterBar";
import InvoiceList from "../components/invoices/InvoiceList";
import InvoiceForm from "../components/invoices/InvoiceForm";
import { useNavigate } from "react-router-dom";
import "../style/InvoicesPage.css";

export default function InvoicesPage() {
  const navigate = useNavigate();
  const [filters, setFilters] = useState({
    keyword: "",
    fromDate: null,
    toDate: null,
  });
  const [showForm, setShowForm] = useState(false);

  // Hàm lưu hóa đơn
  const handleAdd = (data) => {
    console.log("🧾 Hóa đơn mới:", data);
    // TODO: Gửi dữ liệu lên backend khi kết nối API
    setShowForm(false);
  };

  return (
    <div className="invoices-content">
      <div className="invoices-header">
        <h2 className="invoices-title">Quản lý Hóa đơn</h2>
        <div className="invoices-actions">
          <button
            className="invoices-btn add"
            onClick={() => setShowForm(true)}
          >
            + Tạo hóa đơn
          </button>
        </div>
      </div>
      <div className="filterbar-wrapper">
        <FilterBar onSearch={setFilters} />
      </div>
      <div className="invoices-table-wrapper">
        <InvoiceList filters={filters} />
      </div>
      {showForm && (
        <InvoiceForm
          onClose={() => setShowForm(false)}
          onSubmit={handleAdd}
        />
      )}
    </div>
  );
}
