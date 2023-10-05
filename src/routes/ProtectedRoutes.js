import { Navigate } from "react-router-dom";
import { useCheckToken } from "../hooks/useCheckToken";
export const ProtectedRoutes = ({children}) => {

  const token = useCheckToken();
 
  return !token ? children : <Navigate to={"/login"}/>
}
