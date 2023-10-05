import { useEffect, useState } from "react";
export const useCheckToken = () => {

  const token = JSON.parse(sessionStorage.getItem("token"));
  const [isTokenExpired, setIsTokenExpired] = useState(false);

  useEffect(() => {
    if(token) {
      const decodedJwt = JSON.parse(atob(token.split(".")[1]));
      if(decodedJwt.exp * 1000 < Date.now()) {
        setIsTokenExpired(true);
      } else {
        setIsTokenExpired(false);
      }
    } else {
      setIsTokenExpired(true);
    }
  }, [isTokenExpired, token]);

  return isTokenExpired;
}
