import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, fetchProductDetails } from "../Store/userSlice";
import { Button } from "react-bootstrap";

const ProductDetailsPage = () => {
  const { id, category } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  let Username = localStorage.getItem('Username') || '';
  Username = Username.replace(/[@.]/g, '');

  useEffect(() => {
    if (id && category) {
      dispatch(fetchProductDetails(category, id));
    }
  }, [id, category, dispatch]);

  const { isLoggedIn } = useSelector((state) => state.authUser);
  const { productDetails, loading, error } = useSelector((state) => state.user);

  const handleAddToCart = (product) => {
  if (isLoggedIn) {
    console.log(product)
    dispatch(addToCart(Username, product));
  } else {
    alert('Please log in to add products to the cart.');
    navigate('/login');
  }
};

  useEffect(() => {
    if (id && category) {
      dispatch(fetchProductDetails(category, id));
    }
  }, [id, category, dispatch]);

  if (loading) {
    return <div style={{ textAlign: "center" }}>Loading product details...</div>;
  }

  if (error) {
    return (
      <div style={{ textAlign: "center", color: "red" }}>
        {`Error: ${error}`}
      </div>
    );
  }

  if (!productDetails) {
    return (
      <div style={{ textAlign: "center" }}>Product details not available.</div>
    );
  }

  return (
    <div style={{ padding: "50px" }}>
      <div style={{ display: "flex", justifyContent: "space-around" }}>
        <div style={{ width: "40%", position: "relative" }}>
          <img
            src={productDetails.ImageURL}
            alt={productDetails.Name}
            style={{
              width: "100%",
              height: "auto",
              filter: productDetails.Quantity === 0 ? 'blur(1px)' : 'none',
              objectFit: "contain",
            }}
          />

          {productDetails.Quantity === 0 && (
            <div
              style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                backgroundColor: 'rgba(0, 0, 0, 0.6)',
                color: 'white',
                padding: '10px 20px',
                borderRadius: '8px',
                fontSize: '18px',
              }}
            >
              Out of Stock
            </div>
          )}
        </div>
        <div style={{ width: "50%" }}>
          <h1>{productDetails.Name}</h1>
          <p>{productDetails.Description}</p>
          <p style={{ fontSize: "20px", fontWeight: "bold", color: "maroon" }}>
            Rs. {productDetails.Price}
          </p>
          <p
            style={{
              fontSize: '14px',
              fontWeight: 'bold',
              color: productDetails.Quantity > 0 ? 'green' : 'red',
              }}
          >
          {productDetails.Quantity > 0 ? `Quantity: ${productDetails.Quantity}` : 'Out of Stock'}
          </p>
          <Button
            onClick={() => handleAddToCart(productDetails)}
            variant="success"
            disabled={productDetails.Quantity === 0}
          >
            Add To Cart
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailsPage;
