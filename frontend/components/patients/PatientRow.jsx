import { useNavigate } from "react-router-dom";
import { FaStethoscope, FaRegEye } from "react-icons/fa";

export default function PatientRow({ data, isSelected, onClickDetail }) {
  const navigate = useNavigate();

  const handleExamine = () => {
    navigate(`/prescriptions/create/${data.MaBenhNhan}`);
  };

  return (
    <tr className={`patient-row${isSelected ? " selected" : ""}`}>
      <td>{data.MaBenhNhan}</td>
      <td className="patient-name">{data.HoTen}</td>
      <td>{data.GioiTinh}</td>
      <td>{data.NamSinh}</td>
      <td>{data.SoDienThoai || "-"}</td>
      <td>{data.DiaChi?.substring(0, 20) + (data.DiaChi?.length > 20 ? "..." : "") || "-"}</td>
      <td>{new Date(data.NgayTao).toLocaleDateString()}</td>
      <td>
        <button className="action-btn icon-btn" onClick={handleExamine} title="Khám bệnh">
          <FaStethoscope />
        </button>
        <button className="action-btn icon-btn details" onClick={onClickDetail} title="Xem chi tiết">
          <FaRegEye />
        </button>
      </td>
    </tr>
  );
}
