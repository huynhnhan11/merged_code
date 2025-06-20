import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FaPlusCircle, FaTrashAlt } from "react-icons/fa";
import "./form.css";

// Đưa InputLine ra ngoài PrescriptionForm để không bị mất focus khi nhập liệu
const InputLine = ({ field, value, placeholder, unit, type = "text", onChange, ...rest }) => (
  <div className="form-group">
    <label>{placeholder}</label>
    <input
      type={type}
      name={field}
      value={value || ""}
      onChange={onChange}
      placeholder={placeholder}
      {...rest}
    />
    {unit && <span className="input-unit">{unit}</span>}
  </div>
);

export default function PrescriptionForm() {
  const { MaBenhNhan, MaPhieuKham } = useParams();
  const isEdit = !!MaPhieuKham;
  const isSample = !MaBenhNhan && !MaPhieuKham;
  const navigate = useNavigate();

  const [form, setForm] = useState({
    HoTen: "",
    NamSinh: "",
    Mach: "",
    NhietDo: "",
    HuyetAp: "",
    CanNang: "",
    ChanDoan: "",
    TaiKham: "",
    GhiChu: "",
    ThoiGianDungThuoc: "1 Ngày",
  });
  const [groups, setGroups] = useState([]);
  const [selectedGroup, setSelectedGroup] = useState("");
  const [drugs, setDrugs] = useState([]);
  const [selectedDrugs, setSelectedDrugs] = useState([]);
  const [maBenhNhanFromEdit, setMaBenhNhanFromEdit] = useState(null);

  const handleInputChange = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  useEffect(() => {
    if (isEdit) {
      fetch(`http://localhost:8000/api/phieukham/${MaPhieuKham}`)
        .then((res) => res.json())
        .then((data) => {
          setForm({
            HoTen: data.benhnhan?.HoTen || "",
            NamSinh: data.benhnhan?.NamSinh || "",
            Mach: data.benhnhan?.Mach || "",
            NhietDo: data.benhnhan?.NhietDo || "",
            HuyetAp: data.benhnhan?.HuyetAp || "",
            CanNang: data.benhnhan?.CanNang || "",
            ChanDoan: data.ChanDoan || "",
            TaiKham: data.TaiKham || "",
            GhiChu: data.GhiChu || "",
            ThoiGianDungThuoc: "1 Ngày"
          });
          setMaBenhNhanFromEdit(data.MaBenhNhan);
        });

      fetch(`http://localhost:8000/api/phieukham/${MaPhieuKham}/thuoc`)
        .then((res) => res.json())
        .then((thuocs) => {
          setSelectedDrugs(
            thuocs.map((t) => ({
              MaThuoc: t.MaThuoc,
              TenThuoc: t.TenThuoc,
              DonViTinh: t.DonViTinh,
              GiaBan: t.GiaBan,
              SoLuong: t.SoLuong,
              CachDung: t.CachDung
            }))
          );
        });
    } else if (!isSample) {
      fetch(`http://localhost:8000/api/benhnhan/${MaBenhNhan}`)
        .then((res) => res.json())
        .then((data) => {
          setForm((prev) => ({
            ...prev,
            HoTen: data.HoTen || "",
            NamSinh: data.NamSinh || "",
            Mach: data.Mach || "",
            NhietDo: data.NhietDo || "",
            HuyetAp: data.HuyetAp || "",
            CanNang: data.CanNang || ""
          }));
        });
    } else {
      setForm((prev) => ({ ...prev, HoTen: "Mẫu" }));
    }

    fetch("http://localhost:8000/api/nhomthuoc")
      .then((res) => res.json())
      .then(setGroups);

    fetch("http://localhost:8000/api/thuoc")
      .then((res) => res.json())
      .then(setDrugs);
  }, [MaBenhNhan, MaPhieuKham, isEdit, isSample]);

  const addDrug = (drug) => {
    setSelectedDrugs((prev) => [
      ...prev,
      {
        ...drug,
        CachDung: drug.CachDung || "",
        SoLuong: 1
      }
    ]);
  };

  const updateDrugField = (index, field, value) => {
    const updated = [...selectedDrugs];
    updated[index][field] = value;
    setSelectedDrugs(updated);
  };

  const removeDrug = (index) => {
    setSelectedDrugs((prev) => prev.filter((_, i) => i !== index));
  };

  const totalCost = selectedDrugs.reduce(
    (sum, d) => sum + (d.SoLuong || 0) * (d.GiaBan || 0),
    0
  );

  const handleSubmit = async (e) => {
    e.preventDefault();
    const maBN = isEdit ? maBenhNhanFromEdit : parseInt(MaBenhNhan);
    const isValidPatient = !isNaN(maBN);

    const payload = {
      MaBenhNhan: isValidPatient ? maBN : null,
      ChanDoan: form.ChanDoan,
      NgayLap: new Date().toISOString().split("T")[0],
      NguoiLap: "ThanhPhat",
      TaiKham: form.TaiKham || null,
      GhiChu: form.GhiChu,
      thuocs: selectedDrugs.map((d) => ({
        MaThuoc: d.MaThuoc,
        SoLuong: d.SoLuong,
        CachDung: d.CachDung
      })),
      dichvus: []
    };
    if (!isValidPatient) payload.HoTen = "Mẫu";

    const url = isEdit
      ? `http://localhost:8000/api/phieukham/${MaPhieuKham}`
      : "http://localhost:8000/api/phieukham";
    const method = isEdit ? "PUT" : "POST";

    try {
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });

      if (!res.ok) {
        const err = await res.json();
        alert("❌ Lỗi: " + (err.detail || JSON.stringify(err)));
        return;
      }

      const result = await res.json();
      alert(`${isEdit ? "✅ Cập nhật" : "✅ Đã lưu"} phiếu khám #${result.MaPhieuKham}`);
      navigate("/prescriptions");
    } catch (err) {
      console.error("Lỗi khi gửi:", err);
      alert("❌ Gửi không thành công");
    }
  };

  return (
    <div className="prescriptionform-single">
      <form className="prescriptionform-main" onSubmit={handleSubmit} autoComplete="off">
        <h2 className="form-title">{isEdit ? "✏️ Cập nhật phiếu khám" : "📝 Tạo phiếu khám mới"}</h2>
        <div className="form-grid">
          <InputLine
            field="HoTen"
            value={form.HoTen}
            placeholder="Họ tên bệnh nhân"
            required
            onChange={(e) => handleInputChange("HoTen", e.target.value)}
          />
          <InputLine
            field="NamSinh"
            value={form.NamSinh}
            placeholder="Năm sinh"
            required
            onChange={(e) => handleInputChange("NamSinh", e.target.value)}
          />
          <InputLine
            field="CanNang"
            value={form.CanNang}
            placeholder="Cân nặng (kg)"
            onChange={(e) => handleInputChange("CanNang", e.target.value)}
          />
          <InputLine
            field="Mach"
            value={form.Mach}
            placeholder="Mạch"
            onChange={(e) => handleInputChange("Mach", e.target.value)}
          />
          <InputLine
            field="NhietDo"
            value={form.NhietDo}
            placeholder="Nhiệt độ (°C)"
            onChange={(e) => handleInputChange("NhietDo", e.target.value)}
          />
          <InputLine
            field="HuyetAp"
            value={form.HuyetAp}
            placeholder="Huyết áp"
            onChange={(e) => handleInputChange("HuyetAp", e.target.value)}
          />
          <InputLine
            field="ChanDoan"
            value={form.ChanDoan}
            placeholder="Chẩn đoán"
            required
            onChange={(e) => handleInputChange("ChanDoan", e.target.value)}
          />
          <InputLine
            field="TaiKham"
            value={form.TaiKham}
            placeholder="Ngày tái khám"
            type="date"
            onChange={(e) => handleInputChange("TaiKham", e.target.value)}
          />
        </div>
        <div className="form-group form-full">
          <label>Ghi chú</label>
          <textarea
            name="GhiChu"
            value={form.GhiChu}
            onChange={(e) => handleInputChange("GhiChu", e.target.value)}
            placeholder="Ghi chú thêm..."
            rows={2}
          />
        </div>
        <div className="prescription-drugs-section">
          <h3 className="section-title">Đơn thuốc</h3>
          <div className="drugs-filter-bar">
            <select
              value={selectedGroup}
              onChange={(e) => setSelectedGroup(e.target.value)}
              className="drugs-group-select"
            >
              <option value="">-- Nhóm thuốc --</option>
              {groups.map((g) => (
                <option key={g.MaNhomThuoc} value={g.MaNhomThuoc}>
                  {g.TenNhom}
                </option>
              ))}
            </select>
            <input
              type="text"
              placeholder="Tìm tên thuốc..."
              className="drugs-search"
            />
          </div>
          <div className="drugs-list">
            {drugs
              .filter((d) => !selectedGroup || d.MaNhomThuoc === selectedGroup)
              .map((drug, idx) => (
                <div className="drug-item" key={drug.MaThuoc}>
                  <span className="drug-name">{drug.TenThuoc}</span>
                  <span className="drug-price">{drug.GiaBan?.toLocaleString()}đ</span>
                  <button
                    type="button"
                    className="drug-add-btn"
                    onClick={() => addDrug(drug)}
                    title="Thêm vào đơn"
                  >
                    <FaPlusCircle />
                  </button>
                </div>
              ))}
          </div>
          <div className="selected-drugs-table-wrapper">
            <table className="selected-drugs-table">
              <thead>
                <tr>
                  <th>Tên thuốc</th>
                  <th>Số lượng</th>
                  <th>Cách dùng</th>
                  <th>Giá bán</th>
                  <th>Thành tiền</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {selectedDrugs.length > 0 ? (
                  selectedDrugs.map((d, idx) => (
                    <tr key={d.MaThuoc}>
                      <td>{d.TenThuoc}</td>
                      <td>
                        <input
                          type="number"
                          min={1}
                          value={d.SoLuong}
                          onChange={(e) =>
                            updateDrugField(idx, "SoLuong", Number(e.target.value))
                          }
                          className="drug-input"
                        />
                      </td>
                      <td>
                        <input
                          value={d.CachDung}
                          onChange={(e) =>
                            updateDrugField(idx, "CachDung", e.target.value)
                          }
                          className="drug-input"
                          placeholder="Cách dùng"
                        />
                      </td>
                      <td>{d.GiaBan?.toLocaleString()}đ</td>
                      <td className="drug-cost">
                        {(d.SoLuong * d.GiaBan).toLocaleString()}đ
                      </td>
                      <td>
                        <button
                          type="button"
                          className="drug-remove-btn"
                          onClick={() => removeDrug(idx)}
                          title="Xóa"
                        >
                          <FaTrashAlt />
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={6} style={{ textAlign: "center", color: "#aaa" }}>
                      Chưa có thuốc trong đơn
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          <div className="total-cost-bar">
            <span>Tổng tiền thuốc:</span>
            <span className="total-cost">{totalCost.toLocaleString()}đ</span>
          </div>
        </div>

        <div className="modal-actions form-full">
          <button className="btn-cancel" type="button" onClick={() => navigate("/prescriptions")}>
            Hủy
          </button>
          <button className="btn-save" type="submit">
            Lưu phiếu khám
          </button>
        </div>
      </form>
    </div>
  );
}
