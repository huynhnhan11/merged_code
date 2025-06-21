import { useState } from "react";
import "./form.css";

export default function StockEntryForm({ 
  initialData, 
  onSave, 
  onClose 
}) {
  const [formData, setFormData] = useState(
    initialData || { 
      supplier: "", 
      date: new Date().toISOString().slice(0, 10),
      note: "",
      items: [
        { name: "", unit: "", quantity: 1, price: 0, total: 0 }
      ] 
    }
  );

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const updateItem = (index, field, value) => {
    const updatedItems = [...formData.items];
    updatedItems[index] = { ...updatedItems[index], [field]: value };
    
    if (field === 'quantity' || field === 'price') {
      updatedItems[index].total = updatedItems[index].quantity * updatedItems[index].price;
    }
    
    setFormData(prev => ({ ...prev, items: updatedItems }));
  };

  const addItem = () => {
    setFormData(prev => ({
      ...prev,
      items: [...prev.items, { 
        name: "", 
        unit: "", 
        quantity: 1, 
        price: 0, 
        total: 0 
      }]
    }));
  };

  const removeItem = (index) => {
    if (formData.items.length <= 1) return;
    const updatedItems = formData.items.filter((_, i) => i !== index);
    setFormData(prev => ({ ...prev, items: updatedItems }));
  };

  const total = formData.items.reduce(
    (sum, item) => sum + (item.total || 0), 0
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({ ...formData, total });
  };

  return (
    <div className="modal-overlay">
      <div className="stock-form-modal">
        <button className="modal-close" onClick={onClose}>&times;</button>
        <h3 className="modal-title">
          {initialData ? "Cập nhật phiếu nhập" : "Tạo phiếu nhập mới"}
        </h3>
        
        <form onSubmit={handleSubmit} className="stock-form">
          <div className="form-grid">
            <div className="form-group">
              <label>Nhà cung cấp *</label>
              <input
                type="text"
                name="supplier"
                value={formData.supplier}
                onChange={handleChange}
                required
                placeholder="Tên nhà cung cấp"
              />
            </div>
            
            <div className="form-group">
              <label>Ngày nhập *</label>
              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                required
              />
            </div>
            
            <div className="form-group form-full">
              <label>Ghi chú</label>
              <textarea
                name="note"
                value={formData.note}
                onChange={handleChange}
                placeholder="Ghi chú thêm..."
                rows={2}
              />
            </div>
          </div>
          
          <div className="items-section">
            <h4>Danh sách thuốc/vật tư nhập kho</h4>
            <div className="items-table-container">
              <table className="items-table">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Tên thuốc/vật tư *</th>
                    <th>Đơn vị tính *</th>
                    <th>Số lượng *</th>
                    <th>Đơn giá (₫) *</th>
                    <th>Thành tiền (₫)</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {formData.items.map((item, index) => (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>
                        <input
                          type="text"
                          value={item.name}
                          onChange={e => updateItem(index, "name", e.target.value)}
                          required
                        />
                      </td>
                      <td>
                        <input
                          type="text"
                          value={item.unit}
                          onChange={e => updateItem(index, "unit", e.target.value)}
                          required
                        />
                      </td>
                      <td>
                        <input
                          type="number"
                          min="1"
                          value={item.quantity}
                          onChange={e => updateItem(index, "quantity", Number(e.target.value))}
                          required
                        />
                      </td>
                      <td>
                        <input
                          type="number"
                          min="0"
                          value={item.price}
                          onChange={e => updateItem(index, "price", Number(e.target.value))}
                          required
                        />
                      </td>
                      <td className="text-right">
                        {item.total.toLocaleString()} ₫
                      </td>
                      <td>
                        <button
                          type="button"
                          className="remove-btn"
                          onClick={() => removeItem(index)}
                          disabled={formData.items.length <= 1}
                          title="Xóa dòng"
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
              + Thêm dòng
            </button>
          </div>
          
          <div className="total-section">
            <div className="total-label">Tổng cộng:</div>
            <div className="total-amount">{total.toLocaleString()} ₫</div>
          </div>
          
          <div className="form-actions">
            <button type="button" className="btn-cancel" onClick={onClose}>
              Hủy
            </button>
            <button type="submit" className="btn-save">
              {initialData ? "Cập nhật" : "Lưu phiếu"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
