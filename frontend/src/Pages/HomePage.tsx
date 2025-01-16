import Companies from "../Landing/Companies";
import DreamJob from "../Landing/DreamJob";
import JobCategory from "../Landing/JobCategory";
import Subscribe from "../Landing/Subscribe";
import Testimonials from "../Landing/Testimonials";

const HomePage = () => {
    return (
        <div className="min-h-[100vh] bg-mine-shaft-950 font-[Poppins]">
            <DreamJob />
            <Companies />
            <JobCategory />
            <Testimonials />
            <Subscribe />
        </div>
    )
}

export default HomePage;