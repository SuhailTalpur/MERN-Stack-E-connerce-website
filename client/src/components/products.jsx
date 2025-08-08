import React, { useEffect, useState } from "react";
import Card from "./card";
import { ClipLoader } from "react-spinners";

function TrendingProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchTrending = async () => {
      setLoading(true);
      try {
        const res = await fetch("http://localhost:5000/api/products?section=Trending");
        const data = await res.json();
        setProducts(data);
      } catch (err) {
        setProducts([]);
      }
      setLoading(false);
    };
    fetchTrending();
  }, []);

  return (
    <section className="text-gray-600 body-font">
      <div className="container px-5 py-10 mx-auto">
        <div className="lg:w-1/2 w-full mb-6 lg:mb-0">
          <h1 className="sm:text-3xl text-2xl font-medium title-font mb-2 text-white">Trending</h1>
          <div className="h-1 w-20 bg-purple-500 rounded"></div>
        </div>
        {loading ? (
          <div className="flex justify-center items-center h-40">
            <ClipLoader color="#a78bfa" size={60} />
          </div>
        ) : (
          <div className="flex flex-wrap justify-center m-4">
            {products.length > 0 ? (
              products.map((product, index) => (
                <Card
                  key={product._id}
                  image={
                    product.images?.[0]
                      ? `http://localhost:5000/${product.images[0].replace(/\\/g, "/")}`
                      : ""
                  }
                  name={product.name}
                  category={product.category}
                  price={product.price}
                />
              ))
            ) : (
              <p className="text-white">No trending products found.</p>
            )}
          </div>
        )}
      </div>
    </section>
  );
}

export default TrendingProducts;