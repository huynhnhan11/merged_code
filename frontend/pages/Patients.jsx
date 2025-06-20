import {useEffect, useState } from "react";
import FilterBar from "../components/common/FilterBar";
import PatientList from "../components/patients/PatientList";
import PatientFormModal from "../components/patients/PatientFormModal";
import "../style/PatientsPage.css";
import { fetchPatients } from "../src/api"; 


export default function Patients() {
  const [filters, setFilters] = useState({
    keyword: "",
    fromDate: null,
    toDate: null,
  });
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(true);
    // Gọi API khi filters thay đổi hoặc sau khi thêm mới
    const loadPatients = async () => {
        try {
            setLoading(true);
            const data = await fetchPatients();
            setPatients(data);
        } catch (err) {
            console.error("❌ Lỗi khi tải danh sách bệnh nhân:", err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadPatients();
    }, []);

  const handleAdd = async (data) => {
    try {
      const response = await fetch("http://localhost:8000/api/benhnhan/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
      });
      if (!response.ok) {
        const error = await response.json();
        alert("❌ Lỗi: " + error.detail);
        return;
      }
      setShowModal(false);
      // TODO: reload danh sách
    } catch (err) {
      alert("❌ Không thể kết nối tới máy chủ.");
    }
  };

  return (
    <div className="patients-content">
      <div className="patients-header">
        <h2 className="patients-title">Danh sách bệnh nhân</h2>
        <div className="patients-actions">
          <button
            className="patients-btn add"
            onClick={() => setShowModal(true)}
            title="Thêm bệnh nhân"
          >
            + Thêm bệnh nhân
          </button>
        </div>
      </div>

      {/* FilterBar căn giữa */}
      <div className="filterbar-wrapper">
        <FilterBar onSearch={setFilters} />
      </div>

      <div className="patients-table-wrapper">
            {/* PatientList nhận dữ liệu đã load */}
            <PatientList filters={filters} patients={Patients} loading={loading} />
      </div>
      <PatientFormModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        onSubmit={handleAdd}
      />
    </div>
  );
}
