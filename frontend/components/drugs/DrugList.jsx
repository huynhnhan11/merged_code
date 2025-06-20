import { useEffect, useState, useMemo } from "react";
import DrugRow from "./DrugRow";
import DrugFormModal from "./DrugFormModal";
import "./DrugList.css";

export default function DrugList({ filters }) {
  const [drugs, setDrugs] = useState([]);
  const [groups, setGroups] = useState([]);
  const [selectedGroup, setSelectedGroup] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [selectedDrug, setSelectedDrug] = useState(null);

  useEffect(() => {
    fetch("http://localhost:8000/api/thuoc")
      .then(res => res.json())
      .then(setDrugs)
      .catch(console.error);
      
    fetch("http://localhost:8000/api/nhomthuoc")
      .then(res => res.json())
      .then(setGroups)
      .catch(console.error);
  }, []);

  // Lọc thuốc theo nhóm và từ khóa
  const filteredDrugs = useMemo(() => {
    const { keyword = "" } = filters || {};
    const kw = keyword.toLowerCase().trim();
    
    return drugs
      .filter(d => !selectedGroup || d.MaNhomThuoc === selectedGroup)
      .filter(d => 
        d.TenThuoc.toLowerCase().includes(kw) ||
        (d.SoDangKy && d.SoDangKy.toLowerCase().includes(kw)) ||
        d.DonViTinh.toLowerCase().includes(kw)
      );
  }, [drugs, selectedGroup, filters]);

  const handleDelete = (drugId) => {
    if (window.confirm("Bạn có chắc muốn xóa thuốc này?")) {
      fetch(`http://localhost:8000/api/thuoc/${drugId}`, { method: "DELETE" })
        .then(() => {
          setDrugs(drugs.filter(drug => drug.MaThuoc !== drugId));
        })
        .catch((err) => console.error("Xóa thuốc lỗi:", err));
    }
  };

  const handleEdit = (drug) => {
    setIsEditing(true);
    setSelectedDrug(drug);
  };

  const handleSave = (updatedDrug) => {
    fetch(`http://localhost:8000/api/thuoc/${updatedDrug.MaThuoc}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedDrug),
    })
      .then(res => res.json())
      .then(data => {
        setDrugs(drugs.map(d => d.MaThuoc === data.MaThuoc ? data : d));
        setIsEditing(false);
      })
      .catch(err => console.error("Cập nhật thuốc lỗi:", err));
  };

  return (
    <div className="drugs-list-container">
      <div className="drugs-filter-bar">
        <select
          value={selectedGroup || ""}
          onChange={(e) => setSelectedGroup(e.target.value || null)}
          className="group-select"
        >
          <option value="">-- Tất cả nhóm thuốc --</option>
          {groups.map(group => (
            <option key={group.MaNhomThuoc} value={group.MaNhomThuoc}>
              {group.TenNhom}
            </option>
          ))}
        </select>
      </div>

      <div className="drugs-table-container">
        <table className="drugs-table">
          <thead>
            <tr>
              <th>MÃ</th>
              <th>SỐ ĐK</th>
              <th>TÊN</th>
              <th>ĐƠN VỊ</th>
              <th>GIÁ BÁN</th>
              <th>TỒN KHO</th>
              <th>CÁCH DÙNG</th>
              <th>CHỨC NĂNG</th>
            </tr>
          </thead>
          <tbody>
            {filteredDrugs.length > 0 ? (
              filteredDrugs.map(drug => (
                <DrugRow
                  key={drug.MaThuoc}
                  data={drug}
                  onEdit={() => handleEdit(drug)}
                  onDelete={() => handleDelete(drug.MaThuoc)}
                />
              ))
            ) : (
              <tr>
                <td colSpan={8} className="no-data">
                  <div className="no-data-content">
                    <p>Không tìm thấy thuốc nào</p>
                    <small>Thử thay đổi tiêu chí tìm kiếm</small>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {isEditing && (
        <DrugFormModal
          isOpen={isEditing}
          onClose={() => setIsEditing(false)}
          onSubmit={handleSave}
          initialData={selectedDrug}
        />
      )}
    </div>
  );
}
