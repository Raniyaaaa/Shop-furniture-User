import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts, addToCart } from '../Store/userSlice';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from 'react-bootstrap';

const ProductList = () => {
  const dispatch = useDispatch();
  const { products } = useSelector((state) => state.user);
  const { isLoggedIn } = useSelector((state) => state.authUser);
  const { searchTerm } = useSelector((state) => state.search);
  const navigate = useNavigate();
  const username = localStorage.getItem('Username')?.replace(/[@.]/g, '') || '';

  useEffect(() => {
    dispatch(fetchProducts());
  }, [products,dispatch]);

  const filteredProducts = products.filter((product) =>
    product.Category.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.Name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    product.Description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const groupedProducts = filteredProducts.reduce((groups, product) => {
    if (!groups[product.Category]) {
      groups[product.Category] = [];
    }
    groups[product.Category].push(product);
    return groups;
  }, {});

  const handleAddToCart = (product) => {
    if (isLoggedIn) {
      dispatch(addToCart(username, product));
    } else {
      alert('Please log in to add products to the cart.');
      navigate('/login');
    }
  };

  return (
    <div id="product-list" style={{ paddingRight: '25px', paddingLeft: '25px' }}>
      <h2 style={{ marginTop: '4rem' }}>Featured Products</h2>
      {Object.keys(groupedProducts).map((category) => (
        <div key={category}>
          <Link to={`/category/${category}`} style={{ textDecoration: 'none' }}>
            <h2
              style={{
                color: '#333',
                fontSize: '24px',
                marginBottom: '30px',
                textAlign: 'center',
                textShadow: '1px 3px 4px gray',
              }}
            >
              {category}
            </h2>
          </Link>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
              gap: '25px',
              marginBottom: '40px',
            }}
          >
            {groupedProducts[category].map((product) => (
              <div key={product.id} style={{ position: 'relative', border: '1px solid #ddd', borderRadius: '8px', padding: '20px', boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)', textAlign: 'center', backgroundColor: '#fff' }}>
                <Link to={`/product/${category}/${product.id}`} style={{ textDecoration: 'none' }}>
                  <div style={{ position: 'relative' }}>
                    <img
                      src={product.ImageURL}
                      alt={product.Name}
                      style={{
                        width: '100%',
                        height: '200px',
                        objectFit: 'cover',
                        filter: product.Quantity === 0 ? 'blur(1px)' : 'none',
                        borderRadius: '8px',
                      }}
                    />
                    {product.Quantity === 0 && (
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
                  <h3 style={{ color: '#333', marginTop: '15px' }}>{product.Name}</h3>
                  <p style={{ color: '#777' }}>{product.Description}</p>
                  <p style={{ fontSize: '18px', fontWeight: 'bold', color: 'maroon' }}>Rs. {product.Price}</p>
                  <p
                    style={{
                      fontSize: '14px',
                      fontWeight: 'bold',
                      color: product.Quantity > 0 ? 'green' : 'red',
                    }}
                  >
                    {product.Quantity > 0 ? `Quantity: ${product.Quantity}` : 'Out of Stock'}
                  </p>
                </Link>
                <Button
                  onClick={() => handleAddToCart(product)}
                  variant="success"
                  size="sm"
                  disabled={product.Quantity === 0}
                  style={{ marginTop: '10px' }}
                >
                  Add To Cart
                </Button>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductList;
