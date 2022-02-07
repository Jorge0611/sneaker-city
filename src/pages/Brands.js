import { useParams } from "react-router-dom";
import useSWR from "swr";
import Sneakers from "../components/Sneakers";
import { fetcher } from "../libs/utils";

const Brand = () => {
  const { id } = useParams();
  const { data, error } = useSWR(
    `/api/brand/${id}/sneakers?_sort=publishedAt&_order=desc`,
    fetcher
  );
  const { data: brand, error: errorBrand } = useSWR(
    `/api/brand/${id}/`,
    fetcher
  );

  if (error || errorBrand) return "An error has occurred." + error;
  if (!data || !brand) return "Loading...";

  return (
    <div className="flex flex-col items-center pt-8">
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
