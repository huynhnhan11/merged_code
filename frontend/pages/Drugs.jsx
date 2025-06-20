import { useState } from "react";
import FilterBar from "../components/common/FilterBar";
import DrugList from "../components/drugs/DrugList";
import DrugFormModal from "../components/drugs/DrugFormModal";
import "../style/DrugsPage.css";

export default function DrugsPage() {
  const [filters, setFilters] = useState({});
  const [showForm, setShowForm] = useState(false);

  const handleAdd = async (drug) => {
    try {
      const res = await fetch("http://localhost:8000/api/thuoc", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(drug),
      });
      const result = await res.json();
      console.log("✅ Thêm thuốc:", result);
      setShowForm(false);
    } catch (err) {
      console.error("❌ Lỗi:", err);
    }
  };

  return (
    <div className="drugs-content">
      <div className="drugs-header">
        <h2 className="drugs-title">Quản lý thuốc</h2>
        <div className="drugs-actions">
          <button
            className="drugs-btn add"
            onClick={() => setShowForm(true)}
          >
            + Thêm thuốc
          </button>
        </div>
      </div>

      <div className="filterbar-wrapper">
        <FilterBar onSearch={setFilters} />
      </div>

      <DrugList filters={filters} />

      {showForm && (
        <DrugFormModal
          isOpen={showForm} 
          onClose={() => setShowForm(false)}
          onSubmit={handleAdd}
        />
      )}
    </div>
  );
}
