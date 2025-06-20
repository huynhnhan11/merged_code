import React from "react";
import { useNavigate } from "react-router-dom";
import '../style/landing.css';

export default function LandingPage() {
  const navigate = useNavigate();

  const handleLoginClick = () => {
    navigate('/login');
  };

  return (
    <div className="landing-container">
      <div className="cover">
        <div className="text">
          <img src="./src/assets/logo-txt.png" alt="logo" className="logo" />
          <p>
            Chào mừng bạn đến với <b>DeBruyne</b>, nền tảng giúp tối ưu hóa và nâng cao hiệu quả quản lý phòng mạch của bạn. Với những công nghệ tiên tiến và giao diện dễ sử dụng, chúng tôi mang đến giải pháp toàn diện để giúp bạn quản lý lịch hẹn, hồ sơ bệnh nhân, và các công việc hàng ngày một cách đơn giản và hiệu quả. Hãy để chúng tôi đồng hành cùng bạn, nâng cao chất lượng dịch vụ y tế và chăm sóc sức khỏe cho cộng đồng.
          </p>
          <button className="btn-login" onClick={handleLoginClick}>Đăng nhập</button>
        </div>
        <div className="img-medicine">
          <img src="./src/assets/bg1.png" alt="Image" />
        </div>
      </div>
    </div>
  );
}
