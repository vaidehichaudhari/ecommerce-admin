import React from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { deleteBrand } from '../../API/api';

function DeleteBrand({ show, onHide, brandId, onBrandDelete }) {
   // console.log(brandId)
  const handleDeleteBrand = async () => {
    const response = await deleteBrand(brandId);
   // console.log(response, "In model");
    if (response.success) {
    onBrandDelete(true, 'Brand deleted successfully!');
    onHide(); // close modal
    } else {
    onBrandDelete(false, response.message || 'Failed to delete brand');
    onHide(); // close modal
    }
  };

  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>Delete Brand</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        Are you sure you want to delete this brand?
      </Modal.Body>
      <Modal.Footer>
        <Button variant="danger" onClick={handleDeleteBrand}>
          Delete
        </Button>
        <Button variant="secondary" onClick={onHide}>
          Cancel
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default DeleteBrand;