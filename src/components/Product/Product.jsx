import React, { useEffect, useState } from "react";
import {
  Badge,
  Table,
  Button,
  InputGroup,
  FormControl,
  OverlayTrigger,
  Tooltip,
  Spinner,
} from "react-bootstrap";
import AddProduct from "./AddProduct";
import EditProduct from "./EditProduct";
import DeleteProduct from "./DeleteProduct";
import { getAllProducts } from "../../API/api"; // Your API function to fetch products
import { getAllBrands } from "../../API/api"; // To fetch brands for display
import { getAllCategories } from "../../API/api"; // To fetch categories for display
import { FaSearch, FaEdit, FaTrash } from "react-icons/fa";

const Product = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [brands, setBrands] = useState([]);
  const [categories, setCategories] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [addModalShow, setAddModalShow] = useState(false);
  const [editModalShow, setEditModalShow] = useState(false);
  const [deleteModalShow, setDeleteModalShow] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedProductId, setSelectedProductId] = useState(null);
  const [alert, setAlert] = useState({ show: false, variant: "", message: "" });
  const [loading, setLoading] = useState(false);

  const fetchProducts = async () => {
    setLoading(true);
    const res = await getAllProducts();
    if (res.success) {
      setProducts(res.products);
      setFilteredProducts(res.products);
    }
    setLoading(false);
  };

  const fetchBrands = async () => {
    const res = await getAllBrands();
    if (res.success) setBrands(res.brands);
  };

  const fetchCategories = async () => {
    const res = await getAllCategories();
    if (res.success) setCategories(res.categories);
  };

  useEffect(() => {
    fetchProducts();
    fetchBrands();
    fetchCategories();
  }, []);

  useEffect(() => {
    const term = searchTerm.trim().toLowerCase();
    if (!term) {
      setFilteredProducts(products);
    } else {
      const filtered = products.filter((p) =>
        p.name.toLowerCase().includes(term) ||
        (p.description && p.description.toLowerCase().includes(term))
      );
      setFilteredProducts(filtered);
    }
  }, [searchTerm, products]);

  const showAlert = (variant, message) => {
    setAlert({ show: true, variant, message });
    setTimeout(() => setAlert({ show: false, variant: "", message: "" }), 3000);
  };

  const handleProductUpdate = (success, message) => {
    showAlert(success ? "success" : "danger", message);
    if (success) fetchProducts();
  };

  return (
    <>
      {alert.show && (
        <div
          className={`alert alert-${alert.variant} alert-dismissible fade show`}
          role="alert"
        >
          {alert.message}
          <button
            type="button"
            className="btn-close"
            onClick={() => setAlert({ show: false })}
          ></button>
        </div>
      )}

      <div className="container py-4">
        <div className="d-flex justify-content-between align-items-center mb-3 flex-wrap gap-2">
          <h2 className="mb-0">Products</h2>
          <Button variant="primary" onClick={() => setAddModalShow(true)}>
            + Add Product
          </Button>
        </div>

        <div className="d-flex justify-content-between align-items-center mb-3 flex-wrap gap-2">
          <h6 className="mb-0">
            Total Products <Badge bg="dark">{filteredProducts.length}</Badge>
          </h6>

          <InputGroup style={{ maxWidth: "300px" }}>
            <InputGroup.Text>
              <FaSearch />
            </InputGroup.Text>
            <FormControl
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </InputGroup>
        </div>

        {loading ? (
          <div className="text-center my-5">
            <Spinner animation="border" variant="primary" />
            <p className="mt-2 text-muted">Loading products...</p>
          </div>
        ) : (
          <Table
            responsive
            bordered
            hover
            size="sm"
            className="align-middle text-center"
            style={{ fontSize: "0.875rem" }}
          >
            <thead className="table-secondary">
              <tr>
                <th>#</th>
                <th>Image</th>
                <th style={{ textAlign: "left" }}>Name</th>
                <th style={{ textAlign: "left" }}>Description</th>
                <th>Price</th>
                <th style={{ textAlign: "left" }}>Brand</th>
                <th style={{ textAlign: "left" }}>Category</th>
                <th>Quantity</th>
                <th>In Stock</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredProducts.length > 0 ? (
                filteredProducts.map((product, idx) => (
                  <tr key={product.id}>
                    <td>{idx + 1}</td>
                    <td>
                      {product.image ? (
                        <img
                          src={product.image}
                          alt={product.name}
                          width="60"
                          height="40"
                          style={{
                            objectFit: "cover",
                            borderRadius: "4px",
                            border: "1px solid #ddd",
                          }}
                        />
                      ) : (
                        <span className="text-muted">No Image</span>
                      )}
                    </td>
                    <td style={{ textAlign: "left" }}>{product.name}</td>
                    <td
                      style={{
                        textAlign: "left",
                        whiteSpace: "normal",
                        maxWidth: "250px",
                        wordWrap: "break-word",
                      }}
                    >
                      {product.description || "-"}
                    </td>
                    <td>{product.price.toFixed(2)}</td>
                    <td style={{ textAlign: "left" }}>
                      {brands.find((b) => b.id === product.brandId)?.name || "N/A"}
                    </td>
                    <td style={{ textAlign: "left" }}>
                      {categories.find((c) => c.id === product.categoryId)?.name ||
                        "N/A"}
                    </td>
                    <td>{product.quantity}</td>
                    <td>{product.inStock ? "Yes" : "No"}</td>
                    <td>
                      <OverlayTrigger placement="top" overlay={<Tooltip>Edit</Tooltip>}>
                        <Button
                          size="sm"
                          variant="warning"
                          className="me-2"
                          onClick={() => {
                            setSelectedProduct(product);
                            setEditModalShow(true);
                          }}
                        >
                          <FaEdit />
                        </Button>
                      </OverlayTrigger>

                      <OverlayTrigger placement="top" overlay={<Tooltip>Delete</Tooltip>}>
                        <Button
                          size="sm"
                          variant="danger"
                          onClick={() => {
                            setSelectedProductId(product.id);
                            setDeleteModalShow(true);
                          }}
                        >
                          <FaTrash />
                        </Button>
                      </OverlayTrigger>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="10" className="text-muted text-center">
                    No products found.
                  </td>
                </tr>
              )}
            </tbody>
          </Table>
        )}
      </div>

      {/* Modals */}
      <AddProduct
        show={addModalShow}
        onHide={() => setAddModalShow(false)}
        onProductAdded={fetchProducts}
        brands={brands}
        categories={categories}
      />

      <EditProduct
        show={editModalShow}
        onHide={() => setEditModalShow(false)}
        product={selectedProduct}
        onProductUpdated={handleProductUpdate}
        brands={brands}
        categories={categories}
      />

      <DeleteProduct
        show={deleteModalShow}
        onHide={() => setDeleteModalShow(false)}
        productId={selectedProductId}
        onProductDelete={fetchProducts}
      />
    </>
  );
};

export default Product;
