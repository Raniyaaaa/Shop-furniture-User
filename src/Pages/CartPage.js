import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { removeFromCart, fetchCart } from '../Store/userSlice';
import { Link, useNavigate } from 'react-router-dom';
import { Modal, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const CartPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  let Username = localStorage.getItem('Username') || '';
  Username = Username.replace(/[@.]/g, '');

  const cart = useSelector((state) => state.user.cart);
  const loading = useSelector((state) => state.user.loading);
  const error = useSelector((state) => state.user.error);

  const [showModal, setShowModal] = useState(false);
  const [productToRemove, setProductToRemove] = useState(null);

  useEffect(() => {
    if (Username) {
      dispatch(fetchCart(Username));
    }
  }, [Username, dispatch]);

  const handleRemoveFromCart = (productId) => {
    setProductToRemove(productId);
    setShowModal(true);
  };

  const confirmRemove = () => {
    if (productToRemove) {
      dispatch(removeFromCart(Username, productToRemove));
      setShowModal(false);
    }
  };

  const cancelRemove = () => {
    setShowModal(false);
  };

  const getTotal = () => {
    return cart?.reduce((total, product) => total + product.Price * product.Quantity, 0).toFixed(2);
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div style={{ padding: '20px', maxWidth: '900px', margin: '0 auto' }}>
      <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>Your Cart</h2>
      {cart?.length === 0 ? (
        <div style={{ textAlign: 'center' ,padding:'8rem'}}>
          <p>Your cart is empty.</p>
          <Button
            variant="secondary"
            onClick={() => navigate(-1)}
            style={{ marginTop: '10px' }}
          >
            Back
          </Button>
        </div>
      ) : (
        <div>
          <div >
            {cart.map((product) => (
              <div
                key={product.id}
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  border: '1px solid #ddd',
                  borderRadius: '8px',
                  padding: '15px',
                  marginBottom: '10px',
                  boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
                  backgroundColor: '#fff',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <img
                    src={product.ImageURL}
                    alt={product.Name}
                    style={{
                      width: '60px',
                      height: '60px',
                      objectFit: 'cover',
                      marginRight: '15px',
                      borderRadius: '4px',
                    }}
                  />
                  <div>
                    <h5 style={{ marginBottom: '5px' }}>{product.Name}</h5>
                    <p style={{ marginBottom: '5px', fontSize: '14px', color: '#777' }}>
                      Quantity: {product.Quantity}
                    </p>
                    <p style={{ marginBottom: '5px', fontSize: '14px', fontWeight: 'bold', color: '#333' }}>
                      Rs. {product.Price}
                    </p>
                  </div>
                </div>
                <Button
                  variant="danger"
                  onClick={() => handleRemoveFromCart(product.id)}
                  style={{ fontSize: '14px', padding: '6px 12px' }}
                >
                  Remove
                </Button>
              </div>
            ))}
          </div>

          <div style={{ marginTop: '20px', textAlign: 'center' }}>
            <h3 style={{ fontSize: '20px', fontWeight: 'bold', color: '#333' }}>
              Total: Rs. {getTotal()}
            </h3>
            <Link to="/checkout">
              <Button
                variant="success"
                style={{
                  fontSize: '16px',
                  padding: '10px 20px',
                  marginTop: '15px',
                  backgroundColor: '#28a745',
                  borderColor: '#28a745',
                }}
              >
                Proceed to Checkout
              </Button>
            </Link>
          </div>
        </div>
      )}

      <Modal show={showModal} onHide={cancelRemove}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Removal</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Are you sure you want to remove this item from your cart?</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={cancelRemove}>
            Cancel
          </Button>
          <Button variant="danger" onClick={confirmRemove}>
            Yes, Remove
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default CartPage;
