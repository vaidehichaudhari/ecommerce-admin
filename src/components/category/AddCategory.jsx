import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { addNewCategory } from '../../API/api';

function AddCategory(props) {
  const [categoryName, setCategoryName] = useState('');
  const [categoryImage, setCategoryImage] = useState(null);

  const handleNewCategory = async () => {
    if (!categoryName || !categoryImage) {
      alert("Please provide both category name and image.");
      return;
    }

    const formData = new FormData();
    formData.append('name', categoryName);
    formData.append('image', categoryImage);

    const response = await addNewCategory(formData);
    if (response.success) {
      props.onCategoryAdded(); // refresh the category list
      props.onHide(); // close modal
    } else {
      alert('Failed to add category');
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
          Add New Category
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <input
          type="text"
          className="form-control mb-3"
          placeholder="Enter category name"
          value={categoryName}
          onChange={(e) => setCategoryName(e.target.value)}
        />
        <input
          type="file"
          className="form-control"
          accept="image/*"
          onChange={(e) => setCategoryImage(e.target.files[0])}
        />
      </Modal.Body>
      <Modal.Footer>
        <Button variant="success" onClick={handleNewCategory}>Create</Button>
        <Button variant="secondary" onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}

export default AddCategory;
