import "./InvoiceDetail.css";

export default function InvoiceDetail({ data }) {
  if (!data) return <div className="invoice-detail-empty">Không có dữ liệu hóa đơn.</div>;
  
  return (
    <div className="invoice-detail">
      <div className="invoice-header">
        <h3 className="invoice-title">Hóa đơn: <span className="invoice-id">{data.id}</span></h3>
        <div className="invoice-meta">
          <div className="meta-item">
            <span className="meta-label">Bệnh nhân:</span>
            <span className="meta-value">{data.patientName}</span>
          </div>
          <div className="meta-item">
            <span className="meta-label">Ngày lập:</span>
            <span className="meta-value">{data.createdAt}</span>
          </div>
          <div className="meta-item">
            <span className="meta-label">Người lập:</span>
            <span className="meta-value">{data.createdBy}</span>
          </div>
        </div>
      </div>
      
      <div className="invoice-items-section">
        <h4 className="section-title">Chi tiết hóa đơn</h4>
        <table className="invoice-items">
          <thead>
            <tr>
              <th>#</th>
              <th>Tên dịch vụ/Thuốc</th>
              <th>Đơn vị</th>
              <th>Số lượng</th>
              <th>Đơn giá (₫)</th>
              <th>Thành tiền (₫)</th>
            </tr>
          </thead>
          <tbody>
            {data.items.map((item, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{item.name}</td>
                <td>{item.unit}</td>
                <td>{item.quantity}</td>
                <td className="text-right">{item.price.toLocaleString()}</td>
                <td className="text-right">{item.total.toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      <div className="invoice-total">
        <span className="total-label">Tổng cộng:</span>
        <span className="total-amount">{data.total.toLocaleString()} ₫</span>
      </div>
    </div>
  );
}
