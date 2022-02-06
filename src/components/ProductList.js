const ProductList = ({ brand, model, price, size, image, onClick }) => {
  return (
    <li className="border-netrual-300 items-center rounded border bg-neutral-100 px-8 py-1">
      <div className="flex flex-row items-center">
        <div>
          <img className="aspect-[1/1] h-32 w-full" src={image} alt="sneaker" />
        </div>
        <div className="ml-12 flex w-full flex-col items-center justify-between md:flex-row">
          <div className="">
            <p className="text-lg font-semibold md:text-2xl">
              {brand + " " + model}
            </p>
            <p className="text-base md:text-lg">$ {price}</p>
            <p className="text-base md:text-lg">Size: {size}</p>
          </div>
          <div className="flex w-full flex-col items-end md:w-auto">
            <button
              className="boder-red-500 front-semibold flex h-10 w-full items-center justify-center rounded border bg-red-600 px-4 text-white hover:bg-red-500"
              onClick={onClick}
            >
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
                  d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </li>
  );
};

export default ProductList;
