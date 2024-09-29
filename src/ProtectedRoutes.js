import { jwtDecode } from "jwt-decode";
import { Navigate } from "react-router-dom";


const ProtectedRoutes=({element:Element,allowedRole,...rest})=>{

    const getUserRole =()=>{
        const token = localStorage.getItem('token');
        const decodeToken = jwtDecode(token);
        return decodeToken.userRoles[0];
    }

    const userRole = getUserRole();

    if (allowedRole.includes(userRole)) {
        return <Element {...rest}/>
    }else{
        return <Navigate to="/unauthorized" replace/>
    }



}

export default ProtectedRoutes;