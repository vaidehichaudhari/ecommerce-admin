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
import AddCategory from "./AddCategory";
import EditCategory from "./EditCategory";
import DeleteCategory from "./DeleteCategory";
import { getAllCategories } from "../../API/api";
import { FaSearch, FaEdit, FaTrash } from "react-icons/fa";

const Category = () => {
  const [categories, setCategories] = useState([]);
  const [filteredCategories, setFilteredCategories] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [addModalShow, setAddModalShow] = useState(false);
  const [editModalShow, setEditModalShow] = useState(false);
  const [deleteModalShow, setDeleteModalShow] = useState(false);
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [alert, setAlert] = useState({ show: false, variant: '', message: '' });
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    setLoading(true);
    const response = await getAllCategories();
    if (response.success) {
      setCategories(response.categories);
      setFilteredCategories(response.categories);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    const term = searchTerm.trim().toLowerCase();
    if (!term) {
      setFilteredCategories(categories);
    } else {
      const filtered = categories.filter((c) =>
        c.name.toLowerCase().includes(term)
      );
      setFilteredCategories(filtered);
    }
  }, [searchTerm, categories]);

  const showAlert = (variant, message) => {
    setAlert({ show: true, variant, message });
    setTimeout(() => setAlert({ show: false, variant: '', message: '' }), 3000);
  };

  const handleCategoryUpdate = (success, message) => {
    showAlert(success ? 'success' : 'danger', message);
    if (success) fetchData();
  };

  return (
    <>
      {alert.show && (
        <div className={`alert alert-${alert.variant} alert-dismissible fade show`} role="alert">
          {alert.message}
          <button type="button" className="btn-close" onClick={() => setAlert({ show: false })}></button>
        </div>
      )}

      <div className="container py-4">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h2 className="mb-0">Categories</h2>
          <Button variant="primary" onClick={() => setAddModalShow(true)}>
            + Add Category
          </Button>
        </div>

        <div className="d-flex justify-content-between align-items-center mb-3 flex-wrap gap-2">
          <h6 className="mb-0">
            Total Categories <Badge bg="dark">{filteredCategories.length}</Badge>
          </h6>

          <InputGroup style={{ maxWidth: "300px" }}>
            <InputGroup.Text><FaSearch /></InputGroup.Text>
            <FormControl
              placeholder="Search categories..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </InputGroup>
        </div>

        {loading ? (
          <div className="text-center my-5">
            <Spinner animation="border" variant="primary" />
            <p className="mt-2 text-muted">Loading categories...</p>
          </div>
        ) : (
          <Table
            responsive
            bordered
            hover
            size="sm"
            className="align-middle text-center"
            style={{ fontSize: '0.875rem' }}
          >
            <thead className="table-secondary">
              <tr>
                <th style={{ width: '5%' }}>#</th>
                <th style={{ width: '10%' }}>Image</th>
                <th style={{ width: '60%', textAlign: 'left' }}>Category Name</th>
                <th style={{ width: '25%' }}>Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredCategories.length > 0 ? (
                filteredCategories.map((category, index) => (
                  <tr key={category.id}>
                    <td>{index + 1}</td>
                    <td>
                      {category.image ? (
                        <img
                          src={category.image}
                          alt={category.name}
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
                    <td style={{ textAlign: 'left' }}>{category.name}</td>
                    <td>
                      <OverlayTrigger placement="top" overlay={<Tooltip>Edit</Tooltip>}>
                        <Button
                          size="sm"
                          variant="warning"
                          className="me-2"
                          onClick={() => {
                            setSelectedCategory(category);
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
                            setSelectedCategoryId(category.id);
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
                  <td colSpan="4" className="text-muted text-center">
                    No categories found.
                  </td>
                </tr>
              )}
            </tbody>
          </Table>
        )}
      </div>

      {/* Modals */}
      <AddCategory
        show={addModalShow}
        onHide={() => setAddModalShow(false)}
        onCategoryAdded={fetchData}
      />

      <EditCategory
        show={editModalShow}
        onHide={() => setEditModalShow(false)}
        category={selectedCategory}
        onCategoryUpdated={handleCategoryUpdate}
      />

      <DeleteCategory
        show={deleteModalShow}
        onHide={() => setDeleteModalShow(false)}
        categoryId={selectedCategoryId}
        onCategoryDelete={fetchData}
      />
    </>
  );
};

export default Category;
