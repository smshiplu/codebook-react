import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {BiCreditCard} from "react-icons/bi"; 
import {BsFillLockFill} from "react-icons/bs";
import {FaTimes} from "react-icons/fa";
import { useCart } from "../../../context";
import { createOrder, getUser } from "../../../services";

export const CartCheckout = ({setCheckout}) => {
    const { cartList, total, clearCart } = useCart();
    const [userInfo, setUserInfo] = useState({});
    const navigate = useNavigate();

    useEffect(() => {
        async function fetchData() {
            try {
                const data = await getUser();
                setUserInfo(data);
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
        fetchData();
    }, []);

    async function handleOrderSubmit(e) {
        e.preventDefault();
        try {
            const data = await createOrder(cartList, total, userInfo);
            clearCart();
            navigate("/order-summary", { state: {data: data, status: true} });
        } catch(error) {
            navigate("/order-summary", { state: {status: false} });
        }
    }

  return (
    <section>
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50"></div>
        <div id="authentication-modal" tabIndex="-1" className="mt-5 overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 w-full md:inset-0 h-modal md:h-full justify-center items-center flex" aria-modal="true" role="dialog" >
            <div className="relative p-4 w-full max-w-md h-full md:h-auto overflow-y-auto">
                <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                <button onClick={() => setCheckout(false)} type="button" className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white" data-modal-toggle="authentication-modal" >
                    <FaTimes className="w-5 h-5 inline-block" />
                    <span className="sr-only">Close modal</span>
                </button>
                <div className="py-6 px-6 lg:px-8">
                    <h3 className="mb-4 text-xl font-medium text-gray-900 dark:text-white">
                    <BiCreditCard className="mr-2 inline-block" />CARD PAYMENT
                    </h3>
                    <form onSubmit={handleOrderSubmit} className="space-y-6" >
                        <div>
                            <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Name:</label>
                            <input value={userInfo.name || "undefined"} type="text" name="name" id="name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:value-gray-400 dark:text-white"  disabled required="" />
                        </div>
                        <div>
                            <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Email:</label>
                            <input value={userInfo.email || "backup-email@gmail.com"} type="text" name="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:value-gray-400 dark:text-white" disabled required="" />
                        </div>
                        <div>
                            <label htmlFor="card" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Card Number:</label>
                            <input type="number" name="card" id="card" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:value-gray-400 dark:text-white" value="4215625462597845" disabled required="" />
                        </div>
                        <div className="">
                            <label htmlFor="code" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Expiry Date:</label>
                            <input type="number" name="month" id="month" className="inline-block w-20 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:value-gray-400 dark:text-white" value="03" disabled required="" />
                            <input type="number" name="year" id="year" className="inline-block w-20 ml-3 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:value-gray-400 dark:text-white" value="27" disabled required="" />
                        </div>
                        <div>
                            <label htmlFor="code" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300" >Security Code:</label>
                            <input type="number" name="code" id="code" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:value-gray-400 dark:text-white" value="523" disabled required="" />
                        </div>
                        <p className="mb-4 text-2xl font-semibold text-lime-500 text-center">
                          ${total}
                        </p>
                        <button type="submit" className="w-full text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700" >
                          <BsFillLockFill className="mr-2 inline-block"/>PAY NOW
                        </button>
                    </form>
                </div>
                </div>
            </div>
        </div>
    </section>
  )
}
