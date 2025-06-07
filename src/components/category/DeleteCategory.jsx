import React from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { deleteCategory } from '../../API/api';

function DeleteCategory({ show, onHide, categoryId, onCategoryDelete }) {
  const handleDeleteCategory = async () => {
    const response = await deleteCategory(categoryId);
    if (response.success) {
      onCategoryDelete(true, 'Category deleted successfully!');
      onHide();
    } else {
      onCategoryDelete(false, response.message || 'Failed to delete category');
      onHide();
    }
  };

  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>Delete Category</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        Are you sure you want to delete this category?
      </Modal.Body>
      <Modal.Footer>
        <Button variant="danger" onClick={handleDeleteCategory}>
          Delete
        </Button>
        <Button variant="secondary" onClick={onHide}>
          Cancel
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default DeleteCategory;
