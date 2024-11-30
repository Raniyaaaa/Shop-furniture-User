import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchOrders } from '../Store/userSlice';
import OrderList from './OrderList';
import OrderDetails from './OrderDetails';

const OrderPage = () => {
  const dispatch = useDispatch();

  let username = localStorage.getItem('Username') || '';
  username = username.replace(/[@.]/g, '');

  const orders = useSelector((state) => state.user.orders);
  const loading = useSelector((state) => state.user.loading);
  const error = useSelector((state) => state.user.error);

  const [selectedOrder, setSelectedOrder] = useState(null);

  useEffect(() => {
    if (username) {
      dispatch(fetchOrders(username));
    }
  }, [dispatch, username]);

  if (loading) {
    return <div style={{ textAlign: 'center', marginTop: '20px' }}>Loading orders...</div>;
  }

  if (error) {
    return <div style={{ textAlign: 'center', color: 'red' }}>Error: {error}</div>;
  }

  return (
    <div style={{ paddingTop: '2rem', maxWidth: '700px', margin: '0 auto',paddingBottom:'1rem' }}>
      {selectedOrder ? (
        <OrderDetails order={selectedOrder} onBack={() => setSelectedOrder(null)} />
      ) : (
        <OrderList orders={orders} onSelectOrder={setSelectedOrder} />
      )}
    </div>
  );
};

export default OrderPage;
