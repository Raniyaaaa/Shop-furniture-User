import React from 'react';

const OrderDetails = ({ order, onBack }) => {
  const steps = [
    { label: 'Order Placed', completed: true },
    { label: 'Shipped', completed: ['Shipped', 'Delivered', 'Cancelled'].includes(order.status) },
    { label: 'Delivered', completed: order.status === 'Delivered' },
    ...(order.status === 'Cancelled' ? [{ label: 'Cancelled', completed: true }] : []),
  ];

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
      <h2 style={{ marginBottom: '30px', color: order.status === 'Cancelled' ? 'red' : 'green' }}>
        {order.status === 'Cancelled' ? 'Order Cancelled' : `${order.status} Successfully`}
      </h2>

      <div>
        <p style={{ fontSize: '16px', marginBottom: '20px' }}>
          <strong>Order Number:</strong> {order.id}
        </p>
        <p style={{ fontSize: '16px', marginBottom: '20px' }}>
          <strong>Total Amount:</strong> Rs. {Number(order.totalAmount).toFixed(2)}
        </p>
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        {steps.map((step, index, stepsArray) => (
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
            {index < stepsArray.length - 1 && (
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

      <button
        onClick={onBack}
        style={{
          marginTop: '30px',
          padding: '10px 20px',
          backgroundColor: '#007bff',
          color: '#fff',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer',
        }}
      >
        Back to Orders
      </button>
    </div>
  );
};

export default OrderDetails;
