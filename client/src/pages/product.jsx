import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useUser } from "@clerk/clerk-react";
import { toast, Toaster } from "react-hot-toast";

function Product() {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [mainImage, setMainImage] = useState("");
    const [imgLoading, setImgLoading] = useState(true);
    const [thumbLoading, setThumbLoading] = useState({});
    const { user } = useUser();

    useEffect(() => {
        const fetchProduct = async () => {
            const res = await fetch(`http://localhost:5000/api/products/${id}`);
            const data = await res.json();
            setProduct(data);
            if (data.images && data.images.length > 0) {
                const firstImage = `http://localhost:5000/${data.images[0].replace(/\\/g, "/")}`;
                setMainImage(firstImage);
            }
        };
        fetchProduct();
    }, [id]);

    useEffect(() => {
        if (!mainImage) return;
        setImgLoading(true);
        const img = new window.Image();
        img.src = mainImage;
        img.onload = () => setImgLoading(false);
        img.onerror = () => setImgLoading(false);
    }, [mainImage]);

    const handleThumbLoad = (imgUrl) => {
        setThumbLoading((prev) => ({ ...prev, [imgUrl]: false }));
    };

    const handleThumbError = (imgUrl) => {
        setThumbLoading((prev) => ({ ...prev, [imgUrl]: false }));
    };

    if (!product) {
        return (
            <div className="text-white text-center mt-10">
                <div className="w-16 h-16 bg-gray-700 rounded-full animate-pulse mx-auto" />
                <p className="mt-4">Loading product</p>
            </div>
        );
    }

    const addToCart = async () => {
        if (!user) {
            toast.error("Please log in to add to cart.", {
                position: "top-center",
            });
            return;
        }
        const res = await fetch(`http://localhost:5000/api/cart/add`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                userId: user.id,
                product: {
                    _id: product._id,
                    name: product.name,
                    price: product.price,
                },
            }),
        });

        const data = await res.json();
        if (res.ok) {
            toast.success('Product Added To Cart', {
                position: "top-center",
                style: {
                    padding: '10px',
                    color: '#0a0a0a',
                    borderRadius: '50px',
                    background: '#f2f2f2',
                },
                iconTheme: {
                    primary: '#5cb85c',
                    secondary: '#FFFAEE',
                },
            });
        } else {
            toast.error(data.message || "Error adding to cart");
        }
    };

    return (
        <section className="text-gray-400 bg-gray-900 body-font overflow-hidden">
            <Toaster position="top-right" />
            <div className="container px-5 py-24 mx-auto">
                <div className="lg:w-4/5 mx-auto flex flex-wrap">

                    <div className="lg:w-1/2 w-full flex flex-col">

                        <div className="relative w-full lg:h-auto h-84 flex items-center justify-center mb-4 bg-gray-800 rounded">
                            {imgLoading && (
                                <div className="absolute inset-0 bg-gray-700 rounded animate-pulse" />
                            )}
                            <img
                                key={mainImage}
                                alt={product.name}
                                className={`w-full h-84 object-cover object-center rounded transition-opacity duration-200 ${imgLoading ? "opacity-0" : "opacity-100"}`}
                                src={mainImage}
                                draggable={false}
                            />
                        </div>

                        <div className="flex space-x-2 mt-2">
                            {product.images && product.images.map((img, idx) => {
                                const imgUrl = `http://localhost:5000/${img.replace(/\\/g, "/")}`;
                                const isThumbLoading = thumbLoading[imgUrl] !== false;

                                return (
                                    <div key={idx} className="relative w-20 h-20">
                                        {isThumbLoading && (
                                            <div className="absolute inset-0 bg-gray-700 rounded animate-pulse z-10" />
                                        )}
                                        <img
                                            src={imgUrl}
                                            alt={`thumb-${idx}`}
                                            className={`w-full h-full object-cover rounded cursor-pointer border-2 transition-opacity duration-300 ${mainImage === imgUrl ? "border-purple-500" : "border-transparent"} ${isThumbLoading ? "opacity-0" : "opacity-100"}`}
                                            onClick={() => setMainImage(imgUrl)}
                                            onLoad={() => handleThumbLoad(imgUrl)}
                                            onError={() => handleThumbError(imgUrl)}
                                            draggable={false}
                                        />
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
                        <h2 className="text-sm title-font text-gray-500 tracking-widest">{product.category}</h2>
                        <h1 className="text-white text-3xl title-font font-medium mb-10 ">{product.name}</h1>
                        <p className="leading-relaxed">{product.description}</p>
                        <div className="flex mt-6 items-center pb-5 border-b-2 border-gray-800 mb-5">
                            <div className="flex ml-6 items-center">
                                <span className="mr-3">Size</span>
                                <div className="relative">
                                    <select className="rounded border border-gray-700 focus:ring-2 focus:ring-purple-900 bg-transparent appearance-none py-2 focus:outline-none focus:border-purple-500 pl-3 pr-10">
                                        {Array.isArray(product.size) && product.size.map((sz) => (
                                            <option className="bg-gray-500 text-white" key={sz}>{sz}</option>
                                        ))}
                                    </select>
                                    <span className="absolute right-0 top-0 h-full w-10 text-center text-gray-600 pointer-events-none flex items-center justify-center">
                                        <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-4 h-4" viewBox="0 0 24 24">
                                            <path d="M6 9l6 6 6-6"></path>
                                        </svg>
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div className="flex">
                            <span className="title-font font-medium text-2xl text-white">${product.price}</span>
                            <button
                                className="flex ml-auto text-white bg-purple-500 border-0 py-2 px-6 focus:outline-none hover:bg-purple-600 rounded cursor-pointer"
                                onClick={addToCart}
                            >
                                Add to Cart
                            </button>
                            <button className="rounded-full w-10 h-10 bg-gray-800 p-0 border-0 inline-flex items-center justify-center text-gray-500 ml-4 cursor-pointer hover:text-red-500">
                                <svg fill="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-5 h-5" viewBox="0 0 24 24">
                                    <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"></path>
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Product;