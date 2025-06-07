import { useEffect, useState } from "react";
import { getUserInfo } from "../API/api.js";

const Profile = () => {
  const [loggedUser, setLoggedUser] = useState();

  const fetchUser = async () => {
    const response = await getUserInfo();
    setLoggedUser(response.loggedUser);
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <div className="container mt-5">
      <div className="card shadow p-4">
        <h2 className="mb-3 text-center"> Admin Profile</h2>
        
        {loggedUser ? (
          <div className="mt-4">
            <div className="mb-3">
              <strong>Name:</strong>
              <p className="form-control bg-light">{loggedUser.name}</p>
            </div>
            <div className="mb-3">
              <strong>Email:</strong>
              <p className="form-control bg-light">{loggedUser.email}</p>
            </div>
          </div>
        ) : (
          <div className="text-center mt-4">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
            <p className="mt-2">Fetching user data...</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
