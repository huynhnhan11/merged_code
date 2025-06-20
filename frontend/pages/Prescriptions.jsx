import { useState } from "react";
import { useNavigate } from "react-router-dom";
import FilterBar from "../components/common/FilterBar";
import PrescriptionList from "../components/prescriptions/PrescriptionList";
import "../style/PrescriptionsPage.css";

export default function PrescriptionsPage() {
  const [filters, setFilters] = useState({
    keyword: "",
    fromDate: null,
    toDate: null,
  });
  const navigate = useNavigate();

  const handleAddPrescription = () => {
    navigate("/prescriptions/create");
  };

  return (
    <div className="prescriptions-content">
      <div className="prescriptions-header">
        <h2 className="prescriptions-title">Danh sách phiếu khám bệnh</h2>
        <div className="prescriptions-actions">
          <button
            className="prescriptions-btn add"
            onClick={handleAddPrescription}
          >
            + Thêm phiếu khám
          </button>
        </div>
      </div>
      <div className="filterbar-wrapper">
        <FilterBar onSearch={setFilters} />
      </div>
      <div className="prescriptions-table-wrapper">
        <PrescriptionList filters={filters} />
      </div>
    </div>
  );
}
