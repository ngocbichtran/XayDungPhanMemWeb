import { useEffect, useState } from 'react';
import api from '../api/axios';

export function useOrders() {
  const [orders, setOrders]           = useState([]);
  const [selected, setSelected]       = useState(null);
  const [loading, setLoading]         = useState(true);
  const [detailLoading, setDetailLoading] = useState(false);

  useEffect(() => {
    api.get('/orders')
      .then(r => setOrders(r.data))
      .finally(() => setLoading(false));
  }, []);

  const openDetail = async (id) => {
    setDetailLoading(true);
    try {
      const res = await api.get(`/orders/${id}`);
      setSelected(res.data);
    } finally {
      setDetailLoading(false);
    }
  };

  const closeDetail = () => setSelected(null);

  return { orders, selected, loading, detailLoading, openDetail, closeDetail };
}