import React, { useEffect, useState } from "react";
import { Button, Modal, Form, Image } from "react-bootstrap";
import { updateCategory } from "../../API/api";

function EditCategory({ show, onHide, category, onCategoryUpdated }) {
  const [categoryName, setCategoryName] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [loading, setLoading] = useState(false);

  // Populate modal with selected category data
  useEffect(() => {
    if (category) {
      setCategoryName(category.name || "");
      setImageFile(null);
      setPreviewImage(category.image || null);
    }
  }, [category]);

  // Reset fields on close
  useEffect(() => {
    if (!show) {
      setCategoryName("");
      setImageFile(null);
      setPreviewImage(null);
      setLoading(false);
    }
  }, [show]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  const handleUpdate = async () => {
    if (!categoryName.trim()) {
      onCategoryUpdated(false, "Category name cannot be empty");
      return;
    }

    setLoading(true);

    const formData = new FormData();
    formData.append("name", categoryName.trim());

    if (imageFile) {
      formData.append("categoryimage", imageFile); // Ensure backend expects "categoryimage"
    }

    const response = await updateCategory(category.id, formData);
    setLoading(false);

    if (response.success) {
      onCategoryUpdated(true, "Category updated successfully");
      onHide();
    } else {
      onCategoryUpdated(false, response.message || "Failed to update category");
    }
  };

  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>Edit Category</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form.Group>
          <Form.Label htmlFor="categoryName">Category Name</Form.Label>
          <Form.Control
            id="categoryName"
            type="text"
            value={categoryName}
            onChange={(e) => setCategoryName(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mt-3">
          <Form.Label htmlFor="categoryImage">Change Image (optional)</Form.Label>
          <Form.Control
            id="categoryImage"
            type="file"
            onChange={handleImageChange}
            accept="image/*"
          />
        </Form.Group>

        {previewImage && (
          <div className="mt-3 text-center">
            <p>Image Preview:</p>
            <Image
              src={previewImage}
              alt="Category preview"
              thumbnail
              style={{ maxHeight: "150px" }}
            />
          </div>
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="success" onClick={handleUpdate} disabled={loading}>
          {loading ? "Updating..." : "Update"}
        </Button>
        <Button variant="secondary" onClick={onHide} disabled={loading}>
          Cancel
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default EditCategory;
