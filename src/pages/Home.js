import Banner from "../components/Banner";
import Sneakers from "../components/Sneakers";
import useSWR from "swr";
import { useState } from "react";

const fetcher = (url) => fetch(url).then((res) => res.json());

const Home = () => {
  const [pageIndex, setPageIndex] = useState(1);
  const { data, error } = useSWR(
    `/api/sneakers?_sort=publishedAt&_order=desc&_page=${pageIndex}`,
    fetcher
  );
  const { data: brand, error: brandError } = useSWR("brand", fetcher);

  if (error || brandError) return "An error has occurred." + error;
  if (!data || !brand) return "Loading...";
  console.log(data);
  console.log(data.length);
  return (
    <div className="bg-neutral-50">
      <div>
        <Banner />
        <div className="mt-8 flex flex-col items-center">
          <div>
            <h1 className="text-3xl font-semibold">Newest Shoes</h1>
          </div>
          <div>
            <Sneakers data={data} brand={brand} />
          </div>

          {/* PAGINATION */}
          <div className="mt-8 flex rounded border border-neutral-300 bg-neutral-100">
            <button
              className="w-48 border-r border-neutral-300 p-4 hover:bg-neutral-300 disabled:opacity-60 disabled:hover:bg-neutral-100"
              onClick={() => setPageIndex(pageIndex - 1)}
              disabled={pageIndex <= 1 ? true : false}
            >
              Previous
            </button>
            <button
              className="w-48 p-4 hover:bg-neutral-300 disabled:opacity-60 disabled:hover:bg-neutral-100"
              onClick={() => setPageIndex(pageIndex + 1)}
              disabled={data.length >= 10 ? false : true}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
