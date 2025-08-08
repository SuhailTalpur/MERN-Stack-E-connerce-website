import { useState, useEffect } from "react";
import Card from "./card";
import { ClipLoader } from "react-spinners";
import { useNavigate } from "react-router-dom";

function NewArrival() {
  const [products, setProducts] = useState([]);
  const [visibleCount, setVisibleCount] = useState(10);
  const [loading, setLoading] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false); // separate loading for Load More
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTrending = async () => {
      setLoading(true);
      try {
        const res = await fetch("http://localhost:5000/api/products?section=New Arrival");
        const data = await res.json();
        setProducts(data);
      } catch (err) {
        setProducts([]);
      }
      setLoading(false);
    };
    fetchTrending();
  }, []);

  const handleLoadMore = () => {
    setLoadingMore(true);
    setTimeout(() => {
      setVisibleCount((prev) => prev + 10);
      setLoadingMore(false);
    }, 800); // Simulated delay for better UX; remove if API supports pagination
  };

  return (
    <section className="text-gray-600 body-font">
      <div className="container px-5 py-10 mx-auto">
        <div className="lg:w-1/2 w-full mb-6 lg:mb-0">
          <h1 className="sm:text-3xl text-2xl font-medium title-font mb-2 text-white">New Arrivals</h1>
          <div className="h-1 w-20 bg-purple-500 rounded"></div>
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-40">
            <ClipLoader color="#a78bfa" size={60} />
          </div>
        ) : (
          <>
            <div className="flex flex-wrap justify-center m-4">
              {products.length > 0 ? (
                products.slice(0, visibleCount).map((product) => (
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
                    onClick={() => navigate(`/product/${product._id}`)}
                  />
                ))
              ) : (
                <p className="text-white">No New Arrivals</p>
              )}
            </div>

            {/* Load More button */}
            {visibleCount < products.length && (
              <div className="flex justify-center mt-6">
                <button
                  onClick={handleLoadMore}
                  disabled={loadingMore}
                  className="px-6 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 disabled:opacity-50 flex items-center gap-2"
                >
                  {loadingMore ? (
                    <>
                      <ClipLoader color="#fff" size={20} />
                      Loading...
                    </>
                  ) : (
                    "Load More"
                  )}
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
}

export default NewArrival;
