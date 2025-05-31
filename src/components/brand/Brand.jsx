import React, { useEffect, useState } from "react";
import { Badge, Table, Card, InputGroup, FormControl, Button, OverlayTrigger, Tooltip } from "react-bootstrap";
import AddBrand from "./AddBrand";
import { getAllBrands } from "../../API/api";
import DeleteBrand from "./DeleteBrand";
import EditBrand from "./EditBrand";
import { FaSearch, FaEdit, FaTrash } from "react-icons/fa";

const Brand = () => {
  const [brands, setBrands] = useState([]);
  const [filteredBrands, setFilteredBrands] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [addBrandModalShow, setAddBrandModalShow] = useState(false);
  const [deleteModalShow, setDeleteModalShow] = useState(false);
  const [selectedBrandId, setSelectedBrandId] = useState(null);
  const [alert, setAlert] = useState({ show: false, variant: '', message: '' });
  const [editModalShow, setEditModalShow] = useState(false);
  const [selectedBrand, setSelectedBrand] = useState(null);

  const fetchData = async () => {
    const response = await getAllBrands();
    if (response.success) {
      setBrands(response.brands);
      setFilteredBrands(response.brands);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (!searchTerm.trim()) {
      setFilteredBrands(brands);
    } else {
      const filtered = brands.filter(brand =>
        brand.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredBrands(filtered);
    }
  }, [searchTerm, brands]);

  const showAlert = (variant, message) => {
    setAlert({ show: true, variant, message });
    setTimeout(() => {
      setAlert({ show: false, variant: '', message: '' });
    }, 3000);
  };

  const handleBrandUpdate = (success, message) => {
    showAlert(success ? 'success' : 'danger', message);
    if (success) {
      fetchData();
    }
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
        <Card className="p-4 shadow-sm">
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h2 className="mb-0">Brands</h2>
            <Button variant="primary" onClick={() => setAddBrandModalShow(true)}>Add Brand</Button>
          </div>

          <div className="d-flex justify-content-between align-items-center mb-3">
            <h6>
              Total Brands <Badge bg="dark">{filteredBrands.length}</Badge>
            </h6>

            <InputGroup className="w-50">
              <InputGroup.Text><FaSearch /></InputGroup.Text>
              <FormControl
                placeholder="Search brands..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </InputGroup>
          </div>

          <Table responsive bordered hover className="align-middle text-center">
            <thead className="table-dark">
              <tr>
                <th>#</th>
                <th>Brand Name</th>
                <th>Image</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {
                filteredBrands.length > 0 ? (
                  filteredBrands.map((brand, index) => (
                    <tr key={brand.id}>
                      <td>{index + 1}</td>
                      <td>{brand.name}</td>
                      <td>
                        {brand.image ? (
                          <img
                            src={brand.image}
                            alt={brand.name}
                            width="100"
                            height="80"
                            className="rounded border"
                          />
                        ) : (
                          <span className="text-muted">No Image</span>
                        )}
                      </td>
                      <td>
                        <OverlayTrigger overlay={<Tooltip>Edit Brand</Tooltip>}>
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

                        <OverlayTrigger overlay={<Tooltip>Delete Brand</Tooltip>}>
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
                    <td colSpan="4" className="text-center text-muted">
                      No brands available.
                    </td>
                  </tr>
                )
              }
            </tbody>
          </Table>
        </Card>
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
