export default function DrugRow({ data, onEdit, onDelete }) {
  return (
    <tr>
      <td className="drug-id">{data.MaThuoc}</td>
      <td>{data.SoDangKy || "-"}</td>
      <td className="drug-name">{data.TenThuoc}</td>
      <td>{data.DonViTinh}</td>
      <td className="text-right">{data.GiaBan?.toLocaleString()} ₫</td>
      <td className="text-center">{data.TonKho}</td>
      <td className="drug-usage">{data.CachDung || "-"}</td>
      <td className="drug-actions">
        <button 
          className="icon-btn edit" 
          onClick={onEdit}
          title="Sửa thông tin"
        >
          ✏️
        </button>
        <button 
          className="icon-btn delete" 
          onClick={onDelete}
          title="Xóa thuốc"
        >
          🗑️
        </button>
      </td>
    </tr>
  );
}
