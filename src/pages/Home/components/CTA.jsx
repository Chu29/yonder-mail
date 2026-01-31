import { NavLink } from "react-router";

const CTA = () => {
  return (
    <section className="bg-[#f9fafc] py-8 sm:py-12 md:py-16 lg:py-18 border border-zinc-200 ">
      <div className="bg-[#6467f2] p-6 sm:p-8 md:p-10 lg:p-12 rounded-2xl sm:rounded-3xl max-w-4xl mx-4 sm:mx-6 lg:mx-auto text-center my-6 sm:my-8 md:my-10 lg:my-12">
        {/* CTA Section */}
        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold text-white mb-3 sm:mb-4 leading-tight">
          Ready to talk to your future self?
        </h2>
        <p className="text-sm sm:text-base md:text-lg text-white mb-6 sm:mb-8 px-2 sm:px-0">
          It only takes a few minutes to create a memory that will last a
          lifetime.
        </p>
        <NavLink
          to="/record"
          className="inline-block bg-[#ffffff] text-[#6467f2] px-5 sm:px-6 py-2.5 sm:py-3 rounded-md text-base sm:text-lg font-extrabold hover:bg-zinc-100 transition"
        >
          Start Recording Now
        </NavLink>
      </div>
    </section>
  );
};

export default CTA;
