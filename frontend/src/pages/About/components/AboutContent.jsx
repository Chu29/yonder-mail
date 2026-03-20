const AboutContent = () => {
  return (
    <div className="min-h-screen bg-linear-to-b from-[#f9fafc] to-white py-12 sm:py-16 lg:py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div className="text-center mb-12 lg:mb-16">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-[#111118] mb-6">
            About Yonder Mail
          </h1>
          <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto">
            Sending memories to the future, one video message at a time.
          </p>
        </div>

        {/* Mission Section */}
        <div className="bg-white rounded-2xl shadow-lg p-8 sm:p-10 lg:p-12 mb-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-[#111118] mb-4">
            Our Mission
          </h2>
          <p className="text-base sm:text-lg text-gray-700 leading-relaxed mb-4">
            Yonder Mail is a video messaging platform that lets you send
            messages to yourself or loved ones in the future. Whether it's a
            personal reminder, a moment of gratitude, or advice for tomorrow,
            our app makes it easy to create meaningful connections across time.
          </p>
          <p className="text-base sm:text-lg text-gray-700 leading-relaxed">
            Simply record your video message, choose when you want it delivered,
            and we'll make sure it arrives at the perfect moment. It's a unique
            way to preserve your thoughts, celebrate milestones, or stay
            connected with what matters most.
          </p>
        </div>

        {/* Story Section */}
        <div className="bg-white rounded-2xl shadow-lg p-8 sm:p-10 lg:p-12 mb-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-[#111118] mb-4">
            Our Story
          </h2>
          <p className="text-base sm:text-lg text-gray-700 leading-relaxed mb-4">
            Yonder Mail was born from a simple idea: what if you could have a
            conversation with your future self? We've all experienced moments of
            clarity, growth, or emotion that we wished we could preserve and
            revisit when we need them most.
          </p>
          <p className="text-base sm:text-lg text-gray-700 leading-relaxed">
            Today, Yonder Mail empowers thousands of users to create personal
            time capsules. Capture your goals before starting a new chapter,
            record your thoughts during challenging times, preserve your
            perspective at pivotal moments. We're helping you connect with
            yourself across time.k
          </p>
        </div>

        {/* Values Section */}
        <div className="bg-white rounded-2xl shadow-lg p-8 sm:p-10 lg:p-12">
          <h2 className="text-2xl sm:text-3xl font-bold text-[#111118] mb-6">
            Our Values
          </h2>
          <div className="grid sm:grid-cols-2 gap-6">
            <div className="flex flex-col">
              <h3 className="text-xl font-semibold text-[#6467f2] mb-2">
                🔒 Privacy First
              </h3>
              <p className="text-base text-gray-700">
                Your messages are encrypted and secure. We never share your
                personal data with third parties.
              </p>
            </div>
            <div className="flex flex-col">
              <h3 className="text-xl font-semibold text-[#6467f2] mb-2">
                💝 Self-Reflection
              </h3>
              <p className="text-base text-gray-700">
                We help you create authentic moments of self-connection,
                bridging who you are today with who you'll become tomorrow.
              </p>
            </div>
            <div className="flex flex-col">
              <h3 className="text-xl font-semibold text-[#6467f2] mb-2">
                🎯 Simple & Intuitive
              </h3>
              <p className="text-base text-gray-700">
                Record, schedule, and send, it's that easy. No complicated steps,
                just pure simplicity.
              </p>
            </div>
            <div className="flex flex-col">
              <h3 className="text-xl font-semibold text-[#6467f2] mb-2">
                🌟 Reliability
              </h3>
              <p className="text-base text-gray-700">
                Your messages will be delivered exactly when scheduled. We take
                our promise seriously.
              </p>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center mt-12 lg:mt-16">
          <h2 className="text-2xl sm:text-3xl font-bold text-[#111118] mb-4">
            Ready to send a message to your future self?
          </h2>
          <p className="text-base sm:text-lg text-gray-600 mb-6">
            Start a conversation with the person you'll become.
          </p>
          <a
            href="/login"
            className="inline-block bg-[#6467f2] px-8 py-3 rounded-lg text-white text-base lg:text-lg font-semibold hover:bg-[#5456d4] transition-colors"
          >
            Get Started
          </a>
        </div>
      </div>
    </div>
  );
};

export default AboutContent;
