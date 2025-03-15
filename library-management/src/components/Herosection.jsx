const HeroSection = () => {
    return (
      <div className="flex flex-col md:flex-row items-center p-10">
        <div className="md:w-1/2">
          <h1 className="text-4xl font-bold">Streamline Your Library Management Experience Today</h1>
          <p className="text-gray-600 mt-4">
            Our Library Management System offers a seamless and user-friendly interface to manage your library efficiently.
          </p>
          <div className="mt-6">
            <button className="bg-black text-white px-5 py-2 rounded-md mr-3">Learn More</button>
            <button className="border border-black px-5 py-2 rounded-md">Sign Up</button>
          </div>
        </div>
        <div className="md:w-1/2 mt-6 md:mt-0">
          <div className="bg-gray-300 w-full h-64 rounded-md flex items-center justify-center">
            <span className="text-gray-500">[Image Placeholder]</span>
          </div>
        </div>
      </div>
    );
  };
  
  export default HeroSection;
  