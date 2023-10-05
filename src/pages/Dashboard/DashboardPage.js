import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useDocTitle } from "../../hooks/useDocTitle";
import { DashboardCard } from "./components/DashboardCard";
import { DashboardEmpty } from "./components/DashboardEmpty";
import { getUserOrders } from "../../services";

export const DashboardPage = () => {
  useDocTitle("Dashboard");
  const [orders, setOrders] = useState([]);
  
  useEffect(() => {
    async function getOrder() {
      try {
        const data = await getUserOrders();
        setOrders(data);
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
        });
      }
    }
    getOrder();
  }, []);

  return (
    <main>
      <section>
        <p className="text-2xl text-center font-semibold dark:text-slate-100 my-10 underline underline-offset-8">My Dashboard</p>
      </section>
      
      <section>
        {orders.length > 0 && orders.map(order => (
          <DashboardCard key={order.id} order={order} />
        ))}
      </section>
      <section>
        {!orders.length && <DashboardEmpty/> }
      </section>
    </main>
  )
}
