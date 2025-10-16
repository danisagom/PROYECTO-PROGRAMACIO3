import React, { useContext } from "react"; 
import { UserContext } from "../../context/UserContext.jsx";

import UserDashboard from "../roles/alumno/UserDashboard.jsx";
import TrainerDashboard from "../roles/Profesores/TrainerDashboard.jsx";
import AdminDashboard from "../roles/Administrativo/AdminDashboard.jsx";


const Dashboard = () => {
  const { user } = useContext(UserContext);

  if (!user || !user.role) {
    return <p>No estás logueado</p>;
  }

  return (
    <div>
      {user.role === "user" && <UserDashboard />}
      {user.role === "trainer" && <TrainerDashboard />}
      {user.role === "admin" && <AdminDashboard />}
    </div>
  );
};

export default Dashboard;
