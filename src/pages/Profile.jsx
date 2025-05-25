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
  console.log(loggedUser);
  return (
    <div>
      <h2 className="mb-3">Profile</h2>
      <p>This is your profile info.</p>
      {loggedUser && <div>

         <p>{loggedUser.name}</p>
         <p>{loggedUser.email}</p>
         </div>}
    </div>
  );
};

export default Profile;