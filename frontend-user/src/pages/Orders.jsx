import { useOrders } from '../hooks/useOrders';
import { orderStyles as styles } from '../styles/orderStyles';
import { STATUS_LABEL, PAY_LABEL } from '../constants/orderConstants';

export default function Orders() {
  const { orders, selected, loading, detailLoading, openDetail, closeDetail } = useOrders();

  if (loading) return <p style={styles.loading}>Đang tải đơn hàng...</p>;

  return (
    <div style={{ fontFamily: 'sans-serif' }}>
      <h2 style={styles.title}>📦 Đơn hàng của tôi</h2>


      {orders.length === 0 ? (
        <div style={styles.empty}>
          <p>Bạn chưa có đơn hàng nào.</p>
        </div>
      ) : (
        <div style={styles.tableWrap}>
          <table style={styles.table}>
            <thead>
              <tr style={styles.thead}>
                <th style={styles.th}>Mã đơn</th>
                <th style={styles.th}>Ngày đặt</th>
                <th style={styles.th}>Tổng tiền</th>
                <th style={styles.th}>Trạng thái</th>
                <th style={styles.th}>Thanh toán</th>
                <th style={styles.th}></th>
              </tr>
            </thead>
            <tbody>
              {orders.map(o => (
                <tr key={o.id} style={styles.tr}>
                  <td style={styles.td}><b>{o.order_code}</b></td>
                  <td style={styles.td}>
                    {new Date(o.created_at).toLocaleDateString('vi-VN')}
                  </td>
                  <td style={styles.td}>
                    <b style={{ color: '#dc2626' }}>
                      {Number(o.total_amount).toLocaleString('vi-VN')}đ
                    </b>
                  </td>
                  <td style={styles.td}>{STATUS_LABEL[o.status]}</td>
                  <td style={styles.td}>{PAY_LABEL[o.payment_status]}</td>
                  <td style={styles.td}>
                    <button onClick={() => openDetail(o.id)} style={styles.btnDetail}>
                      Xem chi tiết
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}


      {(selected || detailLoading) && (
        <div style={styles.overlay} onClick={closeDetail}>
          <div style={styles.modal} onClick={e => e.stopPropagation()}>

            {detailLoading ? (
              <p style={{ textAlign: 'center' }}>Đang tải...</p>
            ) : (
              <>

                <div style={styles.modalHeader}>
                  <h3 style={{ margin: 0 }}>🧾 {selected.order_code}</h3>
                  <button onClick={closeDetail} style={styles.btnX}>✕</button>
                </div>


                <div style={styles.infoGrid}>
                  <div style={styles.infoItem}>
                    <span style={styles.infoLabel}>Người nhận</span>
                    <span>{selected.shipping_name}</span>
                  </div>
                  <div style={styles.infoItem}>
                    <span style={styles.infoLabel}>SĐT</span>
                    <span>{selected.shipping_phone}</span>
                  </div>
                  <div style={styles.infoItem}>
                    <span style={styles.infoLabel}>Địa chỉ</span>
                    <span>{selected.shipping_address}</span>
                  </div>
                  <div style={styles.infoItem}>
                    <span style={styles.infoLabel}>Thanh toán</span>
                    <span>{selected.payment_method}</span>
                  </div>
                  {selected.note && (
                    <div style={styles.infoItem}>
                      <span style={styles.infoLabel}>Ghi chú</span>
                      <span>{selected.note}</span>
                    </div>
                  )}
                </div>

                <hr style={{ margin: '16px 0', border: 'none', borderTop: '1px solid #e5e7eb' }} />

      
                <h4 style={{ marginBottom: 10 }}>Sản phẩm</h4>
                <table style={styles.table}>
                  <thead>
                    <tr style={styles.thead}>
                      <th style={styles.th}>Tên sản phẩm</th>
                      <th style={styles.th}>SL</th>
                      <th style={styles.th}>Đơn giá</th>
                      <th style={styles.th}>Thành tiền</th>
                    </tr>
                  </thead>
                  <tbody>
                    {selected.items?.map(item => (
                      <tr key={item.id} style={styles.tr}>
                        <td style={styles.td}>{item.product_name}</td>
                        <td style={styles.td}>{item.quantity}</td>
                        <td style={styles.td}>
                          {Number(item.price).toLocaleString('vi-VN')}đ
                        </td>
                        <td style={styles.td}>
                          <b>{Number(item.subtotal).toLocaleString('vi-VN')}đ</b>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>


                <div style={styles.total}>
                  Tổng cộng:{' '}
                  <b style={{ color: '#dc2626', fontSize: 16 }}>
                    {Number(selected.total_amount).toLocaleString('vi-VN')}đ
                  </b>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}