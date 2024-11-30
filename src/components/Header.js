import React from 'react';
import { Navbar, Container, Form, FormControl, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../Store/authUserSlice';
import { Link } from 'react-router-dom';
import { useNavigate, useLocation } from 'react-router-dom';
import { setSearchTerm } from '../Store/searchSlice';

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { isLoggedIn } = useSelector((state) => state.authUser);
  const searchTerm = useSelector((state) => state.search.search);
  const dispatch = useDispatch();

  const handleLogIn = () => {
    navigate('/login');
  };

  const handleLogOut = () => {
    dispatch(logout());
  };

  const handleCart = () => {
    navigate('/cart');
  };

  return (
    <header
      style={{
        height: '80px',
        overflow: 'hidden',
        backgroundColor: '#f8f9fa',
        boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
      }}
    >
      <Navbar
        expand="lg"
        style={{
          backgroundColor: '#fff',
          height: '100%',
          padding: '20px',
        }}
      >
        <Container fluid className="d-flex align-items-center justify-content-between">
          <Navbar.Brand>
            <img
              src="https://static.vecteezy.com/system/resources/thumbnails/021/492/968/small/interior-minimalist-room-gallery-furniture-logo-design-vector.jpg"
              alt="Logo"
              style={{
                maxHeight: '80px',
                objectFit: 'contain',
              }}
            />
          </Navbar.Brand>

          <div className="d-flex align-items-center">
            <Link
                  to='/order-page'
                  style={{ textDecoration: 'none', color: '#333', marginRight: '20px' }}
                >
                  Orders
            </Link>
            {location.pathname === '/' && (
              <>
                <a
                  href="#product-list"
                  style={{ textDecoration: 'none', color: '#333', marginRight: '20px' }}
                >
                  Shop
                </a>
                <a
                  href="#about"
                  style={{ textDecoration: 'none', color: '#333', marginRight: '20px' }}
                >
                  About
                </a>
                <a
                  href="#contact"
                  style={{ textDecoration: 'none', color: '#333', marginRight: '20px' }}
                >
                  Contact
                </a>
              </>
            )}
          </div>

          <Form className="d-flex align-items-center" style={{ gap: '10px' }}>
              <FormControl
                type="search"
                placeholder="Search for products"
                value={searchTerm}
                onChange={(e) => dispatch(setSearchTerm(e.target.value))}
                className="me-2"
                style={{ width: '250px' }}
              />

            {!isLoggedIn && (
              <Button variant="outline-primary" onClick={handleLogIn}>
                Login/Register
              </Button>
            )}

            {isLoggedIn && (
              <>
                <Button variant="outline-primary" onClick={handleCart}>
                  Cart
                </Button>
                <Button variant="outline-primary" onClick={handleLogOut}>
                  Log Out
                </Button>
              </>
            )}
          </Form>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
