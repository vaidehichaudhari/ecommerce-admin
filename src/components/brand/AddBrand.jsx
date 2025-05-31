import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { addNewBrand } from '../../API/api';

function AddBrand(props) {
  const [brandName, setBrandName] = useState('');
  const [brandImage, setBrandImage] = useState(null);

  const handleNewBrand = async () => {
    if (!brandName || !brandImage) {
      alert("Please provide both brand name and image.");
      return;
    }

    const formData = new FormData();
    formData.append('name', brandName);
    formData.append('brandimage', brandImage);

    const response = await addNewBrand(formData);
    if (response.success) {
      props.onBrandAdded(); // refresh the brand list
      props.onHide(); // close modal
    } else {
      alert('Failed to add brand');
    }
  };

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Add New Brand
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <input
          type="text"
          className="form-control mb-3"
          placeholder="Enter brand name"
          value={brandName}
          onChange={(e) => setBrandName(e.target.value)}
        />
        <input
          type="file"
          className="form-control"
          accept="image/*"
          onChange={(e) => setBrandImage(e.target.files[0])}
        />
      </Modal.Body>
      <Modal.Footer>
        <Button variant="success" onClick={handleNewBrand}>Create</Button>
        <Button variant="secondary" onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}

export default AddBrand;
