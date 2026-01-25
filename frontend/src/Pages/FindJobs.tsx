import { useState } from "react";
import { Divider } from "@mantine/core";
import SearchBar from "../FindJobs/SearchBar";
import Jobs from "../FindJobs/Jobs";
import { JobSearchRequest } from "../services/api";

const FindJobs = () => {
  const [searchParams, setSearchParams] = useState<JobSearchRequest>({});

  const handleSearch = (params: JobSearchRequest) => {
    setSearchParams(params);
  };

  return (
    <div className="min-h-[100vh] bg-mine-shaft-950 font-[Poppins]">
      <Divider size="sm" mx="md" />
      <SearchBar onSearch={handleSearch} />
      <Divider size="sm" mx="md" />
      <Jobs searchParams={searchParams} />
    </div>
  );
};

export default FindJobs;
