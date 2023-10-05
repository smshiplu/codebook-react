import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { ProductCard } from "../../../components";
import { getFeaturedProductList } from "../../../services";

export const FeaturedProducts = () => {
  
  const [products, setProducts] = useState([]);

  useEffect(() => {
    async function fetchFeaturedProducts() {
      try{
        const data = await getFeaturedProductList();
        setProducts(data);
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
    fetchFeaturedProducts();
  }, []);
  

  return (
    <section className="my-20">
      <h1 className="text-2xl text-center font-semibold dark:text-slate-100 mb-5 underline underline-offset-8">Featured eBooks</h1>    
      <div className="flex flex-wrap justify-center lg:flex-row">
        {products.map(product => (
          <ProductCard key={product.id} product={product}/>
        ))}
      </div>
    </section>
  )
}
