
import Title from "../Components/title";
import { assets } from "../assets/assets";

const About = () => {
  return (
    <div>
      <div className="text-2xl text-center pt-8 border-t">
        <Title text1={"About "} text2={"Us"} />
        <div className="my-10 flex flex-col md:flex-row gap-16">
          <img
            className="w-full md:max-w-[450px]"
            src={assets.about_img}
            alt=""
          />
          <div className="flex flex-col justify-center gap-6 md:w-2/4">
            <p>We refine 100% organic oil</p>
            <p>kjajshdsajd;laskj</p>
            <b className="text-gray-800 ">Our Mission</b>
            <p>salkdaskjdalskdjas</p>
          </div>
        </div>
        <div className="text-xl py-4  ">
          <Title text1={"Why"} text2={"Choose Us"} />
        </div>
        <div className="flex flex-col md:flex-row text-sm mb-20">
          <div className="border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5">
            <b>Quality Assurance</b>
            <p>We provide 100 percenyafe organic</p>

          </div>

          <div className="border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5">
            <b>Quality Assurance</b>
            <p>We provide 100 percenyafe organic</p>

          </div>

          <div className="border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5">
            <b>Quality Assurance</b>
            <p>We provide 100 percenyafe organic</p>

          </div>
          

        </div>
      </div>
    </div>
  );
};

export default About;
