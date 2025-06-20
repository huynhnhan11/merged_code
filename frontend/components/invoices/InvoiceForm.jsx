import { useState } from "react";
import "./form.css";

export default function InvoiceForm({ onClose, onSubmit }) {
  const [formData, setFormData] = useState({
    patientName: "",
    patientAge: "",
    date: new Date().toISOString().slice(0, 10),
    items: [
      { name: "", unit: "", quantity: 1, price: 0 }
    ]
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleItemChange = (index, field, value) => {
    const updatedItems = [...formData.items];
    updatedItems[index][field] = value;
    // Tính toán lại thành tiền nếu cần
    if (field === 'quantity' || field === 'price') {
      updatedItems[index].total = updatedItems[index].quantity * updatedItems[index].price;
    }
    setFormData(prev => ({ ...prev, items: updatedItems }));
  };

  const addItem = () => {
    setFormData(prev => ({
      ...prev,
      items: [...prev.items, { name: "", unit: "", quantity: 1, price: 0 }]
    }));
  };

  const removeItem = (index) => {
    if (formData.items.length <= 1) return;
    const updatedItems = formData.items.filter((_, i) => i !== index);
    setFormData(prev => ({ ...prev, items: updatedItems }));
  };

  const calculateTotal = () => {
    return formData.items.reduce((sum, item) => sum + (item.quantity * item.price), 0);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const total = calculateTotal();
    onSubmit({ ...formData, total });
  };

  return (
    <div className="invoice-form-modal-bg">
      <div className="invoice-form-modal">
        <button className="modal-close" onClick={onClose}>&times;</button>
        <h3 className="modal-title">Tạo Hóa đơn mới</h3>
        <form onSubmit={handleSubmit} className="invoice-form-main">
          <div className="form-grid">
            <div className="form-group">
              <label>Họ tên bệnh nhân</label>
              <input
                type="text"
                name="patientName"
                value={formData.patientName}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label>Tuổi</label>
              <input
                type="number"
                name="patientAge"
                value={formData.patientAge}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label>Ngày lập</label>
              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="invoice-items-section">
            <h4 className="section-title">Chi tiết hóa đơn</h4>
            <div className="invoice-items-wrapper">
              <table className="invoice-items-table">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Tên dịch vụ/Thuốc</th>
                    <th>Đơn vị</th>
                    <th>Số lượng</th>
                    <th>Đơn giá (₫)</th>
                    <th>Thành tiền (₫)</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {formData.items.map((item, idx) => (
                    <tr key={idx}>
                      <td>{idx + 1}</td>
                      <td>
                        <input
                          type="text"
                          value={item.name}
                          onChange={(e) => handleItemChange(idx, 'name', e.target.value)}
                          required
                        />
                      </td>
                      <td>
                        <input
                          type="text"
                          value={item.unit}
                          onChange={(e) => handleItemChange(idx, 'unit', e.target.value)}
                          required
                        />
                      </td>
                      <td>
                        <input
                          type="number"
                          min="1"
                          value={item.quantity}
                          onChange={(e) => handleItemChange(idx, 'quantity', parseInt(e.target.value) || 1)}
                          required
                        />
                      </td>
                      <td>
                        <input
                          type="number"
                          min="0"
                          value={item.price}
                          onChange={(e) => handleItemChange(idx, 'price', parseInt(e.target.value) || 0)}
                          required
                        />
                      </td>
                      <td className="text-right">
                        {(item.quantity * item.price).toLocaleString()} 
                      </td>
                      <td>
                        <button
                          type="button"
                          className="remove-item-btn"
                          onClick={() => removeItem(idx)}
                          disabled={formData.items.length <= 1}
                          title="Xóa mục này"
                        >
                          🗑️
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <button
              type="button"
              className="add-item-btn"
              onClick={addItem}
            >
              + Thêm mục
            </button>
          </div>

          <div className="invoice-total">
            <span>Tổng cộng:</span>
            <span className="total-amount">{calculateTotal().toLocaleString()} ₫</span>
          </div>

          <div className="form-actions">
            <button type="button" className="btn-cancel" onClick={onClose}>
              Hủy
            </button>
            <button type="submit" className="btn-save">
              Lưu hóa đơn
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
