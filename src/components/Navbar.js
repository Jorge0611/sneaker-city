import { Link } from "react-router-dom";
import useSWR from "swr";

const fetcher = (url) => fetch(url).then((res) => res.json());

const Navbar = ({ children }) => {
  const { data: brands, error } = useSWR("/api/brand", fetcher);

  if (error) return "An error has occurred. " + error;
  if (!brands) return "Loading...";

  return (
    <div className="">
      <nav className="flex flex-row items-center justify-between bg-neutral-800 px-4 py-3 text-white md:px-16">
        <div className="text-sm font-semibold md:text-lg">
          <Link to="/" className="nav-link">
            Sneaker City
          </Link>
        </div>
        <div className="flex flex-row space-x-4 text-xs md:text-base">
          <Link to="/" className="nav-link">
            Home
          </Link>
          <div className="group relative inline-block justify-center">
            <button className="nav-link">Brands</button>
            <ul className="absolute z-50 hidden w-48 rounded border border-neutral-300 bg-neutral-100 tracking-widest text-black group-hover:block">
              {brands.map((values, key) => (
                <li key={`opt-brand-${key}`}>
                  <Link
                    to={`/brands/${values.id}`}
                    className="block whitespace-nowrap px-4 text-black hover:text-red-500"
                  >
                    {values.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <Link to="wishlist" className="nav-link">
            Wishlist
          </Link>
        </div>
        <div>
          <Link
            to="my-cart"
            className="md:text-md flex cursor-pointer flex-row items-center text-sm hover:text-red-600"
          >
            My Cart
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
          </Link>
        </div>
      </nav>
      <div className="min-h-screen bg-neutral-50 pb-8">{children}</div>
    </div>
  );
};

export default Navbar;
