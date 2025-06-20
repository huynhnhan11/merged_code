import { useState, useEffect } from "react";
import "./DrugFormModal.css";

export default function DrugFormModal({ isOpen, onClose, onSubmit, initialData = null }) {
  const [formData, setFormData] = useState({
    TenThuoc: "",
    DonViTinh: "",
    GiaBan: 0,
    TonKho: 0,
    CachDung: "",
    SoDangKy: "",
    MaNhomThuoc: "",
  });
  const [nhomThuocList, setNhomThuocList] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8000/api/nhomthuoc")
      .then((res) => res.json())
      .then((data) => {
        setNhomThuocList(data);
        if (!initialData && data.length > 0) {
          setFormData(prev => ({ ...prev, MaNhomThuoc: data[0].MaNhomThuoc }));
        }
      })
      .catch((err) => console.error("Lỗi khi lấy nhóm thuốc:", err));

    if (initialData) {
      setFormData({
        TenThuoc: initialData.TenThuoc || "",
        DonViTinh: initialData.DonViTinh || "",
        GiaBan: initialData.GiaBan || 0,
        TonKho: initialData.TonKho || 0,
        CachDung: initialData.CachDung || "",
        SoDangKy: initialData.SoDangKy || "",
        MaNhomThuoc: initialData.MaNhomThuoc || "",
      });
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="drug-form-modal">
        <button className="modal-close" onClick={onClose}>&times;</button>
        <h3 className="modal-title">{initialData ? "Cập nhật thuốc" : "Thêm thuốc mới"}</h3>
        
        <form onSubmit={handleSubmit}>
          <div className="form-grid">
            <div className="form-group">
              <label>Tên thuốc *</label>
              <input
                type="text"
                name="TenThuoc"
                value={formData.TenThuoc}
                onChange={handleChange}
                required
                placeholder="Nhập tên thuốc"
              />
            </div>
            
            <div className="form-group">
              <label>Đơn vị tính *</label>
              <input
                type="text"
                name="DonViTinh"
                value={formData.DonViTinh}
                onChange={handleChange}
                required
                placeholder="Viên, lọ, vỉ..."
              />
            </div>
            
            <div className="form-group">
              <label>Giá bán (₫) *</label>
              <input
                type="number"
                name="GiaBan"
                value={formData.GiaBan}
                onChange={handleChange}
                required
                min="0"
                step="1000"
              />
            </div>
            
            <div className="form-group">
              <label>Tồn kho *</label>
              <input
                type="number"
                name="TonKho"
                value={formData.TonKho}
                onChange={handleChange}
                required
                min="0"
              />
            </div>
            
            <div className="form-group">
              <label>Số đăng ký</label>
              <input
                type="text"
                name="SoDangKy"
                value={formData.SoDangKy}
                onChange={handleChange}
                placeholder="Số đăng ký Bộ Y tế"
              />
            </div>
            
            <div className="form-group">
              <label>Nhóm thuốc *</label>
              <select
                name="MaNhomThuoc"
                value={formData.MaNhomThuoc}
                onChange={handleChange}
                required
              >
                {nhomThuocList.map(group => (
                  <option key={group.MaNhomThuoc} value={group.MaNhomThuoc}>
                    {group.TenNhom}
                  </option>
                ))}
              </select>
            </div>
            
            <div className="form-group form-full">
              <label>Cách dùng</label>
              <textarea
                name="CachDung"
                value={formData.CachDung}
                onChange={handleChange}
                placeholder="Hướng dẫn sử dụng..."
                rows={3}
              />
            </div>
          </div>
          
          <div className="modal-actions">
            <button type="button" className="btn-cancel" onClick={onClose}>
              Hủy
            </button>
            <button type="submit" className="btn-save">
              {initialData ? "Cập nhật" : "Thêm mới"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
