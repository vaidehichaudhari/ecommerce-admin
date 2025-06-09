import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";
import { deleteProduct } from "../../API/api";

function DeleteProduct({ show, onHide, productId, onProductDelete }) {
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    if (!productId) return;

    setLoading(true);
    const response = await deleteProduct(productId);
    setLoading(false);

    if (response.success) {
      onProductDelete(true, "Product deleted successfully");
      onHide();
    } else {
      onProductDelete(false, response.message || "Failed to delete product");
    }
  };

  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>Delete Product</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        Are you sure you want to delete this product?
      </Modal.Body>
      <Modal.Footer>
        <Button variant="danger" onClick={handleDelete} disabled={loading}>
          {loading ? "Deleting..." : "Delete"}
        </Button>
        <Button variant="secondary" onClick={onHide} disabled={loading}>
          Cancel
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default DeleteProduct;
