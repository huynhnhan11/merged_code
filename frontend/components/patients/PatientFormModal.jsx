import React, { useEffect, useRef } from "react";
import { cleanFormData } from "../../utils/cleanFormData";
import "./PatientsForm.css";

export default function PatientFormModal({ isOpen, onClose, onSubmit }) {
  const [formData, setFormData] = React.useState({
    HoTen: "",
    GioiTinh: "Nam",
    NamSinh: "",
    SoDienThoai: "",
    DiaChi: "",
    MaNgheNghiep: "",
    Nhom: "Thứ tự chờ khám",
    CanNang: "",
    ChieuCao: "",
    Mach: "",
    NhietDo: "",
    HuyetAp: "",
    TienSu: "",
    NgayTao: new Date().toISOString().slice(0, 10),
  });

  const formRef = useRef(null);

  useEffect(() => {
    if (isOpen && formRef.current) {
      formRef.current.querySelector("input, select, textarea")?.focus();
    }
    const handleEsc = (e) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [isOpen, onClose]);

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
    <div className="modal-overlay" tabIndex={-1} aria-modal="true" role="dialog">
      <div className="modal-form">
        <button className="modal-close" onClick={onClose} title="Đóng" aria-label="Đóng">&times;</button>
        <h3 className="modal-title">Thông tin bệnh nhân</h3>
        <form ref={formRef} onSubmit={handleSubmit} className="form-grid" autoComplete="off">
          <div className="form-group">
            <label>Họ tên</label>
            <input name="HoTen" value={formData.HoTen} onChange={handleChange} placeholder="Nhập họ tên" required />
          </div>
          <div className="form-group">
            <label>Giới tính</label>
            <select name="GioiTinh" value={formData.GioiTinh} onChange={handleChange}>
              <option value="Nam">Nam</option>
              <option value="Nữ">Nữ</option>
              <option value="Khác">Khác</option>
            </select>
          </div>
          <div className="form-group">
            <label>Năm sinh</label>
            <input name="NamSinh" value={formData.NamSinh} onChange={handleChange} placeholder="VD: 1995" required />
          </div>
          <div className="form-group">
            <label>Số điện thoại</label>
            <input name="SoDienThoai" value={formData.SoDienThoai} onChange={handleChange} placeholder="09xxxxxxx" />
          </div>
          <div className="form-group">
            <label>Địa chỉ</label>
            <input name="DiaChi" value={formData.DiaChi} onChange={handleChange} placeholder="Nhập địa chỉ" />
          </div>
          <div className="form-group">
            <label>Nghề nghiệp</label>
            <input name="MaNgheNghiep" value={formData.MaNgheNghiep} onChange={handleChange} placeholder="Nhập nghề nghiệp" />
          </div>
          <div className="form-group">
            <label>Nhóm</label>
            <select name="Nhom" value={formData.Nhom} onChange={handleChange}>
              <option>Thứ tự chờ khám</option>
              <option>VIP</option>
              <option>Bảo hiểm</option>
            </select>
          </div>
          <div className="form-group">
            <label>Cân nặng (kg)</label>
            <input name="CanNang" value={formData.CanNang} onChange={handleChange} placeholder="VD: 60" />
          </div>
          <div className="form-group">
            <label>Chiều cao (cm)</label>
            <input name="ChieuCao" value={formData.ChieuCao} onChange={handleChange} placeholder="VD: 170" />
          </div>
          <div className="form-group">
            <label>Mạch</label>
            <input name="Mach" value={formData.Mach} onChange={handleChange} placeholder="VD: 80" />
          </div>
          <div className="form-group">
            <label>Nhiệt độ (°C)</label>
            <input name="NhietDo" value={formData.NhietDo} onChange={handleChange} placeholder="VD: 36.5" />
          </div>
          <div className="form-group">
            <label>Huyết áp</label>
            <input name="HuyetAp" value={formData.HuyetAp} onChange={handleChange} placeholder="VD: 120/80" />
          </div>
          <div className="form-group form-full">
            <label>Tiền sử bệnh</label>
            <textarea name="TienSu" value={formData.TienSu} onChange={handleChange} placeholder="Ghi chú tiền sử bệnh..." rows={2} />
          </div>
          <div className="modal-actions form-full">
            <button className="btn-cancel" type="button" onClick={onClose}>Hủy</button>
            <button className="btn-save" type="submit">Lưu</button>
          </div>
        </form>
      </div>
    </div>
  );
}
