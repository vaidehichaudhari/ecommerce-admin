import React, { useEffect, useState } from "react";
import { Button, Modal, Form, Image } from "react-bootstrap";
import { updateProduct } from "../../API/api";

function EditProduct({
  show,
  onHide,
  product,
  onProductUpdated,
  brands = [],
  categories = [],
}) {
  const [productName, setProductName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState("");
  const [inStock, setInStock] = useState(true);
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [brandId, setBrandId] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [loading, setLoading] = useState(false);

  // When modal opens or product changes, fill fields
  useEffect(() => {
    if (product) {
      setProductName(product.name || "");
      setPrice(product.price || "");
      setDescription(product.description || "");
      setQuantity(product.quantity || "");
      setInStock(product.inStock ?? true);
      setBrandId(product.brandId || "");
      setCategoryId(product.categoryId || "");
      setImage(null);
      setImagePreview(product.image || null);
    }
  }, [product, show]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleUpdateProduct = async () => {
    if (
      !productName.trim() ||
      !price ||
      !description.trim() ||
      !quantity ||
      brandId === "" ||
      categoryId === ""
    ) {
      alert("Please fill out all fields.");
      return;
    }

    setLoading(true);
    const formData = new FormData();
    formData.append("name", productName.trim());
    formData.append("price", price);
    formData.append("description", description.trim());
    formData.append("quantity", quantity);
    formData.append("inStock", inStock);
    formData.append("brandId", brandId);
    formData.append("categoryId", categoryId);
    if (image) formData.append("image", image);

    const response = await updateProduct(product.id, formData);
    setLoading(false);

    if (response.success) {
      onProductUpdated(true, "Product updated successfully!");
      onHide();
    } else {
      onProductUpdated(false, response.message || "Failed to update product.");
    }
  };

  return (
    <Modal show={show} onHide={onHide} size="lg" centered>
      <Modal.Header closeButton>
        <Modal.Title>Edit Product</Modal.Title>
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
          <Form.Select
            value={categoryId}
            onChange={(e) => setCategoryId(e.target.value)}
          >
            <option value="">-- Select Category --</option>
            {(categories || []).map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.name}
              </option>
            ))}
          </Form.Select>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Product Image</Form.Label>
          <Form.Control type="file" accept="image/*" onChange={handleImageChange} />
          {imagePreview && (
            <div className="mt-2">
              <Image
                src={imagePreview}
                alt="Preview"
                thumbnail
                width={120}
                height={80}
                style={{ objectFit: "cover" }}
              />
            </div>
          )}
        </Form.Group>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="primary" onClick={handleUpdateProduct} disabled={loading}>
          {loading ? "Updating..." : "Update"}
        </Button>
        <Button variant="secondary" onClick={onHide} disabled={loading}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default EditProduct;
