import React, { useState } from 'react';
import { Container, Row, Col, Form, Button, Card, Alert, Spinner } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import 'bootstrap/dist/css/bootstrap.min.css';
import './AuthForm.css'; // Import the CSS file for additional styling
import loginImage from '../images/rd.png';

const AuthForm = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [shopName, setShopName] = useState('');
  const [contact, setContact] = useState(''); // Changed from contactNo to contact
  const [address, setAddress] = useState('');
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [loading, setLoading] = useState(false); // New state for loading
  const navigate = useNavigate(); // Initialize useNavigate

  const toggleForm = () => {
    setIsLogin(!isLogin);
    setError(null);
    setSuccess(null);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true); // Set loading to true
    try {
      const response = await fetch('https://server-m9k6.onrender.com/sellerLogin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();
      if (response.ok) {
        setSuccess('Login successful');
        navigate('/SellerHome'); // Navigate to SellerHome on successful login
      } else {
        setError(data.message || 'Login failed');
      }
    } catch (error) {
      setError('An error occurred. Please try again.');
    } finally {
      setLoading(false); // Set loading to false
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true); // Set loading to true
    try {
      const response = await fetch('https://server-m9k6.onrender.com/sellerSignup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ shopName, email, password, contact, address }), // Ensure fields match controller
      });
      const data = await response.json();
      if (response.ok) {
        setSuccess('Registration successful');
      } else {
        setError(data.message || 'Registration failed');
      }
    } catch (error) {
      setError('An error occurred. Please try again.');
    } finally {
      setLoading(false); // Set loading to false
    }
  };

  return (
    <Container className="d-flex justify-content-center align-items-center vh-100">
      <Row className="w-100">
        <Col md={6} className="d-none d-md-block">
          <img src={loginImage} alt="Seller Login" className="img-fluid" />
        </Col>
        <Col md={6}>
          <Card className="p-4 rounded-3">
            <Card.Body>
              <Button
                style={{ marginTop: '10px', backgroundColor: '#00bbf0' }}
                className="mb-3 w-100"
                onClick={toggleForm}
              >
                {isLogin ? 'Open Register Panel' : 'Open Login Panel'}
              </Button>
              {error && <Alert variant="danger">{error}</Alert>}
              {success && <Alert variant="success">{success}</Alert>}
              {loading && <Spinner animation="border" variant="primary" className="mb-3" />} {/* Loader */}
              {isLogin ? (
                <Form onSubmit={handleLogin}>
                  <Form.Group controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control
                      type="email"
                      placeholder="Enter email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </Form.Group>
                  <Form.Group controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                      type="password"
                      placeholder="Password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </Form.Group>
                  <Button
                    style={{ marginTop: '10px', backgroundColor: '#00bbf0' }}
                    type="submit"
                    className="w-100 mt-3"
                    disabled={loading} // Disable button when loading
                  >
                    Login
                  </Button>
                </Form>
              ) : (
                <Form onSubmit={handleRegister}>
                  <Form.Group controlId="formShopName">
                    <Form.Label>Shop Name</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter shop name"
                      value={shopName}
                      onChange={(e) => setShopName(e.target.value)}
                    />
                  </Form.Group>
                  <Form.Group controlId="formEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control
                      type="email"
                      placeholder="Enter email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </Form.Group>
                  <Form.Group controlId="formPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                      type="password"
                      placeholder="Password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </Form.Group>
                  <Form.Group controlId="formContactNo">
                    <Form.Label>Contact No</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter contact number"
                      value={contact}
                      onChange={(e) => setContact(e.target.value)}
                    />
                  </Form.Group>
                  <Form.Group controlId="formAddress">
                    <Form.Label>Address</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter address"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                    />
                  </Form.Group>
                  <Form.Group controlId="formTerms">
                    <Form.Check type="checkbox" label="I agree to the terms and conditions" />
                  </Form.Group>
                  <Button
                    style={{ marginTop: '10px', backgroundColor: '#00bbf0' }}
                    type="submit"
                    className="w-100 mt-3"
                    disabled={loading} // Disable button when loading
                  >
                    Register
                  </Button>
                </Form>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default AuthForm;