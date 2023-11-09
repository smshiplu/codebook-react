import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";

export const useCheckToken = () => {
  
  const token = JSON.parse(sessionStorage.getItem("token"));
  const cbid = JSON.parse(sessionStorage.getItem("cbid"));
  const [isTokenExpired, setIsTokenExpired] = useState(false);

  useEffect(() => {
    if(token) {
      const decodedJwt = jwtDecode(token);
      
      if(decodedJwt.exp * 1000 < new Date().getTime()) {
        setIsTokenExpired(true);
        sessionStorage.removeItem("token");
        sessionStorage.removeItem("cbid");
      } else {
        cbid === parseInt(decodedJwt.sub) ? setIsTokenExpired(false) : setIsTokenExpired(true);
      }

    } else {
      
      setIsTokenExpired(true);
      sessionStorage.removeItem("token");
      sessionStorage.removeItem("cbid");
    }
  }, [isTokenExpired, token, cbid]);

  return isTokenExpired;
}
