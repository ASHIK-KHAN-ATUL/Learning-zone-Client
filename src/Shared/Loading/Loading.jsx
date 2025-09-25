const Loading = () => {
  return (
    <div className="flex items-center justify-center p-4 min-h-screen">
      <div className="w-20 h-20 rounded-full animate-spin bg-gradient-to-r from-red-500 via-purple-500 to-blue-500 p-[3px]">
        <div className="h-full w-full rounded-full bg-white"></div>
      </div>
    </div>
  );
};

export default Loading;
