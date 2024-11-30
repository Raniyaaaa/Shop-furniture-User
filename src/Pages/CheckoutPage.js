import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { fetchAllAddresses, addNewAddress, placeOrder } from '../Store/userSlice';

const Checkout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  let Username = localStorage.getItem('Username') || '';
  Username = Username.replace(/[@.]/g, '');

  const cart = useSelector((state) => state.user.cart);
  const addresses = useSelector((state) => state.user.addresses);
  const currentOrderId = useSelector((state) => state.user.currentOrderId);
  
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [newAddress, setNewAddress] = useState({
    line1: '',
    city: '',
    zipcode: '',
  });

  const getTotal = () => {
    return cart?.reduce((total, product) => total + product.Price * product.Quantity, 0).toFixed(2);
  };

  useEffect(() => {
    dispatch(fetchAllAddresses(Username));
  }, [dispatch, Username]);

  const handlePlaceOrder = async () => {
    if (!selectedAddress) {
      alert('Please select or enter an address.');
      return;
    }
  
    const orderData = {
      id: Date.now(),
      Items: cart,
      address: selectedAddress,
      paymentMethod: 'COD',
      totalAmount: getTotal(),
      status: 'Order Placed'
    };
  
    try {
      await dispatch(placeOrder(Username, orderData));
      navigate(`/order-success/${orderData.id}`);
    } catch (error) {
      alert('Order could not be placed. Please try again.');
      console.error(error);
    }
  };

  const handleAddNewAddress = () => {
    if (newAddress.line1 && newAddress.city && newAddress.zipcode) {
      dispatch(addNewAddress(Username, newAddress));
      setNewAddress({
        line1: '',
        city: '',
        zipcode: '',
      });
    } else {
      alert('Please fill out all address fields.');
    }
  };

  return (
    <div className="container mt-4">
      <h2>Checkout</h2>

      <div>
        <h3>Total: Rs. {getTotal()}</h3>
        <p>Choose your preferred address:</p>
        <div>
          <h5>Select Address</h5>
          <div>
            {addresses.length > 0 ? (
              addresses.map((address) => (
                <div key={address.id}>
                  <label>
                    <input
                      type="radio"
                      name="address"
                      value={address.id}
                      onChange={() => setSelectedAddress(address)}
                    />
                    {`${address.line1}, ${address.city}, ${address.zipcode}`}
                  </label>
                </div>
              ))
            ) : (
              <p>No saved addresses. Please add one below.</p>
            )}
          </div>
        </div>
        <div className="mt-3">
          <h5>Or Add a New Address</h5>
          <form onSubmit={(e) => { e.preventDefault(); handleAddNewAddress(); }}>
            <div className="form-group">
              <label>Line 1</label>
              <input
                type="text"
                className="form-control"
                value={newAddress.line1}
                onChange={(e) => setNewAddress({ ...newAddress, line1: e.target.value })}
                required
              />
            </div>
            <div className="form-group">
              <label>City</label>
              <input
                type="text"
                className="form-control"
                value={newAddress.city}
                onChange={(e) => setNewAddress({ ...newAddress, city: e.target.value })}
                required
              />
            </div>
            <div className="form-group">
              <label>Zipcode</label>
              <input
                type="text"
                className="form-control"
                value={newAddress.zipcode}
                onChange={(e) => setNewAddress({ ...newAddress, zipcode: e.target.value })}
                required
              />
            </div>
            <Button type="submit" variant="secondary" className="mt-2">
              Add Address
            </Button>
          </form>
        </div>

        <div className="mt-3">
          <Button variant="primary" onClick={handlePlaceOrder}>
            Place Order
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
