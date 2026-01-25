import { useEffect, useState } from "react";
import { Loader, Text } from "@mantine/core";
import { apiClient, JobDTO, JobSearchRequest } from "../services/api";
import JobCard from "./JobCard";
import Sort from "./Sort";

interface JobsProps {
  searchParams?: JobSearchRequest;
}

const Jobs = ({ searchParams }: JobsProps) => {
  const [jobs, setJobs] = useState<JobDTO[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState<string>("relevance");

  useEffect(() => {
    if (searchParams && Object.keys(searchParams).length > 0) {
      searchJobs(searchParams);
    } else {
      fetchJobs();
    }
  }, [searchParams]);

  const fetchJobs = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await apiClient.getAllJobs();
      setJobs(data);
    } catch (err) {
      setError("Failed to load jobs. Please try again later.");
      console.error("Error fetching jobs:", err);
    } finally {
      setLoading(false);
    }
  };

  const searchJobs = async (params: JobSearchRequest) => {
    try {
      setLoading(true);
      setError(null);
      const data = await apiClient.searchJobs(params);
      setJobs(data);
    } catch (err) {
      setError("Failed to search jobs. Please try again.");
      console.error("Error searching jobs:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleSortChange = async (newSortBy: string) => {
    setSortBy(newSortBy);
    try {
      setLoading(true);
      const currentParams = searchParams || {};
      const searchParamsWithSort = {
        ...currentParams,
        sortBy: newSortBy === "Relevance" ? undefined : 
                newSortBy === "Most Recent" ? "recent" :
                newSortBy === "Salary (Low to High)" ? "salary_asc" :
                newSortBy === "Salary (High to Low)" ? "salary_desc" : undefined
      };
      const data = await apiClient.searchJobs(searchParamsWithSort);
      setJobs(data);
    } catch (err) {
      setError("Failed to sort jobs. Please try again.");
      console.error("Error sorting jobs:", err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="px-5 py-5 flex justify-center items-center min-h-[400px]">
        <Loader size="lg" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="px-5 py-5">
        <div className="flex justify-between mt-5">
          <div className="text-2xl font-semibold">Recommended Jobs</div>
          <Sort onSortChange={handleSortChange} />
        </div>
        <div className="flex justify-center items-center min-h-[400px]">
          <Text c="red">{error}</Text>
        </div>
      </div>
    );
  }

  return (
    <div className="px-5 py-5">
      <div className="flex justify-between mt-5">
        <div className="text-2xl font-semibold">Recommended Jobs</div>
        <Sort onSortChange={handleSortChange} />
      </div>
      <div className="flex mt-10 flex-wrap gap-5">
        {jobs.length === 0 ? (
          <Text className="w-full text-center text-mine-shaft-400">No jobs found</Text>
        ) : (
          jobs.map((job) => (
            <JobCard
              key={job.id}
              id={job.id}
              company={job.company}
              jobTitle={job.jobTitle}
              applicants={job.applicantsCount}
              experience={job.experience}
              employmentType={job.employmentType}
              location={job.location}
              description={job.description}
              salary={job.salary}
              postedDaysAgo={job.postedDaysAgo}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default Jobs;
