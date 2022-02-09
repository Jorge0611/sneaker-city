import { useState, useEffect } from "react";
import { fetcher, groupBy, removeFromLocalStorage } from "../../libs/utils";
import ProductList from "../../components/ProductList";

const MyCart = () => {
  const [cart, setCart] = useState([]);
  const [payment, showPayment] = useState(false);
  const [price, setPrice] = useState(0);

  useEffect(() => {
    let data = JSON.parse(localStorage.getItem("cart") || "[]");
    setCart(data);
  }, []);

  /**
   * Buys every item in the cart, while reducing its quantity on the database
   */
  function buyCart() {
    for (const [key, value] of Object.entries(groupBy(cart))) {
      const apiUrl = `/api/sizes/${key}`;
      fetcher(apiUrl).then((res) => {
        fetch(apiUrl, {
          method: "PATCH",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            "Cache-Control": "no-cache",
          },
          body: JSON.stringify({
            qty: (res.qty -= value.length),
          }),
        }).then((r) => r.json());
      });
    }
    window.alert("Purchase processed successfully");
    localStorage.removeItem("cart");
    setCart([]);
    showPayment(false);
  }

  /**
   * Calculate the total payment amount necessary to buy the whole cart
   * @returns {number}
   */
  function totalPayment() {
    let total = 0;
    for (const values of Object.values(groupBy(cart))) {
      for (let item of values) {
        total += item.price;
      }
    }
    return total;
  }

  return (
    <div className="p-8">
      <div>
        <h1 className="text-4xl font-semibold">My Cart</h1>
      </div>
      <div className="mt-8">
        <ul className="flex flex-col space-y-4">
          {cart.map((values, key) => (
            <ProductList
              key={key}
              id={values.id}
              brand={values.brand}
              model={values.model}
              price={values.price}
              size={values.size.size}
              image={values.image}
              onDelete={() => {
                let data = removeFromLocalStorage("cart", values.id, cart);
                setCart(data);
              }}
            />
          ))}
        </ul>
      </div>
      <div className="mt-6">
        <button
          className="flex w-full flex-row items-center justify-center space-x-2 rounded bg-green-600 px-8 py-2 text-white hover:bg-green-500"
          onClick={() => {
            showPayment(true);
            setPrice(totalPayment());
          }}
        >
          <span className="text-lg font-semibold">Buy </span>
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
      {payment && (
        <PaymentScreen
          price={price}
          onPurchase={() => buyCart()}
          onCancel={() => showPayment(false)}
        />
      )}
    </div>
  );
};

const PaymentScreen = ({ price, onPurchase, onCancel }) => {
  return (
    <div className="fixed top-0 left-0 flex min-h-screen w-full justify-center bg-neutral-800/95 p-8 md:p-32">
      <div className="h-min w-full rounded bg-white p-8">
        <div>
          <h1 className="text-4xl font-semibold">Payment</h1>
        </div>
        <div>
          <h1 className="text-xl font-semibold">Total: ${price}</h1>
        </div>
        <form onSubmit={onPurchase}>
          <div className="mt-8 flex flex-col space-y-8">
            <div className="flex flex-col">
              <label>Full Name</label>
              <input
                type="text"
                className="rounded border border-neutral-300 p-1"
              />
            </div>
            <div className="flex flex-col">
              <label>Address</label>
              <input
                type="text"
                className="rounded border border-neutral-300 p-1"
                required
              />
            </div>
            <div className="flex flex-col">
              <label>Credit Card Number</label>
              <input
                type="text"
                className="rounded border border-neutral-300 p-1"
                required
              />
            </div>
          </div>
          <div className="m mt-8 flex justify-end">
            <button
              onClick={onCancel}
              className="mr-2 rounded bg-red-600 px-8 py-2 font-semibold text-white hover:bg-red-500"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="rounded bg-green-600 px-8 py-2 font-semibold text-white hover:bg-green-500"
            >
              Purchase
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default MyCart;
