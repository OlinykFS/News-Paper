import React from "react";
import { AuthContext } from "../../Context/AuthContext";
import { Navigate,} from "react-router-dom";
const ProtectedRoute = ({ element }) => {
   const { isAuthenticated, loading } = React.useContext(AuthContext);
   if (loading) {
     return <div className="text-center mt-4">Loading...</div>;
   }
   return isAuthenticated ? element : <Navigate to="/login" replace />;
 };

 export default ProtectedRoute;