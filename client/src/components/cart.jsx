import { useEffect, useState } from "react";
import { useUser } from "@clerk/clerk-react";
import { MdDelete } from "react-icons/md";

function Cart() {
    const { user } = useUser();
    const [cart, setCart] = useState(null);

    useEffect(() => {
        const fetchCart = async () => {
            if (!user) return;
            const res = await fetch(`http://localhost:5000/api/cart/${user.id}`);
            const data = await res.json();
            setCart(data);
        };
        fetchCart();
    }, [user]);

    const updateQuantity = async (productId, quantity) => {
        await fetch(`http://localhost:5000/api/cart/${user.id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ productId, quantity }),
        });
        const res = await fetch(`http://localhost:5000/api/cart/${user.id}`);
        const updated = await res.json();
        setCart(updated);
    };

    const removeFromCart = async (productId) => {
        await fetch(`http://localhost:5000/api/cart/${user.id}/remove`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ productId }),
        });

        
        const res = await fetch(`http://localhost:5000/api/cart/${user.id}`);
        const updated = await res.json();
        setCart(updated);
        
    };

    if (!cart) return <p className="text-white text-center mt-10">Loading cart...</p>;
    
    const total = cart.products.reduce((acc, item) => acc + item.price * item.quantity, 0);

    return (
        <div className="text-white p-10">
            <h1 className="text-2xl mb-6">Your Cart</h1>
            {cart.products.map((item, idx) => (
                <div key={idx} className="flex justify-between items-center bg-gray-800 p-4 rounded mb-4">
                    <span>{item.name}</span>
                    <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2">
                            <input
                                type="number"
                                min="1"
                                value={item.quantity}
                                onChange={(e) => updateQuantity(item._id, parseInt(e.target.value))}
                                className="w-16 text-white border-2 border-gray-700 bg-gray-800 px-2 py-1 rounded"
                            />
                            <span>${item.price * item.quantity}</span>
                        </div>
                        <button onClick={() => removeFromCart(item._id)}>
                            <span className="text-red-500 cursor-pointer text-lg hover:text-red-700"> <MdDelete /></span>
                        </button>
                    </div>
                </div>
            ))}
            <h2 className="text-xl mt-6">Total: ${total}</h2>
        </div>
    );
}

export default Cart;
