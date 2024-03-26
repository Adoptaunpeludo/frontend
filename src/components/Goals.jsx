import RescuesIcons from './RescuesIcons';

export const Goals = ({ rescues }) => {
  return (
    <div
      id="goals"
      className="my-4 max-w-screen-xl w-full flex max-lg:flex-col  justify-evenly px-12 py-12 gap-5"
    >
      {rescues.map((rescue, key) => (
        <RescuesIcons
          key={key}
          image={rescue.image}
          number={rescue.number}
          label={rescue.label}
        />
      ))}
    </div>
  );
};
