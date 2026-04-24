import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { homeStyles as styles } from '../styles/homeStyles';

const FEATURES = [
  { icon: '📦', name: 'Đơn hàng dễ dàng',    desc: 'Đặt hàng nhanh chóng, theo dõi trạng thái đơn hàng mọi lúc mọi nơi.' },
  { icon: '🔒', name: 'Bảo mật tài khoản',   desc: 'Thông tin cá nhân được mã hoá và bảo vệ an toàn tuyệt đối.' },
  { icon: '🚚', name: 'Giao hàng nhanh',      desc: 'Hệ thống vận chuyển tối ưu, giao hàng đúng hẹn đến tận nơi.' },
  { icon: '💳', name: 'Thanh toán tiện lợi',  desc: 'Hỗ trợ COD, chuyển khoản ngân hàng và nhiều hình thức khác.' },
];

export default function Home() {
  const { user } = useAuth();
  const navigate = useNavigate();

  return (
    <div style={{ fontFamily: 'sans-serif' }}>

   
      <section style={styles.hero}>
        <h1 style={styles.heroTitle}>🛍 Minh Anh Shop</h1>
        <p style={styles.heroSub}>
          Mua sắm thông minh — Giao hàng nhanh — Giá tốt nhất
        </p>

        <div style={styles.heroButtons}>
          {user ? (
         
            <button style={styles.btnPrimary} onClick={() => navigate('/orders')}>
              📦 Xem đơn hàng của tôi
            </button>
          ) : (
          
            <>
              <button style={styles.btnPrimary} onClick={() => navigate('/login')}>
                Đăng nhập
              </button>
              <button style={styles.btnOutline} onClick={() => navigate('/register')}>
                Đăng ký ngay
              </button>
            </>
          )}
        </div>
      </section>

      {/* Features */}
      <section style={styles.features}>
        <h2 style={styles.featTitle}>Tại sao chọn Minh Anh Shop?</h2>
        <p style={styles.featSub}>Chúng tôi cam kết mang lại trải nghiệm mua sắm tốt nhất</p>

        <div style={styles.featGrid}>
          {FEATURES.map(f => (
            <div key={f.name} style={styles.featCard}>
              <div style={styles.featIcon}>{f.icon}</div>
              <div style={styles.featName}>{f.name}</div>
              <div style={styles.featDesc}>{f.desc}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer style={styles.footer}>
        © 2026 Minh Anh Shop — All rights reserved
      </footer>
    </div>
  );
}