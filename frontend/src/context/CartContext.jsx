// managing the cart globally using React Context API
import axios from "axios";
import React,{createContext, useEffect, useState} from "react";
import { useContext } from "react";
import { toast } from "react-toastify";
import { useAuth } from "./AuthContext";

const CartContext = createContext(); //create a global cart context
export const useCart =()=> useContext(CartContext);

export const CartProvider = ({children})=>{
    const[cartItems, setCartItems] = useState([]);
    const {user} = useAuth();
    const userId = user?._id || user?.id;

    //Add to Cart
    const addToCart = async(product)=>{

        if (!userId) {
        toast.error("Please login to add items to cart");
        return;
        }

        try{
            await axios.post("http://localhost:5000/cart/addtocart",{
                userId: userId,
                productId: product._id,
                image: product.image,
                price: product.price,
                title: product.title,
            },{
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                }
                });
            toast.success("Item added to Cart")
            console.log("item added to cart", cartItems)
            fetchCart();
        }catch(e){ console.log("Error",e.message); }    
    }


    //fetch cart  - Without fetchCart(), our frontend won’t know what’s in your cart unless we refresh the page 
    const fetchCart = async () => {

        if (!userId) {
            toast.error("Please login to add items to cart");
        return;
        }

        try {
            const res = await axios.get(`http://localhost:5000/cart/usercart/${userId}`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`
            }
            });;
            setCartItems(res.data);
        } catch (err) {
            console.error("Error fetching cart:", err.message);
        }
    };


    //remove from cart
    const removeFromCart=async(productId)=>{
      try{
           await axios.delete(`http://localhost:5000/cart/delete/${productId}`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`
            }
            });
            toast.info("Item removed from cart");
           fetchCart();
      }catch(e){
           console.log("Error removing cart", e.message);
      }
    }

    // clearCart
    const clearCart=()=>{
      try{
        // 1. clear backend cart
        axios.delete(`http://localhost:5000/cart/delete-cart-items/${userId}`,{
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`
            }
        });
                
        // 2. clear frontend cart
        setCartItems([]);
        localStorage.removeItem('cartItems');
      }catch(e){
        console.log("error",e.msg);
      }
    }
    

    useEffect(()=>{
       if(userId) {fetchCart()};
    },[userId])

return (
    <CartContext.Provider value={{addToCart, removeFromCart, cartItems, clearCart}}>
        {children}
    </CartContext.Provider>
);
};