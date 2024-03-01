const RescuesIcons = ({ image, number, label }) => {
  return (
    <div id='rescue-frame' className='flex flex-col items-center'>
      <div id='rescue-icon'>
        <img src={`/public/assets/${image}`} alt={label} />
      </div>
      <div id='rescue-text' className='flex flex-col items-center'>
        <div className='font-lobster text-8xl'>{number}</div>
        <div className='text-1xl font-bold'>{label}</div>
      </div>
    </div>
  );
};
export default RescuesIcons;
