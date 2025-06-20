import { useState, useEffect, Fragment } from "react";
import { fetchPatients } from "../../src/api"; // Đảm bảo đúng đường dẫn API
import PatientRow from "./PatientRow";
import PatientTabs from "../tabDetail/PatientTabs";
import "./list.css";

export default function PatientList({ filters }) {
  const [expandedId, setExpandedId] = useState(null);
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPatients() // Lấy danh sách bệnh nhân từ API
      .then((data) => {
        setPatients(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Lỗi khi tải dữ liệu bệnh nhân:", err);
        setLoading(false);
      });
  }, []);

  const toggleExpand = (id) => {
    setExpandedId((prev) => (prev === id ? null : id));
  };

  const { keyword = "", fromDate = null, toDate = null } = filters || {};

  // Lọc danh sách bệnh nhân
  const filtered = patients.filter((p) => {
    const kw = keyword.toLowerCase();
    const matchKeyword =
      p.HoTen?.toLowerCase().includes(kw) ||
      p.SoDienThoai?.toLowerCase().includes(kw) ||
      p.DiaChi?.toLowerCase().includes(kw);
    
    const createdAtDate = new Date(p.NgayTao);
    const matchFrom = !fromDate || createdAtDate >= new Date(fromDate);
    const matchTo = !toDate || createdAtDate <= new Date(toDate);

    return matchKeyword && matchFrom && matchTo;
  });

  if (loading) return <div className="patients-loading">Đang tải dữ liệu...</div>;

  return (
    <div className="patients-table-container">
      <table className="patients-table">
        <thead>
          <tr>
            <th>MÃ</th>
            <th>TÊN</th>
            <th>GIỚI TÍNH</th>
            <th>NĂM SINH</th>
            <th>ĐIỆN THOẠI</th>
            <th>ĐỊA CHỈ</th>
            <th>NGÀY LẬP</th>
            <th>CHỨC NĂNG</th>
          </tr>
        </thead>
        <tbody>
          {filtered.map((patient) => (
            <Fragment key={patient.MaBenhNhan}>
              <PatientRow
                data={patient}
                isSelected={expandedId === patient.MaBenhNhan}
                onClickDetail={() => toggleExpand(patient.MaBenhNhan)}
              />
              {expandedId === patient.MaBenhNhan && (
                <tr>
                  <td colSpan={8} style={{ background: "#f8fafd", padding: 0 }}>
                    <div className="patient-tabs-wrapper">
                      <PatientTabs patient={patient} />
                    </div>
                  </td>
                </tr>
              )}
            </Fragment>
          ))}
        </tbody>
      </table>
    </div>
  );
}
