import { Link } from "react-router-dom";
import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import useSWR from "swr";
import { fetcher, addToLocalStorage } from "../../libs/utils";

const Product = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [size, setSize] = useState(null);
  const { data, error } = useSWR(`/api/sneakers/${id}`, fetcher);
  const { data: brand, error: brandError } = useSWR(`/api/brand/`, fetcher);
  const { data: sizes, error: sizesError } = useSWR(
    `/api/sneakers/${id}/sizes`,
    fetcher
  );

  if (error || brandError || sizesError)
    return "An error has occurred." + error;
  if (!data || !brand || !sizes) return "Loading...";

  function getBrand(id) {
    if (brand) {
      return brand.find((obj) => {
        return obj.id === id;
      });
    }
  }

  const brandName = getBrand(data.brandId).name;

  const item = {
    brand: brandName,
    model: data.model,
    size: size,
    price: data.price,
    image: data.image,
    publishedAt: data.publishedAt,
  };

  return (
    <>
      <div className="pt-4 pl-4">
        <button
          onClick={() => navigate(-1)}
          className="cursor-pointer hover:text-red-600"
        >
          {"<<< "}Go back
        </button>
      </div>
      <div className="p-12">
        <div className="flex w-full flex-col md:flex-row">
          <div>
            <img src={data.image} alt={data.model} />
          </div>
          <div className="flex w-full flex-col place-content-between md:ml-12">
            <div>
              <h1 className="text-4xl font-semibold">
                {brandName + " " + data.model}
              </h1>
              <Link
                to={`/store/brands/${data.brandId}`}
                className="text-2xl hover:text-red-600"
              >
                {brandName}
              </Link>
              <p>Price: ${data.price}</p>
              <p className="mt-4">{data.publishedAt}</p>
            </div>
            <div>
              <div>
                <h3 className="text-2xl">Sizes</h3>
                <ul className="mt-2 grid grid-cols-2 gap-4 md:grid-cols-5">
                  {sizes.map((values, key) => (
                    <RadioButton
                      key={key}
                      id={values.id}
                      size={values.size}
                      qty={values.qty}
                      onChange={() => setSize(values)}
                    />
                  ))}
                </ul>
              </div>
              <div className="mt-12">
                <button
                  className="flex w-full flex-row items-center justify-center rounded bg-green-600 px-8 py-2 font-semibold text-white hover:bg-green-500 disabled:opacity-50 disabled:hover:bg-green-600"
                  onClick={() => addToLocalStorage("cart", item)}
                  disabled={!size}
                >
                  Add to cart
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="ml-2 h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                    />
                  </svg>
                </button>

                <button
                  className="mt-3 flex w-full flex-row items-center justify-center rounded bg-neutral-600 px-8 py-2 font-semibold text-white hover:bg-neutral-500"
                  onClick={() => addToLocalStorage("wishlist", item)}
                >
                  Add to wishlist
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="ml-2 h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

const RadioButton = ({ id, size, qty, onChange }) => {
  return (
    <li className={`relative ${qty <= 0 ? "opacity-50" : ""}`}>
      <input
        id={`size-${id}`}
        type="radio"
        value={size}
        name="size"
        className="peer sr-only"
        onChange={onChange}
        disabled={qty <= 0}
      />
      <label
        className="flex cursor-pointer place-content-between rounded-lg border border-gray-300 bg-white p-2 hover:bg-gray-50 focus:outline-none peer-checked:border-transparent peer-checked:ring-2 peer-checked:ring-red-500"
        htmlFor={`size-${id}`}
      >
        <span>{size}</span>
        <span className="flex flex-row">
          <p className="font-semibold">Qty: </p> {qty}
        </span>
      </label>
    </li>
  );
};

export default Product;
