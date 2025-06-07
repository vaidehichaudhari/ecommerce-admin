import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import { addNewBrand } from '../../API/api';

function AddBrand({ show, onHide, onBrandAdded }) {
  const [brandName, setBrandName] = useState('');
  const [brandImage, setBrandImage] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!show) {
      // Reset form when modal closes
      setBrandName('');
      setBrandImage(null);
      setLoading(false);
    }
  }, [show]);

  const handleNewBrand = async () => {
    if (!brandName.trim()) {
      alert("Please enter a brand name.");
      return;
    }

    if (!brandImage) {
      alert("Please select a brand image.");
      return;
    }

    setLoading(true);
    const formData = new FormData();
    formData.append('name', brandName.trim());
    formData.append('image', brandImage);

    const response = await addNewBrand(formData);
    setLoading(false);

    if (response.success) {
      onBrandAdded();  // refresh brand list
      onHide();        // close modal
    } else {
      alert(response.message || 'Failed to add brand.');
    }
  };

  return (
    <Modal show={show} onHide={onHide} size="lg" centered>
      <Modal.Header closeButton>
        <Modal.Title>Add New Brand</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form.Group className="mb-3" controlId="brandName">
          <Form.Label>Brand Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter brand name"
            value={brandName}
            onChange={(e) => setBrandName(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="brandImage">
          <Form.Label>Brand Image</Form.Label>
          <Form.Control
            type="file"
            accept="image/*"
            onChange={(e) => setBrandImage(e.target.files[0])}
          />
        </Form.Group>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="success" onClick={handleNewBrand} disabled={loading}>
          {loading ? 'Creating...' : 'Create'}
        </Button>
        <Button variant="secondary" onClick={onHide} disabled={loading}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default AddBrand;
