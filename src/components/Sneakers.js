import { Link } from "react-router-dom";

const Sneakers = ({ data, brand }) => {
  function getBrand(id) {
    if (brand) {
      return brand.find((obj) => {
        return obj.id === id;
      });
    }
  }

  return (
    <div className="mt-8 grid grid-cols-2 gap-8 px-4 md:grid-cols-4 md:px-0">
      {data.map((value, key) => (
        <Card
          data-testid="card-component"
          key={key}
          id={value.id}
          brand={getBrand(value.brandId)}
          model={value.model}
          image={value.image}
          date={value.publishedAt}
          price={value.price}
        />
      ))}
    </div>
  );
};

export const Card = ({ id, brand, model, image, date, price }) => {
  return (
    <div test className="rounded-md border border-neutral-300">
      {/* Image */}
      <div className="bg-neutral-100 p-2">
        <Link to={`/product/${id}`}>
          <img
            className="w-full object-cover md:h-48"
            src={image}
            alt="sneaker"
          />
        </Link>
      </div>
      {/* Content */}
      <div className="flex h-32 flex-col place-content-between truncate border-t border-neutral-300 bg-white p-2">
        <div className="flex flex-col truncate">
          <Link
            to={`/product/${id}`}
            className="truncate font-semibold hover:text-red-600 md:w-40"
          >
            {model}
          </Link>
          {brand && <p className="text-sm">{brand.name}</p>}
          <p className="text-xs">{date}</p>
        </div>
        <div>
          <p>$ {price}</p>
        </div>
      </div>
    </div>
  );
};

export default Sneakers;
