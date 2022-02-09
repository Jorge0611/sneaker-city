import { useState, useEffect } from "react";
import ProductList from "../../components/ProductList";
import { removeFromLocalStorage } from "../../libs/utils";

const Wishlist = () => {
  const [wishlist, setWishlist] = useState([]);

  function addToCart() {
    let cart = JSON.parse(localStorage.getItem("cart") || "[]");
    cart = cart.concat(wishlist);
    localStorage.setItem("cart", JSON.stringify(cart));
    window.alert("Everything added to the cart");
    localStorage.removeItem("wishlist");
    setWishlist([]);
  }

  useEffect(() => {
    let data = JSON.parse(localStorage.getItem("wishlist") || "[]");
    setWishlist(data);
  }, []);

  return (
    <div className="p-8">
      <div>
        <h1 className="text-4xl font-semibold">Wishlist</h1>
      </div>
      <div className="mt-8">
        <ul className="flex flex-col space-y-4">
          {wishlist.map((values, key) => (
            <ProductList
              key={key}
              brand={values.brand}
              model={values.model}
              price={values.price}
              size={values.size.size}
              image={values.image}
              onDelete={() => {
                let data = removeFromLocalStorage(
                  "wishlist",
                  values.id,
                  wishlist
                );
                setWishlist(data);
              }}
            />
          ))}
        </ul>
      </div>
      <div className="mt-6">
        <button
          className="flex w-full flex-row items-center justify-center space-x-2 rounded bg-green-600 px-8 py-2 text-white hover:bg-green-500"
          onClick={() => addToCart()}
        >
          <span className="text-lg font-semibold">Add to cart</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default Wishlist;
