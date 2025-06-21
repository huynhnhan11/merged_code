import "./StockEntryDetail.css";

export default function StockEntryDetail({ data }) {
  if (!data || !data.items) return null;
  
  return (
    <div className="stock-entry-detail">
      <div className="detail-header">
        <h3>Chi tiết phiếu nhập: {data.id}</h3>
        <div className="detail-meta">
          <div>
            <strong>Nhà cung cấp:</strong> {data.supplier}
          </div>
          <div>
            <strong>Người lập:</strong> {data.createdBy}
          </div>
          <div>
            <strong>Ngày lập:</strong> {data.createdAt}
          </div>
        </div>
      </div>
      
      <table className="items-table">
        <thead>
          <tr>
            <th>#</th>
            <th>TÊN THUỐC/VẬT TƯ</th>
            <th>ĐVT</th>
            <th>SỐ LƯỢNG</th>
            <th>ĐƠN GIÁ</th>
            <th>THÀNH TIỀN</th>
          </tr>
        </thead>
        <tbody>
          {data.items.map((item, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{item.name}</td>
              <td>{item.unit}</td>
              <td>{item.quantity}</td>
              <td className="text-right">{item.price.toLocaleString()} ₫</td>
              <td className="text-right">{item.total.toLocaleString()} ₫</td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr>
            <td colSpan={5} className="text-right"><strong>Tổng cộng:</strong></td>
            <td className="text-right total-amount">{data.total.toLocaleString()} ₫</td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
}
