import { useState } from "react";
import InvoiceDetail from "../details/InvoiceDetail";
import PatientDetail from "../details/PatientDetail";
import "./InvoiceTabs.css";

const mockInvoice = {
  id: "HD00000001",
  patientName: "Killed Silve",
  age: "2003211",
  createdBy: "ThanhPhat",
  createdAt: "18-04-2025",
  total: 24400,
  items: [
    { name: "Mobic 7.5mg", unit: "viên", quantity: 2, price: 11000, total: 22000 },
    { name: "Panagal Plus", unit: "viên", quantity: 1, price: 0, total: 0 },
    { name: "Tylenol", unit: "viên", quantity: 2, price: 1200, total: 2400 },
  ],
};

export default function InvoiceTabs({ invoice = mockInvoice, patient = mockPatient }) {
  const [tab, setTab] = useState("invoice");

  return (
    <div className="invoice-tabs-container">
      <div className="tabs-header">
        <button
          className={`tab-btn ${tab === "invoice" ? "active" : ""}`}
          onClick={() => setTab("invoice")}
        >
          <span className="tab-icon">🧾</span>
          <span className="tab-label">Hóa đơn</span>
        </button>
        <button
          className={`tab-btn ${tab === "patient" ? "active" : ""}`}
          onClick={() => setTab("patient")}
        >
          <span className="tab-icon">👤</span>
          <span className="tab-label">Bệnh nhân</span>
        </button>
      </div>
      
      <div className="tabs-content">
        <div className={`tab-pane ${tab === "invoice" ? "active" : ""}`}>
          <InvoiceDetail data={invoice} />
        </div>
        <div className={`tab-pane ${tab === "patient" ? "active" : ""}`}>
          <PatientDetail data={patient} />
        </div>
      </div>
    </div>
  );
}
