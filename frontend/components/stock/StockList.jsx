import { useState, Fragment, useMemo } from 'react';
import StockEntryRow from "./StockRow";
import StockEntryDetail from "../details/StockEntryDetail";
import "./list.css";

const parseDate = (str) => {
  const [day, month, year] = str.split("-").map(Number);
  return new Date(year, month - 1, day);
};

const mockEntries = [
  {
    id: "NK00000001",
    supplier: "Công ty Dược phẩm A",
    createdBy: "ThanhPhat",
    createdAt: "18-04-2025 15:15",
    total: 6300000,
    items: [
      { name: "Paracetamol 500mg", unit: "Hộp", quantity: 100, price: 50000, total: 5000000 },
      { name: "Vitamin C", unit: "Lọ", quantity: 50, price: 80000, total: 4000000 },
    ]
  },
  {
    id: "NK00000002",
    supplier: "Công ty Dược phẩm B",
    createdBy: "MinhAnh",
    createdAt: "20-04-2025 09:30",
    total: 4200000,
    items: [
      { name: "Amoxicillin 500mg", unit: "Hộp", quantity: 60, price: 70000, total: 4200000 },
    ]
  },
];

export default function StockEntryList({ filters, onEdit }) {
  const [expandedId, setExpandedId] = useState(null);

  const toggleExpand = (id) => {
    setExpandedId((prev) => (prev === id ? null : id));
  };

  const filtered = useMemo(() => {
    const { keyword = "", fromDate = null, toDate = null } = filters || {};
    const kw = keyword.toLowerCase();
    
    return mockEntries.filter((entry) => {
      const matchKeyword = 
        entry.id.toLowerCase().includes(kw) ||
        entry.supplier.toLowerCase().includes(kw) ||
        entry.createdBy.toLowerCase().includes(kw);
      
      const [dateStr] = entry.createdAt.split(" ");
      const createdAtDate = parseDate(dateStr);
      const matchFrom = !fromDate || createdAtDate >= new Date(fromDate);
      const matchTo = !toDate || createdAtDate <= new Date(toDate);
      
      return matchKeyword && matchFrom && matchTo;
    });
  }, [filters]);

  if (filtered.length === 0) {
    return (
      <div className="no-entries">
        <p>Không tìm thấy phiếu nhập kho nào</p>
        <small>Thử thay đổi tiêu chí tìm kiếm hoặc tạo phiếu mới</small>
      </div>
    );
  }

  return (
    <div className="stock-entries-container">
      <table className="stock-entries-table">
        <thead>
          <tr>
            <th>MÃ SỐ</th>
            <th>NHÀ CUNG CẤP</th>
            <th>NGƯỜI LẬP</th>
            <th>NGÀY LẬP</th>
            <th className="text-right">TỔNG TIỀN</th>
            <th>CHỨC NĂNG</th>
          </tr>
        </thead>
        <tbody>
          {filtered.map((entry) => (
            <Fragment key={entry.id}>
              <StockEntryRow
                data={entry}
                isExpanded={expandedId === entry.id}
                onClick={() => toggleExpand(entry.id)}
                onEdit={() => onEdit(entry)}
              />
              {expandedId === entry.id && (
                <tr className="entry-detail-row">
                  <td colSpan={6}>
                    <StockEntryDetail data={entry} />
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
