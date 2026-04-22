export const STATUS_OPTIONS = [
  'pending',
  'processing',
  'shipped',
  'delivered',
  'cancelled',
];

export const PAY_OPTIONS = [
  'unpaid',
  'paid',
  'failed',
  'refunded',
];

export const STATUS_LABEL = {
  pending:    '⏳ Chờ xử lý',
  processing: '🔄 Đang xử lý',
  shipped:    '🚚 Đang giao',
  delivered:  '✅ Đã giao',
  cancelled:  '❌ Đã huỷ',
};

export const PAY_LABEL = {
  unpaid:   '⚠️ Chưa TT',
  paid:     '✅ Đã TT',
  failed:   '❌ Thất bại',
  refunded: '↩️ Hoàn tiền',
};