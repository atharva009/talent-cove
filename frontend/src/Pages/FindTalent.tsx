import { useState } from "react";
import { Divider } from "@mantine/core";
import SearchBar from "../FindTalent/SearchBar";
import Talents from "../FindTalent/Talents";
import { TalentSearchRequest } from "../services/api";

const FindTalent = () => {
  const [searchParams, setSearchParams] = useState<TalentSearchRequest>({});

  const handleSearch = (params: TalentSearchRequest) => {
    setSearchParams(params);
  };

  return (
    <div className="min-h-[100vh] bg-mine-shaft-950 font-[Poppins]">
      <Divider size="sm" mx="md" />
      <SearchBar onSearch={handleSearch} />
      <Divider size="sm" mx="md" />
      <Talents searchParams={searchParams} />
    </div>
  );
};

export default FindTalent;