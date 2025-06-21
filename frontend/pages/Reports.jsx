import { useState, useEffect } from "react";
import { FaHome, FaPills, FaChartLine, FaFileInvoice, FaUserAlt, FaShoppingCart } from "react-icons/fa";
import { FiMenu, FiSettings } from "react-icons/fi";
import "../style/Report.css";

export default function Reports() {
  // State cho dữ liệu dashboard - sẽ được map từ API
  const [dashboardData, setDashboardData] = useState({
    revenue: 0,
    drugsSold: 0,
    topSellingDrug: { name: "", quantity: 0 },
    monthlyRevenue: [],
    drugCategories: [],
    recentTransactions: []
  });

  // Mock data - sẽ được thay thế bằng API call thực tế
  useEffect(() => {
    // fetch("/api/dashboard").then(res => res.json()).then(setDashboardData);
    
    // Dữ liệu mẫu để demo
    setDashboardData({
      revenue: 62800000,
      drugsSold: 1259,
      topSellingDrug: { name: "Paracetamol 500mg", quantity: 342 },
      monthlyRevenue: [
        { month: "Tháng 1", revenue: 42000000 },
        { month: "Tháng 2", revenue: 38000000 },
        { month: "Tháng 3", revenue: 56000000 },
        { month: "Tháng 4", revenue: 48000000 },
        { month: "Tháng 5", revenue: 62000000 },
        { month: "Tháng 6", revenue: 75000000 },
      ],
      drugCategories: [
        { name: "Kháng sinh", value: 35 },
        { name: "Giảm đau", value: 25 },
        { name: "Vitamin", value: 20 },
        { name: "Tim mạch", value: 15 },
        { name: "Khác", value: 5 },
      ],
      recentTransactions: [
        { id: "HD0001", drug: "Paracetamol 500mg", quantity: 2, amount: 100000 },
        { id: "HD0002", drug: "Amoxicillin 500mg", quantity: 1, amount: 75000 },
        { id: "HD0003", drug: "Vitamin C", quantity: 3, amount: 252000 },
        { id: "HD0004", drug: "Panadol Extra", quantity: 1, amount: 55000 },
      ]
    });
  }, []);

  return (
    <div className="dashboard-root">
      
      {/* Main Content - Báo cáo chính */}
      <main className="dashboard-main">
        <div className="dashboard-header">
          <h2>Báo cáo kinh doanh</h2>
          <div className="header-actions">
            <button className="date-filter">Tháng 6, 2025</button>
            <button className="menu-btn"><FiMenu /></button>
          </div>
        </div>

        {/* Cards - Chỉ số quan trọng */}
        <div className="dashboard-cards-row">
          <div className="dashboard-card">
            <div className="card-title">Tổng doanh thu</div>
            <div className="card-value big">{dashboardData.revenue.toLocaleString()} ₫</div>
            <div className="card-trend positive">+12.5%</div>
          </div>
          
          <div className="dashboard-card">
            <div className="card-title">Số lượng thuốc đã bán</div>
            <div className="card-value">{dashboardData.drugsSold}</div>
            <div className="card-trend positive">+8.2%</div>
          </div>
          
          <div className="dashboard-card">
            <div className="card-title">Thuốc bán chạy nhất</div>
            <div className="card-value">{dashboardData.topSellingDrug.name}</div>
            <div className="card-subvalue">{dashboardData.topSellingDrug.quantity} hộp</div>
          </div>
        </div>

        {/* Biểu đồ và báo cáo chi tiết */}
        <div className="dashboard-main-row">
          <div className="dashboard-charts-col">
            {/* Biểu đồ doanh thu theo tháng */}
            <div className="dashboard-panel">
              <div className="panel-header">
                <span>Doanh thu theo tháng</span>
                <button className="panel-btn">Xem chi tiết</button>
              </div>
              <div className="panel-chart">
                {/* API sẽ trả về dữ liệu cho biểu đồ này */}
                <div className="chart-placeholder">
                  <div className="chart-bars">
                    {dashboardData.monthlyRevenue.map((item, index) => (
                      <div key={index} className="chart-bar">
                        <div className="bar-label">{item.month}</div>
                        <div className="bar-container">
                          <div 
                            className="bar-fill" 
                            style={{ height: `${(item.revenue / 10000000)}%` }}
                          ></div>
                        </div>
                        <div className="bar-value">{Math.round(item.revenue / 1000000)}tr</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            
            {/* Danh sách giao dịch gần đây */}
            <div className="dashboard-panel">
              <div className="panel-header">
                <span>Giao dịch gần đây</span>
              </div>
              <div className="transactions-table">
                <table>
                  <thead>
                    <tr>
                      <th>Mã HD</th>
                      <th>Tên thuốc</th>
                      <th>Số lượng</th>
                      <th>Thành tiền</th>
                    </tr>
                  </thead>
                  <tbody>
                    {dashboardData.recentTransactions.map((transaction, index) => (
                      <tr key={index}>
                        <td>{transaction.id}</td>
                        <td>{transaction.drug}</td>
                        <td>{transaction.quantity}</td>
                        <td>{transaction.amount.toLocaleString()} ₫</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          
          <div className="dashboard-side-col">
            {/* Phân loại thuốc đã bán */}
            <div className="dashboard-panel">
              <div className="panel-header">
                <span>Phân loại thuốc đã bán</span>
              </div>
              <div className="drug-categories">
                {dashboardData.drugCategories.map((category, index) => (
                  <div key={index} className="category-item">
                    <div className="category-name">{category.name}</div>
                    <div className="category-bar">
                      <div 
                        className="category-fill" 
                        style={{ width: `${category.value}%` }}
                      ></div>
                    </div>
                    <div className="category-value">{category.value}%</div>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Thuốc sắp hết hạn (placeholder) */}
            <div className="dashboard-panel">
              <div className="panel-header">
                <span>Thuốc sắp hết hạn</span>
              </div>
              <div className="expiring-drugs">
                <div className="expiring-item">
                  <div>Amoxicillin 500mg</div>
                  <div className="expiring-date">15/07/2025</div>
                </div>
                <div className="expiring-item">
                  <div>Vitamin C 1000mg</div>
                  <div className="expiring-date">22/07/2025</div>
                </div>
                <div className="expiring-item">
                  <div>Paracetamol 500mg</div>
                  <div className="expiring-date">30/07/2025</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
