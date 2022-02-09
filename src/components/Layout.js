import { Link } from "react-router-dom";
import { fetcher } from "../libs/utils";
import useSWR from "swr";

const Layout = ({ children }) => {
  const { data: brands, error } = useSWR("/api/brand", fetcher);

  if (error) return "An error has occurred. " + error;
  if (!brands) return "Loading...";

  return (
    <div className="min-h-full">
      <nav className="flex flex-row items-center justify-between bg-neutral-800 px-4 py-3 text-white md:px-16">
        <div className="text-sm font-semibold md:text-lg">
          <Link to="/store" className="nav-link">
            Sneaker City
          </Link>
        </div>
        <div className="mx-8 flex flex-row space-x-4 text-sm md:text-base">
          <Link to="/store" className="nav-link">
            Home
          </Link>
          <div className="group relative inline-block justify-center">
            <button className="nav-link">Brands</button>
            <ul className="absolute z-50 hidden w-48 rounded border border-neutral-300 bg-neutral-100 tracking-widest text-black group-hover:block">
              {brands.map((values, key) => (
                <li key={`opt-brand-${key}`}>
                  <Link
                    to={`/store/brands/${values.id}`}
                    className="block whitespace-nowrap px-4 text-black hover:text-red-500"
                  >
                    {values.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <Link to="/profile/wishlist" className="nav-link">
            Wishlist
          </Link>
        </div>
        <div>
          <Link
            to="profile/my-cart"
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
      <footer className="flex w-full flex-row items-center bg-neutral-800 py-4 text-white shadow">
        <div className="flex w-full flex-row px-2 md:px-12">
          <img src="/bpd_logo.png" alt="BPD Logo" className="h-32" />
          <div className="pl-10">
            <span className="text-lg font-semibold md:text-xl">
              BPD Code Challenge
            </span>
            <h4 className="font-semibold">Contacto</h4>
            <div className="mt-4 flex flex-col space-y-2 text-xs md:text-sm">
              <a
                href="https://www.linkedin.com/in/jorge-luis-582395197/"
                target="_blank"
                rel="noreferrer"
                className="cursor-pointer hover:text-blue-600 hover:underline hover:decoration-blue-500/50"
              >
                Jorge Saldivar - LinkedIn
              </a>
              <a
                href="mailto:jorgesaldivar0611@gmail.com"
                target="_blank"
                rel="noreferrer"
                className="cursor-pointer hover:text-blue-600 hover:underline hover:decoration-blue-500/50"
              >
                Email: jorgesaldivar0611@gmail.com
              </a>
              <a
                href="tel:+1 829-968-8357"
                className="cursor-pointer hover:text-blue-600 hover:underline hover:decoration-blue-500/50"
              >
                Cel: +1 829-968-8357
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
