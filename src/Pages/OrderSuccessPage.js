import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchOrders } from '../Store/userSlice';

const OrderSuccessPage = () => {
  const dispatch = useDispatch();
  const { id } = useParams();

  const orders = useSelector((state) => state.user.orders);
  const loading = useSelector((state) => state.user.loading);

  let Username = localStorage.getItem('Username') || '';
  Username = Username.replace(/[@.]/g, '');

  useEffect(() => {
    dispatch(fetchOrders(Username));
  }, [dispatch, Username]);

  const order = orders?.find((i) => String(i.id) === String(id));

  if (loading) {
    return <div style={{ textAlign: 'center', marginTop: '20px' }}>Loading...</div>;
  }

  if (!order) {
    return (
      <div style={{ textAlign: 'center', marginTop: '50px', color: '#ff4d4f' }}>
        <h2>Order not found</h2>
        <p>We couldn't locate your order. Please try again later.</p>
      </div>
    );
  }

  const isCancelled = order.status === 'Cancelled';

  const steps = [
    { label: 'Order Placed', completed: true },
    { label: 'Shipped', completed: order.status === 'Shipped' || order.status === 'Delivered' || isCancelled },
    { label: 'Delivered', completed: order.status === 'Delivered' || isCancelled },
  ];

  if (isCancelled) {
    steps.push({ label: 'Cancelled', completed: true });
  }

  return (
    <div
      style={{
        maxWidth: '700px',
        margin: '50px auto',
        padding: '20px',
        border: '1px solid #ddd',
        borderRadius: '8px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        backgroundColor: '#fff',
        textAlign: 'center',
      }}
    >
      <h2 style={{ marginBottom: '30px', color: isCancelled ? 'red' : 'green' }}>
        {isCancelled ? 'Order Cancelled' : `${order.status} Successfully`}
      </h2>

      <div>
        <p style={{ fontSize: '16px', marginBottom: '20px' }}>
          <strong>Order Number:</strong> {order.id}
        </p>
        <p style={{ fontSize: '16px', marginBottom: '20px' }}>
          <strong>Total Amount:</strong> Rs. {Number(order.totalAmount).toFixed(2)}
        </p>
        <p style={{ fontSize: '16px', marginBottom: '40px' }}>
          <strong>Estimated Delivery Date:</strong> {'01/01/2025'}
        </p>
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        {steps.map((step, index) => (
          <div key={index} style={{ textAlign: 'center', flex: 1 }}>
            <div
              style={{
                width: '30px',
                height: '30px',
                borderRadius: '50%',
                backgroundColor: step.completed ? 'green' : '#ddd',
                color: 'white',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                margin: '0 auto',
              }}
            >
              {index + 1}
            </div>
            <p
              style={{
                fontSize: '14px',
                color: step.completed ? 'green' : '#aaa',
                marginTop: '10px',
              }}
            >
              {step.label}
            </p>
            {index < steps.length - 1 && (
              <div
                style={{
                  height: '2px',
                  backgroundColor: step.completed ? 'green' : '#ddd',
                  width: '100%',
                  margin: '10px auto',
                }}
              ></div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrderSuccessPage;
