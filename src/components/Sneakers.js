import { Link } from "react-router-dom";

/**
 *
 * @param {Array<{id: Number, brandId: Number, model: String, price: Number, image: String, publishedAt: String}>} sneakers - Object with sneakers information
 * @param {Array<{id: Number, name: String}>} brand - Object with brand information
 * @returns {JSX.Element}
 * @constructor
 */
const Sneakers = ({ sneakers, brand }) => {
  /**
   * Returns brand by id
   *
   * @param {Number} id - Brand id
   * @returns
   */
  function getBrandById(id) {
    if (brand) {
      return brand.find((obj) => {
        return obj.id === id;
      });
    }
  }

  return (
    <div className="mt-8 px-4 md:px-0">
      <ul className="grid grid-cols-2 gap-4 md:grid-cols-4">
        {sneakers.map((value, key) => (
          <Card
            key={key}
            id={value.id}
            brand={getBrandById(value.brandId)}
            model={value.model}
            image={value.image}
            date={value.publishedAt}
            price={value.price}
          />
        ))}
      </ul>
    </div>
  );
};

/**
 *
 * @param {Number} id - Sneaker id
 * @param {Object<{id: Number, name: String}>} brand - Object with brand information
 * @param {String} model - Sneaker model
 * @param {String} image - Image location
 * @param {String} date - Sneaker's publishing date
 * @param {Number} price - Sneaker price
 * @returns {JSX.Element}
 * @constructor
 */
export const Card = ({ id, brand, model, image, date, price }) => {
  return (
    <li data-testid="card-sneakers">
      <div className="rounded-md border border-neutral-300">
        {/* Image */}
        <div className="bg-neutral-100 p-2">
          <Link to={`/store/product/${id}`}>
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
              to={`/store/product/${id}`}
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
    </li>
  );
};

export default Sneakers;
