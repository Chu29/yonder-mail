import FeaturesCard from "./atoms/FeaturesCard";

const Features = () => {
  return (
    <section>
      <div className="max-w-4xl mx-auto text-center my-12 px-4 sm:px-6 lg:px-8">
        {/* Features Section */}
        <h2 className="text-3xl font-bold text-gray-900 mb-4">How it works</h2>
        <p className="text-gray-600 mb-8">
          We've made it simple and intuitive to preserve your current thoughts
          for your future self. Just follow these easy steps:
        </p>
      </div>
      {/* Features Cards */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mb-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        <FeaturesCard
          icon="/path/to/icon1.png"
          title="Record"
          description="Use your webcam or phone to record a heartfelt video message to your future self."
        />
        <FeaturesCard
          icon="/path/to/icon2.png"
          title="Schedule"
          description="Choose any date in the future 1 month, 3 months, or even 6 months from today."
        />
        <FeaturesCard
          icon="/path/to/icon3.png"
          title="Receive"
          description="On your chosen date, we'll send a private link to your message directly to your inbox."
        />
      </div>
    </section>
  );
};

export default Features;
