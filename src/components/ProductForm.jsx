import React, { useState } from 'react';
import { Form, Button, Container, Row, Col, Spinner } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './ProductForm.css';

const ProductForm = () => {
  const [product, setProduct] = useState({
    title: { shortTitle: '', longTitle: '' },
    price: { mrp: '', cost: '', discount: '' },
    quantity: '',
    description: '',
    tagline: '',
    category: '',
    seller: '',
    image: null
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'image') {
      setProduct(prevState => ({
        ...prevState,
        image: files[0]
      }));
    } else if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setProduct(prevState => ({
        ...prevState,
        [parent]: {
          ...prevState[parent],
          [child]: value
        }
      }));
    } else {
      setProduct(prevState => ({
        ...prevState,
        [name]: value
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true); // Set submitting state to true
    const formData = new FormData();
    for (const key in product) {
      if (key === 'image') {
        formData.append(key, product[key]);
      } else if (typeof product[key] === 'object') {
        formData.append(key, JSON.stringify(product[key]));
      } else {
        formData.append(key, product[key]);
      }
    }

    try {
      const response = await fetch('https://server-m9k6.onrender.com/upload', {
        method: 'POST',
        body: formData
      });
      const result = await response.json();
      console.log(result);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setIsSubmitting(false); // Set submitting state to false after submission
    }
  };

  return (
    <Container>
      <Form onSubmit={handleSubmit}>
        <Row>
          <Col>
            <Form.Group controlId="shortTitle">
              <Form.Label>Short Title</Form.Label>
              <Form.Control type="text" name="title.shortTitle" value={product.title.shortTitle} onChange={handleChange} required />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId="longTitle">
              <Form.Label>Long Title</Form.Label>
              <Form.Control type="text" name="title.longTitle" value={product.title.longTitle} onChange={handleChange} required />
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col>
            <Form.Group controlId="mrp">
              <Form.Label>MRP</Form.Label>
              <Form.Control type="number" name="price.mrp" value={product.price.mrp} onChange={handleChange} required />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId="cost">
              <Form.Label>Cost</Form.Label>
              <Form.Control type="number" name="price.cost" value={product.price.cost} onChange={handleChange} required />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId="discount">
              <Form.Label>Discount</Form.Label>
              <Form.Control type="string" name="price.discount" value={product.price.discount} onChange={handleChange} required />
            </Form.Group>
          </Col>
        </Row>
        <Form.Group controlId="quantity">
          <Form.Label>Quantity</Form.Label>
          <Form.Control type="number" name="quantity" value={product.quantity} onChange={handleChange} required />
        </Form.Group>
        <Form.Group controlId="description">
          <Form.Label>Description</Form.Label>
          <Form.Control as="textarea" name="description" value={product.description} onChange={handleChange} required />
        </Form.Group>
        <Form.Group controlId="tagline">
          <Form.Label>Tagline</Form.Label>
          <Form.Control type="text" name="tagline" value={product.tagline} onChange={handleChange} required />
        </Form.Group>
        <Form.Group controlId="category">
          <Form.Label>Category</Form.Label>
          <Form.Control type="text" name="category" value={product.category} onChange={handleChange} required />
        </Form.Group>
        <Form.Group controlId="seller">
          <Form.Label>Seller</Form.Label>
          <Form.Control type="text" name="seller" value={product.seller} onChange={handleChange} required />
        </Form.Group>
        <Form.Group controlId="image">
          <Form.Label>Upload Image</Form.Label>
          <Form.Control type="file" name="image" onChange={handleChange} required />
        </Form.Group>
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? (
            <>
              <Spinner
                as="span"
                animation="border"
                size="sm"
                role="status"
                aria-hidden="true"
              />{' '}
              Uploading...
            </>
          ) : (
            'Upload Product'
          )}
        </Button>
      </Form>
    </Container>
  );
};

export default ProductForm;