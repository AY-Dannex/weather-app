
function SkeletonLoader() {
  return (
    <div className="skeleton w-70 h-full  px-2">
      <div className="title my-4 h-8 w-40"></div>
      <div className="flex gap-5 justify-between align-center">
        <div className="text w-27 h-22"></div>
        <div className="flex  flex-col gap-1.5">
          <div className="text w-26 h-11"></div>
          <div className="text w-30 h-4"></div>
          <div className="flex flex-row justify-between w-40 h-4 gap-2">
            <div className="text w-23"></div>
            <div className="text w-20"></div>
          </div>
        </div>
      </div>
      <div className="flex flex-row w-full justify-between gap-5 py-3.5">
        <div className="text w-21 h-19"></div>
        <div className="text w-21 h-19"></div>
        <div className="text w-21 h-19"></div>
      </div> 
    </div>
  );
}

export default SkeletonLoader;
