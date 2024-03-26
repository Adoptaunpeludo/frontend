const MyMessage = ({ text }) => {
  return (
    <div className="sm:col-start-6 col-start-1 col-end-13 p-3 rounded-lg">
      <div className="flex items-center justify-start flex-row-reverse">
        <div className="flex items-center justify-center h-10 w-10 rounded-full bg-tertiary-500 flex-shrink-0 text-white">
          U
        </div>
        <div className="relative mr-3 text-medium bg-tertiary py-2 px-4 rounded-xl text-white shadow-xl">
          {text}
        </div>
      </div>
    </div>
  );
};

export default MyMessage;
