import { Avatar, Rating } from "@mantine/core";
import { testimonials } from "../Data/Data";

const Testimonials = () => {
  return (
    <div className="mt-20 pb-5">
      <div className="text-4xl text-center font-semibold mb-3 text-mine-shaft-100">
        What <span className="text-bright-sun-400">users</span> say about us?
      </div>
      <div className="flex justify-evenly">
      {
        testimonials.map((testimonial, index) => <div key={index} className="flex flex-col gap-3 w-[24%] border-bright-sun-400 p-3 border rounded-xl mt-10">
        <div className="flex gap-2 items-center">
            <Avatar className="!h-14 !w-14" src="avatar.png" alt="it's me" />
            <div>
                <div className="text-lg text-mine-shaft-100 font-semibold">{testimonial.name}</div>
                <Rating value={testimonial.rating} fractions={2} readOnly />
            </div>
        </div>
        <div className="text-xs text-mine-shaft-200">{testimonial.testimonial}</div>
      </div>
      )}
      </div>
      
    </div>
  );
};

export default Testimonials;