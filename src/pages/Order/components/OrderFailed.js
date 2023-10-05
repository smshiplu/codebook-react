import { Link } from "react-router-dom";
import { BsExclamationCircle, BsCart } from "react-icons/bs";
export const OrderFailed = () => {
  return (
    <section className="text-xl text-center max-w-4xl mx-auto my-10 py-5 dark:text-slate-100 border dark:border-slate-700 rounded">
      <div className="my-5">
        <BsExclamationCircle className="text-red-500 text-7xl mb-5 inline-block" />
        <p>Payment failed, please try again!</p>     
      </div>
      <div className="my-5">
        <p>Your order is not confirmed.</p>
        <p>Connect <span className="">codebook@example.com</span> for support.</p>
      </div>
      <Link to="/cart" type="button" className="text-white bg-blue-700 hover:bg-blue-800 rounded-lg text-lg px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none">Check Cart Again <BsCart className="ml-2 inline-block" /></Link>
    </section>
  )
}
