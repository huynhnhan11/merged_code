import "./PatientDetail.css";

export default function PatientDetail({ data }) {
  if (!data) return <div className="patient-detail-empty">Không có dữ liệu bệnh nhân.</div>;
  
  return (
    <div className="patient-detail">
      <div className="patient-header">
        <h3 className="patient-title">Thông tin bệnh nhân</h3>
        <div className="patient-id">Mã: {data.id}</div>
      </div>
      
      <div className="patient-info-grid">
        <div className="info-item">
          <span className="info-label">Họ tên:</span>
          <span className="info-value">{data.name}</span>
        </div>
        <div className="info-item">
          <span className="info-label">Giới tính:</span>
          <span className="info-value">{data.gender}</span>
        </div>
        <div className="info-item">
          <span className="info-label">Tuổi:</span>
          <span className="info-value">{data.age}</span>
        </div>
        <div className="info-item">
          <span className="info-label">Điện thoại:</span>
          <span className="info-value">{data.phone}</span>
        </div>
        <div className="info-item">
          <span className="info-label">Địa chỉ:</span>
          <span className="info-value">{data.address}</span>
        </div>
        <div className="info-item">
          <span className="info-label">Ngày tạo:</span>
          <span className="info-value">{data.created_at}</span>
        </div>
      </div>
    </div>
  );
}
