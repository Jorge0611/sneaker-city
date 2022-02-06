import { useParams } from "react-router-dom";
import useSWR from "swr";
import Sneakers from "../components/Sneakers";

const fetcher = (url) => fetch(url).then((res) => res.json());

const Brand = () => {
  const { id } = useParams();
  const { data, error } = useSWR(`/api/brand/${id}/sneakers`, fetcher);
  const { data: brand, error: errorBrand } = useSWR(
    `/api/brand/${id}/`,
    fetcher
  );

  if (error || errorBrand) return "An error has occurred." + error;
  if (!data || !brand) return "Loading...";

  return (
    <div className="mt-8 flex flex-col items-center">
      <div>
        <h1 className="text-3xl font-semibold">{brand.name}</h1>
      </div>
      <div>
        <Sneakers data={data} />
      </div>
    </div>
  );
};

export default Brand;
