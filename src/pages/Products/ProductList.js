import { useEffect, useState } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { useLocation } from "react-router-dom";
import { toast } from "react-toastify";

import { useDocTitle } from "../../hooks/useDocTitle";
import { ProductCard } from "../../components";
import { ProductFilterBar } from "./components/ProductFilterBar";

import { useFilter } from "../../context";
import { getProductList } from "../../services";


export const ProductList = () => {
  const { productList, initialProducts } = useFilter();
  useDocTitle("Explore eBook Collections");
  const [show, setShow] = useState(false);
  const search = useLocation().search;
  const searchTerm = new URLSearchParams(search).get("search");

  useEffect(() => {
    async function fetchProducts() {
      try{
        const data = await getProductList(searchTerm);
        initialProducts(data);
      } catch(error) {
        toast.error(error.message,  {
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
    fetchProducts();
  },[searchTerm]); //eslint-disable-line

  return (
    <main>
        <section className="my-5">
          <div className="my-5 flex justify-between">
            <span className="text-2xl font-semibold dark:text-slate-100 mb-5">All eBooks ({productList.length})</span>
            <span>
              <button onClick={() => setShow(!show)} id="dropdownMenuIconButton" data-dropdown-toggle="dropdownDots" className="inline-flex items-center p-2 text-sm font-medium text-center text-gray-900 bg-gray-100 rounded-lg hover:bg-gray-200 dark:text-white dark:bg-gray-600 dark:hover:bg-gray-700" type="button"> 
                <BsThreeDotsVertical className="w-6 h-6"/>
              </button>
            </span>            
          </div>    

          <div className="flex flex-wrap justify-center lg:flex-row">
            { productList.map((product) => (
              <ProductCard key={product.id} product={product} />
            )) }            
          </div>  
        </section>

        { show && <ProductFilterBar setShow={setShow} /> }

    </main> 
  )
}
