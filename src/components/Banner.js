const Banner = () => {
  //const imageURI = "https://wallpapercave.com/wp/wp4020906.jpg";
  return (
    <div
      className={`m-3 flex flex-col items-center bg-neutral-900 px-16 py-8 text-white md:flex-row`}
    >
      <div className="flex-none">
        <img className="" src="/sneaker/banner.png" alt="banner" />
      </div>
      <div className="overflow-hidden text-ellipsis text-center tracking-widest md:text-right">
        <p className="font-semibold md:text-3xl">
          Somos una tienda online para los entusiastas de las tenis
        </p>
        <p className="text-sm md:text-base">
          Brindamos una experiencia seleccionada que muestra lo último en
          tendencias de tenis
        </p>
      </div>
    </div>
  );
};

export default Banner;
