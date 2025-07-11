import React, { useEffect, useState } from "react";
import { Button, Modal, Form, Image } from "react-bootstrap";
import { updateBrand } from "../../API/api";

function EditBrand({ show, onHide, brand, onBrandUpdated }) {
  const [brandName, setBrandName] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [loading, setLoading] = useState(false); // loading state

  // Set brand data when modal opens
  useEffect(() => {
    if (brand) {
      setBrandName(brand.name || "");
      setImageFile(null);
      setPreviewImage(brand.image || null);
    }
  }, [brand]);

  // Reset state when modal closes
  useEffect(() => {
    if (!show) {
      setBrandName("");
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
    if (!brandName.trim()) {
      onBrandUpdated(false, "Brand name cannot be empty");
      return;
    }

    setLoading(true);

    const formData = new FormData();
    formData.append("name", brandName.trim());

    if (imageFile) {
      formData.append("brandimage", imageFile); // Make sure backend accepts this key
    }

    const response = await updateBrand(brand.id, formData);
    setLoading(false);

    if (response.success) {
      onBrandUpdated(true, "Brand updated successfully");
      onHide();
    } else {
      onBrandUpdated(false, response.message || "Failed to update brand");
    }
  };

  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>Edit Brand</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form.Group>
          <Form.Label htmlFor="brandName">Brand Name</Form.Label>
          <Form.Control
            id="brandName"
            type="text"
            value={brandName}
            onChange={(e) => setBrandName(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mt-3">
          <Form.Label htmlFor="brandImage">Change Image (optional)</Form.Label>
          <Form.Control
            id="brandImage"
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
              alt="Brand preview"
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

export default EditBrand;
