import React from 'react';

const OrderList = ({ orders, onSelectOrder }) => {
  return (
    <div style={{padding:'1rem'}}>
      <h1 style={{ textAlign: 'center' }}>My Orders</h1>
      {orders?.length > 0 ? (
        <div>
          {orders.map((order) => (
            <div
              key={order.orderId}
              style={{
                padding: '10px',
                margin: '10px 0',
                border: '1px solid #ddd',
                borderRadius: '8px',
                background: '#f9f9f9',
                cursor: 'pointer',
              }}
              onClick={() => onSelectOrder(order)}
            >
              <h3>Order #{order.id}</h3>
              <p>
                <strong>Status:</strong> {order.status || 'N/A'}
              </p>
              <p>
                <strong>Total Amount:</strong> Rs. {Number(order.totalAmount).toFixed(2)}
              </p>
            </div>
          ))}
        </div>
      ) : (
        <p style={{ textAlign: 'center' }}>You have not placed any orders yet.</p>
      )}
    </div>
  );
};

export default OrderList;
