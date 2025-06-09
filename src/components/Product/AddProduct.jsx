import React, { useEffect, useState } from 'react';
import { Button, Modal, Form } from 'react-bootstrap';
import { addNewProduct } from '../../API/api';

function AddProduct({ show, onHide, onProductAdded, brands = [], categories = [] }) {
  const [productName, setProductName] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [quantity, setQuantity] = useState('');
  const [inStock, setInStock] = useState(true);
  const [image, setImage] = useState(null);
  const [brandId, setBrandId] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!show) {
      setProductName('');
      setPrice('');
      setDescription('');
      setQuantity('');
      setInStock(true);
      setImage(null);
      setBrandId('');
      setCategoryId('');
      setLoading(false);
    }
  }, [show]);

  const handleAddProduct = async () => {
    if (
      !productName.trim() ||
      !price ||
      !description.trim() ||
      !quantity ||
      brandId === '' ||
      categoryId === '' ||
      !image
    ) {
      alert('Please fill out all fields and select an image.');
      return;
    }

    setLoading(true);
    const formData = new FormData();
    formData.append('name', productName.trim());
    formData.append('price', price);
    formData.append('description', description.trim());
    formData.append('quantity', quantity);
    formData.append('inStock', inStock);
    formData.append('image', image);
    formData.append('brandId', brandId);
    formData.append('categoryId', categoryId);

    const response = await addNewProduct(formData);
    setLoading(false);

    if (response.success) {
      onProductAdded();
      onHide();
    } else {
      alert(response.message || 'Failed to add product.');
    }
  };

  return (
    <Modal show={show} onHide={onHide} size="lg" centered>
      <Modal.Header closeButton>
        <Modal.Title>Add New Product</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form.Group className="mb-3">
          <Form.Label>Product Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter product name"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Price</Form.Label>
          <Form.Control
            type="number"
            placeholder="Enter price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Description</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            placeholder="Enter description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Quantity</Form.Label>
          <Form.Control
            type="number"
            placeholder="Enter quantity"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Check
            type="checkbox"
            label="In Stock"
            checked={inStock}
            onChange={(e) => setInStock(e.target.checked)}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Brand</Form.Label>
          <Form.Select value={brandId} onChange={(e) => setBrandId(e.target.value)}>
            <option value="">-- Select Brand --</option>
            {(brands || []).map((brand) => (
              <option key={brand.id} value={brand.id}>
                {brand.name}
              </option>
            ))}
          </Form.Select>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Category</Form.Label>
          <Form.Select value={categoryId} onChange={(e) => setCategoryId(e.target.value)}>
            <option value="">-- Select Category --</option>
            {(categories || []).map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.name}
              </option>
            ))}
          </Form.Select>
        </Form.Group>

        <Form.Group>
          <Form.Label>Product Image</Form.Label>
          <Form.Control
            type="file"
            accept="image/*"
            onChange={(e) => setImage(e.target.files[0])}
          />
        </Form.Group>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="success" onClick={handleAddProduct} disabled={loading}>
          {loading ? 'Creating...' : 'Create'}
        </Button>
        <Button variant="secondary" onClick={onHide} disabled={loading}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default AddProduct;
