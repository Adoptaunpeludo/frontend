import './TypingLoader.css';

const TypingLoader = ({ className }) => {
  return (
    <div className={className}>
      <div className="typing">
        <span className="circle scaling"></span>
        <span className="circle scaling"></span>
        <span className="circle scaling"></span>
      </div>
    </div>
  );
};

export default TypingLoader;
