export const Panel = ({ className, children }) => {
  return (
    <div
      id='panelContainer'
      className={`${className} flex justify-center background-panel rounded-xl`}
    >
      {children}
    </div>
  );
};
