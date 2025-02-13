import { Divider } from "@mantine/core";
import SearchBar from "../FindJobs/SearchBar";
import Jobs from "../FindJobs/Jobs";

const FindJobs = () => {
  return (
    <div className="min-h-[100vh] bg-mine-shaft-950 font-[Poppins]">
      <Divider size="sm" mx="md" />
      <SearchBar />
      <Divider size="sm" mx="md" />
      <Jobs />
    </div>
  );
};

export default FindJobs;
