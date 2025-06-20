import { useState } from "react";
import PatientDetail from "../details/PatientDetail";
import PrescriptionDetail from "../details/PrescriptionDetail";
import InvoiceDetail from "../details/InvoiceDetail";
import "./PatientTabs.css";

export default function PatientTabs({ patient }) {
  const [tab, setTab] = useState("info");

  return (
    <div className="tabs-container">
      <div className="tabs-header">
        <button className={tab === "info" ? "tab-btn active" : "tab-btn"} onClick={() => setTab("info")}>
          Thông tin
        </button>
        <button className={tab === "prescription" ? "tab-btn active" : "tab-btn"} onClick={() => setTab("prescription")}>
          Đơn thuốc
        </button>
        <button className={tab === "invoice" ? "tab-btn active" : "tab-btn"} onClick={() => setTab("invoice")}>
          Hóa đơn
        </button>
      </div>
      <div className="tabs-content">
        {tab === "info" && <PatientDetail patient={patient} />}
        {tab === "prescription" && <PrescriptionDetail patientId={patient.MaBenhNhan} />}
        {tab === "invoice" && <InvoiceDetail patientId={patient.MaBenhNhan} />}
      </div>
    </div>
  );
}
