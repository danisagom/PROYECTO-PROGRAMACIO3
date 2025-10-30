import { Navigate } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../../context/UserContext";

const Protected = ({ children, roles }) => {
  const { user } = useContext(UserContext);

  if (!user) return <Navigate to="/login" />;

  if (roles && !roles.includes(user.role))
    return <Navigate to="/unauthorized" />;

  return children;
};

export default Protected;
