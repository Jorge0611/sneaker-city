import useSWR from "swr";
import { useState } from "react";
import { fetcher } from "../libs/utils";
import Banner from "../components/Banner";
import Sneakers from "../components/Sneakers";

const Home = () => {
  const [pageIndex, setPageIndex] = useState(1);
  const { data: brand, error: brandError } = useSWR("/api/brand", fetcher);
  const { data, error } = useSWR(
    `/api/sneakers?_sort=publishedAt&_order=desc&_page=${pageIndex}`,
    fetcher
  );

  if (error || brandError) return "An error has occurred." + error;
  if (!data || !brand) return "Loading...";

  return (
    <div className="bg-neutral-50">
      <section id="banner">
        <Banner />
      </section>
      <section id="newest-shoes">
        <div className="flex flex-col items-center pt-8">
          <div>
            <h1 className="text-3xl font-semibold">Newest Shoes</h1>
          </div>
          <div>
            <Sneakers
              data-testid="sneaker-component"
              sneakers={data}
              brand={brand}
            />
          </div>
        </div>
      </section>
      <div className="mt-8 flex items-center justify-center rounded">
        <button
          id="btn_previous"
          className="w-48 rounded rounded-r-none border border-neutral-300 bg-neutral-100 p-4 hover:bg-neutral-300 disabled:opacity-60 disabled:hover:bg-neutral-100"
          onClick={() => setPageIndex(pageIndex - 1)}
          disabled={pageIndex <= 1}
        >
          Previous
        </button>
        <button
          id="btn_next"
          className="w-48 rounded rounded-l-none border border-neutral-300 p-4 hover:bg-neutral-300 disabled:opacity-60 disabled:hover:bg-neutral-100"
          onClick={() => setPageIndex(pageIndex + 1)}
          disabled={data.length < 10}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Home;
