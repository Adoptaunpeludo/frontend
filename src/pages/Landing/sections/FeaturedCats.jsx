const FeaturedCats = () => {
  return (
    <section
      id='featured-cats'
      className="w-full  max-h-screen  bg-left-bottom bg-auto bg-no-repeat h-screen bg-black bg-[url('/backgrounds/featured-cats.jpg')] relative"
    >
      <main
        id='featured-cats-content'
        className='max-w-screen-xl w-full flex flex-col gap-3 justify-start  mx-auto px-5 h-96 '
      ></main>
      <div id='vector' className='absolute bottom-0 w-full'>
        <img
          src='/public/backgrounds/featured-cats-vector.png'
          className='w-screen'
        ></img>
      </div>
    </section>
  );
};
export default FeaturedCats;
