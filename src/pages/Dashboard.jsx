import { FaTags, FaFolderOpen, FaBoxOpen } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();

  return (
    <div className="container mt-5">
      <div className="text-center mb-4">
        <h2>Admin Dashboard</h2>
        <p className="text-muted">Manage brands, categories, and products of your store</p>
      </div>

      <div className="row g-4">
        {/* Brands */}
        <div className="col-md-4">
          <div className="card text-center shadow-sm p-4 h-100">
            <FaTags size={40} className="mb-3 text-primary" />
            <h5 className="mb-2">Brands</h5>
            <p>Add, edit or delete product brands.</p>
            <button
              className="btn btn-outline-primary btn-sm"
              onClick={() => navigate("/brand")}
            >
              Manage Brands
            </button>
          </div>
        </div>

        {/* Categories */}
        <div className="col-md-4">
          <div className="card text-center shadow-sm p-4 h-100">
            <FaFolderOpen size={40} className="mb-3 text-success" />
            <h5 className="mb-2">Categories</h5>
            <p>Create and organize product categories.</p>
            <button
              className="btn btn-outline-success btn-sm"
              onClick={() => navigate("/category")}
            >
              Manage Categories
            </button>
          </div>
        </div>

        {/* Products */}
        <div className="col-md-4">
          <div className="card text-center shadow-sm p-4 h-100">
            <FaBoxOpen size={40} className="mb-3 text-warning" />
            <h5 className="mb-2">Products</h5>
            <p>Add, update, or remove products</p>
            <button
              className="btn btn-outline-warning btn-sm"
              onClick={() => navigate("/product")}
            >
              Manage Products
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
