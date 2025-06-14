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
import AddBrand from "./AddBrand";
import EditBrand from "./EditBrand";
import DeleteBrand from "./DeleteBrand";
import { getAllBrands } from "../../API/api";
import { FaSearch, FaEdit, FaTrash } from "react-icons/fa";

const Brand = () => {
  const [brands, setBrands] = useState([]);
  const [filteredBrands, setFilteredBrands] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [addBrandModalShow, setAddBrandModalShow] = useState(false);
  const [editModalShow, setEditModalShow] = useState(false);
  const [deleteModalShow, setDeleteModalShow] = useState(false);
  const [selectedBrandId, setSelectedBrandId] = useState(null);
  const [selectedBrand, setSelectedBrand] = useState(null);
  const [alert, setAlert] = useState({ show: false, variant: '', message: '' });
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    setLoading(true);
    const response = await getAllBrands();
    if (response.success) {
      setBrands(response.brands);
      setFilteredBrands(response.brands);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    const term = searchTerm.trim().toLowerCase();
    if (!term) {
      setFilteredBrands(brands);
    } else {
      const filtered = brands.filter((b) =>
        b.name.toLowerCase().includes(term)
      );
      setFilteredBrands(filtered);
    }
  }, [searchTerm, brands]);

  const showAlert = (variant, message) => {
    setAlert({ show: true, variant, message });
    setTimeout(() => setAlert({ show: false, variant: '', message: '' }), 3000);
  };

  const handleBrandUpdate = (success, message) => {
    showAlert(success ? 'success' : 'danger', message);
    if (success) fetchData();
  };

  return (
    <>
      {/* Alert */}
      {alert.show && (
        <div className={`alert alert-${alert.variant} alert-dismissible fade show`} role="alert">
          {alert.message}
          <button type="button" className="btn-close" onClick={() => setAlert({ show: false })}></button>
        </div>
      )}

      <div className="container py-4">
        {/* Page Header */}
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h2 className="mb-0">Brands</h2>
          <Button variant="primary" onClick={() => setAddBrandModalShow(true)}>
            + Add Brand
          </Button>
        </div>

        {/* Search + Count */}
        <div className="d-flex justify-content-between align-items-center mb-3 flex-wrap gap-2">
          <h6 className="mb-0">
            Total Brands <Badge bg="dark">{filteredBrands.length}</Badge>
          </h6>

          <InputGroup style={{ maxWidth: "300px" }}>
            <InputGroup.Text><FaSearch /></InputGroup.Text>
            <FormControl
              placeholder="Search brands..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </InputGroup>
        </div>

        {/* Table */}
        {loading ? (
          <div className="text-center my-5">
            <Spinner animation="border" variant="primary" />
            <p className="mt-2 text-muted">Loading brands...</p>
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
                <th style={{ width: '60%', textAlign: 'left' }}>Brand Name</th>
                <th style={{ width: '25%' }}>Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredBrands.length > 0 ? (
                filteredBrands.map((brand, index) => (
                  <tr key={brand.id}>
                    <td>{index + 1}</td>
                    <td>
                      {brand.image ? (
                        <img
                          src={brand.image}
                          alt={brand.name}
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
                    <td style={{ textAlign: 'left' }}>{brand.name}</td>
                    <td>
                      <OverlayTrigger placement="top" overlay={<Tooltip>Edit</Tooltip>}>
                        <Button
                          size="sm"
                          variant="warning"
                          className="me-2"
                          onClick={() => {
                            setSelectedBrand(brand);
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
                            setSelectedBrandId(brand.id);
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
                    No brands found.
                  </td>
                </tr>
              )}
            </tbody>
          </Table>
        )}
      </div>

      {/* Modals */}
      <AddBrand
        show={addBrandModalShow}
        onHide={() => setAddBrandModalShow(false)}
        onBrandAdded={fetchData}
      />

      <EditBrand
        show={editModalShow}
        onHide={() => setEditModalShow(false)}
        brand={selectedBrand}
        onBrandUpdated={handleBrandUpdate}
      />

      <DeleteBrand
        show={deleteModalShow}
        onHide={() => setDeleteModalShow(false)}
        brandId={selectedBrandId}
        onBrandDelete={fetchData}
      />
    </>
  );
};

export default Brand;
