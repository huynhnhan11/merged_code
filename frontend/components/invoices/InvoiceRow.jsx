export default function InvoiceRow({ data, isSelected, onClick }) {
  return (
    <tr
      onClick={onClick}
      className={`invoice-row ${isSelected ? "selected" : ""}`}
    >
      
      <td className="invoice-id">{data.id}</td>
      <td>{data.patientName}</td>
      <td>{data.age}</td>
      <td>{data.createdBy}</td>
      <td>{data.createdAt}</td>
      <td className="text-right">{data.total.toLocaleString()} ₫</td>
      <td className="invoice-actions">
        <button className="icon-btn" title="Khám bệnh">🧑‍⚕️</button>
        <button className="icon-btn" title="Sửa">✏️</button>
        <button className="icon-btn delete" title="Xóa">🗑️</button>
      </td>
    </tr>
  );
}
