const Panel = ({ children }) => {
  return (
    <div
      id='formContainer'
      className=' w-max max-w-lg mx-auto background-panel rounded-xl'
    >
      {children}
    </div>
  );
};
export default Panel;
