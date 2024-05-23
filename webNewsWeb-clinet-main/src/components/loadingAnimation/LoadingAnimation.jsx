import loading from "../../assets/loading/loading-animation.gif";
const LoadingAnimation = () => {
  return (
    <div className="h-screen w-full flex justify-center items-center">
      <img src={loading} alt="loading" />
    </div>
  );
};

export default LoadingAnimation;
