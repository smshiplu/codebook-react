import { useState, useEffect } from "react";
import {useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { BsPlusLg } from "react-icons/bs";
import { FaTrashAlt } from "react-icons/fa";
import { useDocTitle } from "../hooks/useDocTitle";

import { Rating } from "../components";

import { useCart } from "../context";
import { getProduct } from "../services";

export const ProductDetails = () => {
  const { cartList, addToCart, removeFromCart } = useCart();
  const [product, setProduct] = useState({});
  const [productInCart, setProductInCart] = useState(false);
  const {id} = useParams();
  useDocTitle(product.name);

  useEffect(() => {
    const productExists = cartList.find((item => item.id === product.id));
    productExists ? setProductInCart(true) : setProductInCart(false);
  }, [cartList, product.id]);

  useEffect(() => {
    async function fetchProduct() {
     try {
      const data = await getProduct(id);
      setProduct(data);
     } catch(error) {
      toast.error(error.message, {
        position: "bottom-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light"
      });
     }
    }
    fetchProduct();
  }, [id]);
  
  return (
    <main>
      <section>
          <h1 className="mt-10 mb-5 text-4xl text-center font-bold text-gray-900 dark:text-slate-200">{product.name}</h1>
          <p className="mb-5 text-lg text-center text-gray-900 dark:text-slate-200">{product.overview}</p>
          <div className="flex flex-wrap justify-around">
            <div className="max-w-xl my-3">
              <img className="rounded" src={product.image_local} alt={product.name} />
            </div>
            <div className="max-w-xl my-3">
              <p className="text-3xl font-bold text-gray-900 dark:text-slate-200">
                <span className="mr-1">$</span>
                <span className="">{product.price}</span>
              </p>
              <p className="my-3 flex items-center"> 
                <Rating rating={product.rating} />
              </p>
              <p className="my-4 select-none">
                { product.best_seller && <span className="font-semibold text-amber-500 border bg-amber-50 rounded-lg px-3 py-1 mr-2">BEST SELLER</span> }
                { product.in_stock && <span className="font-semibold text-emerald-600	border bg-slate-100 rounded-lg px-3 py-1 mr-2">INSTOCK</span> }
                { !product.in_stock && <span className="font-semibold text-rose-700 border bg-slate-100 rounded-lg px-3 py-1 mr-2">OUT OF STOCK</span> }
                <span className="font-semibold text-blue-500 border bg-slate-100 rounded-lg px-3 py-1 mr-2">{product.size} MB</span>
              </p>
              <p className="my-3">
                {!productInCart && <button onClick={() => addToCart(product)} className={`inline-flex items-center py-2 px-5 text-lg font-medium text-center text-white rounded-lg ${product.in_stock ? " bg-blue-700 hover:bg-blue-800" : " bg-slate-700 rounded-lg cursor-not-allowed"}`} disabled={ product.in_stock ? "" : "disabled" }>Add To Cart <BsPlusLg className="ml-1" /> </button>}

                { productInCart && <button onClick={() => removeFromCart(product)} className={`inline-flex items-center py-2 px-5 text-lg font-medium text-center text-white rounded-lg ${product.in_stock ? "bg-red-600 hover:bg-red-800 " : "bg-slate-600 cursor-not-allowed"}`}  disabled={ product.in_stock ? "" : "disabled" }>Remove Item <FaTrashAlt className="ml-1"/> </button> }  
              </p>
              <p className="text-lg text-gray-900 dark:text-slate-200">
                {product.long_description}
              </p>
            </div>
          </div>
        </section>
    </main>
  )
}
