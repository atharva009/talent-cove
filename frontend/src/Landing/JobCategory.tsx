import { Carousel } from "@mantine/carousel";
import { jobCategories } from "../Data/Data";
import { IconArrowLeft, IconArrowRight } from "@tabler/icons-react";

const JobCategory = () => {
  return (
    <div className="mt-20 pb-5">
      <div className="text-4xl text-center font-semibold mb-3 text-mine-shaft-100">
        Browse <span className="text-bright-sun-400">job</span> categories
      </div>
      <div className="text-lg mb-10 text-mine-shaft-300 text-center w-1/2 mx-auto">
        Explore diverse job categories and find the perfect job for you.
      </div>
      <Carousel
        slideSize="24"
        slideGap="md"
        loop
        className="focus-visible:[&_button]:!outline-none [&_button]:!bg-bright-sun-400 [&_button]:!border-none &_button]:hover:!opacity-80 [&_button]:opacity-0 hover:[&_button]:opacity-100"
        nextControlIcon={<IconArrowRight className="h-8 w-8" />}
        previousControlIcon={<IconArrowLeft className="h-8 w-8" />}
      >
        {jobCategories.map((category) => (
          <Carousel.Slide>
            <div className="flex flex-col items-center w-64 gap-2 border border-bright-sun-400 p-5 rounded-xl hover:cursor-pointer hover:shadow-[0_0_5px_2px_black] my-5 transition duration-300 ease-in-out !shadow-bright-sun-300">
              <div className="p-2 bg-bright-sun-300 rounded-full">
                <img
                  className="h-8 w-8"
                  src={category.imageSrc}
                  alt={category.title}
                />
              </div>
              <div className="text-mine-shaft-100 text-xl font-semibold">
                {category.title}
              </div>
              <div className="text-sm text-center text-mine-shaft-300">
                {category.description}
              </div>
              <div className="text-bright-sun-300 text-lg">
                {category.jobCount}
              </div>
            </div>
          </Carousel.Slide>
        ))}
      </Carousel>
    </div>
  );
};

export default JobCategory;
