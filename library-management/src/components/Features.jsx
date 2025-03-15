const features = [
    {
      title: "Streamlined User Experience",
      description: "Our system offers a comprehensive online catalog for easy book discovery.",
      button: "Learn More",
    },
    {
      title: "Effortless User Management",
      description: "Manage user accounts seamlessly with our intuitive interface.",
      button: "Sign Up",
    },
    {
      title: "Convenient Book Reservation",
      description: "Reserve books easily and receive notifications for pick-up.",
      button: "Reserve",
    },
  ];
  
  const Features = () => {
    return (
      <div className="p-10">
        <h2 className="text-3xl font-bold text-center">Explore the Essential Features of Our Library Management System</h2>
        <div className="grid md:grid-cols-3 gap-6 mt-8">
          {features.map((feature, index) => (
            <div key={index} className="p-6 shadow-md rounded-lg">
              <div className="bg-gray-300 w-full h-40 rounded-md flex items-center justify-center">
                <span className="text-gray-500">[Image Placeholder]</span>
              </div>
              <h3 className="text-xl font-semibold mt-4">{feature.title}</h3>
              <p className="text-gray-600 mt-2">{feature.description}</p>
              <button className="text-blue-500 mt-4">{feature.button} →</button>
            </div>
          ))}
        </div>
      </div>
    );
  };
  
  export default Features;
  