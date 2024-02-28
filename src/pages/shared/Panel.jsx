const Panel = ({ children }) => {
  return (
    <div id='formContainer' className=' mx-auto background-panel rounded-xl'>
      {children}
    </div>
  );
};
export default Panel;
