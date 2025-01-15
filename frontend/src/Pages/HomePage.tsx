import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import Companies from "../Landing/Companies";
import DreamJob from "../Landing/DreamJob";
import JobCategory from "../Landing/JobCategory";
import Subscribe from "../Landing/Subscribe";
import Testimonials from "../Landing/Testimonials";

const HomePage = () => {
    return (
        <div className="min-h-[100vh] bg-mine-shaft-950 font-[Poppins]">
            <Header />
            <DreamJob />
            <Companies />
            <JobCategory />
            <Testimonials />
            <Subscribe />
            <Footer />
        </div>
    )
}

export default HomePage;