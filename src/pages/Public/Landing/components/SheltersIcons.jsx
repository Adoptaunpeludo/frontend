const SheltersIcons = ({ image, name }) => {
  return (
    <div className='shelters-frame flex flex-col items-center gap-3'>
      <div>
        <img src={`/shelters/${image}`} alt={name} />
      </div>
      <div className='text-lg font-medium'>{name}</div>
    </div>
  );
};
export default SheltersIcons;
