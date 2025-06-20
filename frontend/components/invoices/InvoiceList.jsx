import { useState, Fragment, useMemo } from "react";
import InvoiceRow from "./InvoiceRow";
import InvoiceDetail from "../details/InvoiceDetail";
import "./list.css";

const mockInvoices = [
  {
    id: "HD00000001",
    patientName: "Nguyễn Văn A",
    age: "35",
    createdBy: "Dr. Thanh Phát",
    createdAt: "2025-06-20",
    total: 244000,
    items: [
      { name: "Paracetamol 500mg", unit: "Hộp", quantity: 2, price: 50000, total: 100000 },
      { name: "Vitamin C", unit: "Lọ", quantity: 1, price: 84000, total: 84000 },
      { name: "Khám bệnh", unit: "Lần", quantity: 1, price: 60000, total: 60000 }
    ]
  },
  {
    id: "HD00000002",
    patientName: "Trần Thị B",
    age: "28",
    createdBy: "Dr. Minh Anh",
    createdAt: "2025-06-19",
    total: 325000,
    items: [
      { name: "Amoxicillin 500mg", unit: "Hộp", quantity: 3, price: 75000, total: 225000 },
      { name: "Khám bệnh", unit: "Lần", quantity: 1, price: 100000, total: 100000 }
    ]
  }
];

export default function InvoiceList({ filters }) {
  const [expandedId, setExpandedId] = useState(null);
  
  // Lọc dữ liệu theo filters
  const filteredInvoices = useMemo(() => {
    const { keyword = "", fromDate = null, toDate = null } = filters || {};
    const kw = keyword.trim().toLowerCase();
    
    return mockInvoices.filter(inv => {
      // Lọc theo keyword
      const matchKeyword = 
        !kw ||
        inv.id.toLowerCase().includes(kw) ||
        inv.patientName.toLowerCase().includes(kw) ||
        inv.createdBy.toLowerCase().includes(kw);
      
      // Lọc theo ngày
      const invoiceDate = new Date(inv.createdAt);
      const matchFrom = !fromDate || invoiceDate >= new Date(fromDate);
      const matchTo = !toDate || invoiceDate <= new Date(toDate);
      
      return matchKeyword && matchFrom && matchTo;
    });
  }, [filters]);

  const toggleExpand = (id) => {
    setExpandedId(prev => (prev === id ? null : id));
  };

  if (filteredInvoices.length === 0) {
    return (
      <div className="invoices-empty">
        <p>Không tìm thấy hóa đơn nào phù hợp</p>
        <small>Thử thay đổi tiêu chí tìm kiếm</small>
      </div>
    );
  }

  return (
    <div className="invoices-table-container">
      <table className="invoices-table">
        <thead>
          <tr>
            <th>MÃ SỐ</th>
            <th>BỆNH NHÂN</th>
            <th>TUỔI</th>
            <th>NGƯỜI LẬP</th>
            <th>NGÀY LẬP</th>
            <th className="text-right">TỔNG HÓA ĐƠN</th>
            <th>CHỨC NĂNG</th>
          </tr>
        </thead>
        <tbody>
          {filteredInvoices.map((invoice) => (
            <Fragment key={invoice.id}>
              <InvoiceRow
                data={invoice}
                isSelected={expandedId === invoice.id}
                onClick={() => toggleExpand(invoice.id)}
              />
              {expandedId === invoice.id && (
                <tr className="invoice-detail-row">
                  <td colSpan={7}>
                    <InvoiceDetail data={invoice} />
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
