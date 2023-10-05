import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { BsPlusLg } from "react-icons/bs";
import { FaTrashAlt } from "react-icons/fa";
import { useCart } from "../../context";
import { Rating } from "./Rating";


export const ProductCard = ({product}) => {
  const {id, name, overview, image_local, price, rating, best_seller, in_stock} = product;
  const { addToCart, removeFromCart, cartList } = useCart();
  const [productInCart, setProductInCart] = useState(false);

  useEffect(() => {
    const productExists = cartList.find(item => item.id === product.id);
    productExists ? setProductInCart(true) : setProductInCart(false);
  }, [cartList, product.id]);

  return (
    <div className="m-3 max-w-sm bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700">
        <Link to={`/products/${id}`} className="relative" >
            { best_seller && <span className="absolute top-4 left-2 px-2 bg-orange-500 bg-opacity-90 text-white rounded">Best Seller</span> }
            <img className="rounded-t-lg w-full h-64" src={image_local} alt={name} />
        </Link>
        <div className="p-5">
          <Link to={`/products/${id}`}>
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{name}</h5>
          </Link>
          <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">{overview}</p>
            
          <div className="flex items-center my-2">
            <Rating rating={rating}/>
          </div>

          <p className="flex justify-between items-center">
            <span className="text-2xl dark:text-gray-200">
              <span>$</span><span>{price}</span>
            </span>
            {!productInCart &&  <button onClick={() => addToCart(product)} className={`inline-flex items-center py-2 px-3 text-sm font-medium text-center text-white ${product.in_stock ?  "bg-blue-700 rounded-lg hover:bg-blue-800" :  "bg-slate-700 rounded-lg cursor-not-allowed" }`} disabled={in_stock ? "" : "disabled"} >Add To Cart <BsPlusLg className="ml-1" /></button>}
           
            {productInCart && <button onClick={() => removeFromCart(product)} className={`inline-flex items-center py-2 px-3 text-sm font-medium text-center text-white ${product.in_stock ?  "bg-red-700 rounded-lg hover:bg-red-800" :  "bg-slate-700 rounded-lg cursor-not-allowed" }`} disabled={in_stock ? "" : "disabled"}>Remove <FaTrashAlt className="ml-1" /></button> }
          </p>
        </div>
    </div>
  )
}
