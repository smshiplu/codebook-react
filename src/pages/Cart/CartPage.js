import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useDocTitle } from "../../hooks/useDocTitle";
import { CartEmpty } from "./components/CartEmpty";
import { CartList } from "./components/CartList";
import { getUser } from "../../services";
import { useCart } from "../../context";


export const CartPage = () => {
  
  const {cartList} = useCart();
  useDocTitle(`Cart(${cartList.length})`);
  const token = JSON.parse(sessionStorage.getItem("token"));
  const cbid = JSON.parse(sessionStorage.getItem("cbid"));

  const navigate = useNavigate();
  const [isTokenExpired, setIsTokenExpired] = useState(false);
  
  useEffect(() => {
    async function fetchUser() {
      try {
        const data = await getUser();
        if(token && data.id === cbid) {
          setIsTokenExpired(false);
        } else {
          setIsTokenExpired(true);
        }
      } catch(error) {
        toast.error(error.message, {
          position: "bottom-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        })
      }
    }
    fetchUser();
  }, [token, cbid]);

  return (
    <main>
      {!isTokenExpired ? (
        cartList.length ? <CartList /> :  <CartEmpty />
      ) : navigate("/login")}
    </main>
  )
}
