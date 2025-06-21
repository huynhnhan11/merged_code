export default function StockEntryRow({ 
  data, 
  isExpanded, 
  onClick,
  onEdit 
}) {
  return (
    <tr 
      onClick={onClick}
      className={`entry-row ${isExpanded ? "expanded" : ""}`}
    >
      <td className="entry-id">{data.id}</td>
      <td>{data.supplier}</td>
      <td>{data.createdBy}</td>
      <td>{data.createdAt.split(" ")[0]}</td>
      <td className="text-right">{data.total.toLocaleString()} ₫</td>
      <td className="entry-actions">
        <button 
          className="icon-btn edit" 
          onClick={(e) => {
            e.stopPropagation();
            onEdit(data);
          }}
          title="Sửa phiếu nhập"
        >
          ✏️
        </button>
      </td>
    </tr>
  );
}
