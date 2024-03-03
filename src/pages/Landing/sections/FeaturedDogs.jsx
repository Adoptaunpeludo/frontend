const FeaturedDogs = () => {
  return (
    <section
      id='featured-dogs'
      className="w-full  max-h-screen  bg-right-bottom bg-auto bg-no-repeat h-screen bg-white bg-[url('/backgrounds/featured-dogs.jpg')] relative"
    >
      <main
        id='featured-dogs-content'
        className='max-w-screen-xl w-full flex flex-col gap-3 justify-start  mx-auto px-5 h-96 '
      ></main>
      <div id='vector' className='absolute bottom-0 w-full'>
        <img
          src='/backgrounds/featured-dogs-vector.png'
          className='w-screen'
        ></img>
      </div>
    </section>
  );
};
export default FeaturedDogs;
