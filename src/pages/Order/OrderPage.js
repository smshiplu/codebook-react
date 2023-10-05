import { useLocation } from "react-router-dom";
import { useDocTitle } from "../../hooks/useDocTitle"; 
import { OrderSuccess } from "./components/OrderSuccess";
import { OrderFailed } from "./components/OrderFailed";

export const OrderPage = () => {
  useDocTitle("Order Summary");
  const {state} = useLocation();

  return (
    <main>
      {state && state.status ? <OrderSuccess data={state.data} /> : <OrderFailed />}
    </main>
  )
}
