import { useState } from "react";
import FilterBar from "../components/common/FilterBar";
import StockEntryList from "../components/stock/StockList";
import StockEntryForm from "../components/stock/StockEntryForm";
import "../style/StockEntries.css";

export default function StockEntriesPage() {
  const [filters, setFilters] = useState({
    keyword: "",
    fromDate: null,
    toDate: null,
  });
  
  const [showForm, setShowForm] = useState(false);
  const [editingEntry, setEditingEntry] = useState(null);

  const handleAdd = (data) => {
    console.log("📝 Phiếu nhập mới:", data);
    setShowForm(false);
  };

  const handleEdit = (data) => {
    console.log("✏️ Cập nhật phiếu nhập:", data);
    setShowForm(false);
    setEditingEntry(null);
  };

  const openEditForm = (entry) => {
    setEditingEntry(entry);
    setShowForm(true);
  };

  return (
    <div className="stock-entries-page">
      <div className="page-header">
        <h2 className="page-title">Quản lý Nhập kho</h2>
        <div className="page-actions">
          <button 
            className="btn-add" 
            onClick={() => {
              setEditingEntry(null);
              setShowForm(true);
            }}
          >
            + Tạo phiếu nhập
          </button>
        </div>
      </div>

      <div className="filterbar-wrapper">
        <FilterBar onSearch={setFilters} />
      </div>

      <StockEntryList 
        filters={filters} 
        onEdit={openEditForm} 
      />
      
      {showForm && (
        <StockEntryForm
          initialData={editingEntry}
          onSave={editingEntry ? handleEdit : handleAdd}
          onClose={() => {
            setShowForm(false);
            setEditingEntry(null);
          }}
        />
      )}
    </div>
  );
}