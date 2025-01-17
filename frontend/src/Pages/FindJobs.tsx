import { Divider } from "@mantine/core";
import SearchBar from "../FindJobs/SearchBar";

const FindJobs = () => {
  return (
    <div className="min-h-[100vh] bg-mine-shaft-950 font-[Poppins]">
        <Divider size="sm" mx="md" />
      <SearchBar />
    </div>
  );
};

export default FindJobs;
