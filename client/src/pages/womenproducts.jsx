import React, { useEffect, useState } from "react";
import Card from "../components/card";
import { ClipLoader } from "react-spinners";
import { useNavigate } from "react-router-dom";

const subcategories = ["Hoodie", "T-Shirt", "Jeans", "Jackets"];

const WomenProducts = () => {
    const [products, setProducts] = useState([]);
    const [selectedSub, setSelectedSub] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchProducts = async () => {
            setLoading(true);
            try {
                let url = `http://localhost:5000/api/products?category=Women`;
                if (selectedSub) url += `&subcategory=${selectedSub}`;
                const res = await fetch(url);
                const data = await res.json();
                setProducts(data);
            } catch (err) {
                setProducts([]);
            }
            setLoading(false);
        };
        fetchProducts();
    }, [selectedSub]);

    return (
        <div>
            <div>
                <h1 className="text-3xl font-medium text-center my-10 text-white"> Women's Fashion</h1>
            </div>
            <div className="flex justify-center space-x-4 mb-8">
                {subcategories.map((sub) => (
                    <button
                        key={sub}
                        className={`rounded-full font-medium border border-purple-500 text-white hover:bg-purple-600 py-2 px-4 cursor-pointer ${selectedSub === sub ? "bg-purple-600" : ""
                            }`}
                        onClick={() => setSelectedSub(sub)}
                    >
                        {sub}
                    </button>
                ))}
            </div>
            {loading ? (
                <div className="flex justify-center items-center h-64">
                    <ClipLoader color="#a78bfa" size={60} />
                </div>
            ) : (
                <div className="flex flex-wrap justify-center">
                    {products.length > 0 ? (
                        products.map((prod) => (
                            <Card
                                key={prod._id}
                                image={
                                    prod.images?.[0]
                                        ? `http://localhost:5000/${prod.images[0].replace(/\\/g, "/")}`
                                        : ""
                                }
                                category={prod.subcategory}
                                name={prod.name}
                                price={prod.price}
                                onClick={() => navigate(`/product/${prod._id}`)}
                            />
                        ))
                    ) : (
                        <p className="text-white">No products found.</p>
                    )}
                </div>
            )}
        </div>
    );
};

export default WomenProducts;