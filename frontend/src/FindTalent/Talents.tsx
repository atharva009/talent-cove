import { useEffect, useState } from "react";
import { Loader, Text } from "@mantine/core";
import { apiClient, TalentDTO, TalentSearchRequest } from "../services/api";
import Sort from "../FindJobs/Sort";
import TalentCard from "./TalentCard";

interface TalentsProps {
  searchParams?: TalentSearchRequest;
}

const Talents = ({ searchParams }: TalentsProps) => {
  const [talents, setTalents] = useState<TalentDTO[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (searchParams && Object.keys(searchParams).length > 0) {
      searchTalents(searchParams);
    } else {
      fetchTalents();
    }
  }, [searchParams]);

  const fetchTalents = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await apiClient.getAllTalents();
      setTalents(data);
    } catch (err) {
      setError("Failed to load talents. Please try again later.");
      console.error("Error fetching talents:", err);
    } finally {
      setLoading(false);
    }
  };

  const searchTalents = async (params: TalentSearchRequest) => {
    try {
      setLoading(true);
      setError(null);
      const data = await apiClient.searchTalents(params);
      setTalents(data);
    } catch (err) {
      setError("Failed to search talents. Please try again.");
      console.error("Error searching talents:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleSortChange = (newSortBy: string) => {
    // Sort logic can be added here if needed
    console.log("Sort changed:", newSortBy);
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
          <div className="text-2xl font-semibold">Talents</div>
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
        <div className="text-2xl font-semibold">Talents</div>
        <Sort onSortChange={handleSortChange} />
      </div>
      <div className="flex mt-10 flex-wrap gap-5">
        {talents.length === 0 ? (
          <Text className="w-full text-center text-mine-shaft-400">No talents found</Text>
        ) : (
          talents.map((talent) => (
            <TalentCard
              key={talent.id}
              id={talent.id}
              image={talent.imageUrl || "/avatar.png"}
              name={talent.name}
              role={talent.role}
              company={talent.company}
              topSkills={talent.topSkills || []}
              about={talent.about || ""}
              expectedSalary={talent.expectedSalary || "Not specified"}
              location={talent.location}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default Talents;