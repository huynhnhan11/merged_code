import { Fragment, useState, useEffect, useMemo } from "react";
import PrescriptionRow from "./PrescriptionRow";
import PrescriptionDetail from "../details/PrescriptionDetail";
import { fetchPrescriptions, getPatientByMaBenhNhan } from "../../src/api"; // Đảm bảo đúng đường dẫn
import "./list.css";

export default function PrescriptionList({ filters }) {
  const [phieuKhams, setPhieuKhams] = useState([]);
  const [expandedPrescription, setExpandedPrescription] = useState(null);
  const { keyword = "", fromDate = null, toDate = null } = filters || {};
  const [selectedPatient, setSelectedPatient] = useState(null);

  useEffect(() => {
    fetchPrescriptions() // Lấy dữ liệu phiếu khám từ API
      .then((data) => {
        console.log("✅ Dữ liệu phiếu khám:", data);
        setPhieuKhams(data);
      })
      .catch((err) => {
        console.error("Lỗi khi tải dữ liệu phiếu khám:", err);
      });
  }, []);

  // Lọc phiếu khám theo từ khóa và ngày
  const filteredPrescriptions = useMemo(() => {
    const kw = keyword.toLowerCase();
    return phieuKhams.filter((p) => {
      const matchKeyword =
        p.HoTen?.toLowerCase().includes(kw) ||
        p.BacSi?.toLowerCase().includes(kw) ||
        p.ChanDoan?.toLowerCase().includes(kw);

      const createdAtDate = new Date(p.NgayKham);
      const matchFrom = !fromDate || createdAtDate >= new Date(fromDate);
      const matchTo = !toDate || createdAtDate <= new Date(toDate);

      return matchKeyword && matchFrom && matchTo;
    });
  }, [phieuKhams, keyword, fromDate, toDate]);

  const handleShowDetail = (prescription) => {
    setExpandedPrescription(
      expandedPrescription?.MaPhieu === prescription.MaPhieu
        ? null
        : prescription
    );
  };

  // Nếu không có phiếu khám nào
  if (filteredPrescriptions.length === 0) {
    return <div className="prescriptions-empty">Không có phiếu khám nào phù hợp.</div>;
  }

  return (
    <div className="prescriptions-table-wrapper">
      <table className="prescriptions-table">
        <thead>
          <tr>
            <th>MÃ PHIẾU</th>
            <th>TÊN BỆNH NHÂN</th>
            <th>NGÀY KHÁM</th>
            <th>BÁC SĨ</th>
            <th>CHẨN ĐOÁN</th>
            <th>TRẠNG THÁI</th>
            <th>CHỨC NĂNG</th>
          </tr>
        </thead>
        <tbody>
          {filteredPrescriptions.map((prescription) => (
            <Fragment key={prescription.MaPhieu}>
              <PrescriptionRow
                data={prescription}
                onShowDetail={() => handleShowDetail(prescription)}
                isExpanded={expandedPrescription?.MaPhieu === prescription.MaPhieu}
              />

              {expandedPrescription?.MaPhieu === prescription.MaPhieu && (
                <tr className="prescription-detail-row">
                  <td colSpan={7}>
                    <PrescriptionDetail data={expandedPrescription} />
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
