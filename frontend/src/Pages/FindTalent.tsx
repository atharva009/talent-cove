import { Divider } from "@mantine/core";
import SearchBar from "../FindTalent/SearchBar";
import Talents from "../FindTalent/Talents";

const FindTalent = () => {
    return (
      <div className="min-h-[100vh] bg-mine-shaft-950 font-[Poppins]">
        <Divider size="sm" mx="md" />
        <SearchBar />
        <Divider size="sm" mx="md" />
        <Talents />
      </div>
    );
  };
  
  export default FindTalent;