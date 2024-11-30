import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { addToCart, fetchCategoryProducts } from '../Store/userSlice';
import { Button } from 'react-bootstrap';

const CategoryPage = () => {
  const { categoryName } = useParams();
  const dispatch = useDispatch();
  const { products, loading, error } = useSelector((state) => state.user);
  const { isLoggedIn } = useSelector((state) => state.authUser);
  const navigate = useNavigate();
  let Username = localStorage.getItem('Username') || '';
  Username = Username.replace(/[@.]/g, '');
  
  useEffect(() => {
    if (categoryName) {
      dispatch(fetchCategoryProducts(categoryName));
    }
  }, [categoryName, dispatch]);

  if (loading) {
    return <div style={{ textAlign: 'center' }}>Loading products...</div>;
  }

  if (error) {
    return <div style={{ textAlign: 'center', color: 'red' }}>{error}</div>;
  }

  const handleAddToCart = (product) => {
    if (isLoggedIn) {
        console.log(product)
      dispatch(addToCart(Username, product));
    } else {
      alert('Please log in to add products to the cart.');
      navigate('/login');
    }
  };

  return (
    <div style={{ padding: '50px' }}>
      <h1 style={{ textAlign: 'center', marginBottom: '30px' }}>
        {categoryName} Collection
      </h1>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '20px' }}>
        {products.length === 0 ? (
          <p style={{ textAlign: 'center', gridColumn: 'span 4' }}>No products available in this category.</p>
        ) : (
          products.map((product) => (
            <div
              key={product.id}
              style={{
                position: 'relative',
                border: '1px solid #ddd',
                borderRadius: '8px',
                padding: '15px',
                boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
                textAlign: 'center',
              }}
            >
              <Link to={`/product/${product.Category}/${product.id}`} style={{ textDecoration: 'none' }}>
                <div style={{ position: 'relative' }}>
                  <img
                    src={product.ImageURL}
                    alt={product.Name}
                    style={{
                      width: '100%',
                      height: '200px',
                      objectFit: 'contain',
                      filter: product.Quantity === 0 ? 'blur(1px)' : 'none',
                      marginBottom: '15px',
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
                <h3 style={{ fontSize: '18px', marginBottom: '10px' }}>{product.Name}</h3>
              <p style={{ fontSize: '16px', fontWeight: 'bold', color: 'maroon' }}>Rs. {product.Price}</p>
              </Link>
              <Button 
                onClick={() => handleAddToCart(product)} 
                variant="success" 
                size="sm" 
                disabled={product.Quantity === 0}
              >
                Add To Cart
              </Button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default CategoryPage;
