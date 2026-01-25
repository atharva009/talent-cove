import { Divider, RangeSlider } from "@mantine/core";
import { dropdownData } from "../Data/JobsData";
import MultiInput from "./MultiInput";
import { useState, useEffect } from "react";
import { JobSearchRequest } from "../services/api";

interface SearchBarProps {
  onSearch?: (params: JobSearchRequest) => void;
}

const SearchBar = ({ onSearch }: SearchBarProps) => {
  const [value, setValue] = useState<[number, number]>([70000, 500000]);
  const [jobTitle, setJobTitle] = useState<string>("");
  const [location, setLocation] = useState<string>("");
  const [experience, setExperience] = useState<string>("");
  const [employmentType, setEmploymentType] = useState<string>("");

  useEffect(() => {
    // Debounce search - trigger after user stops typing/selecting
    const timeoutId = setTimeout(() => {
      if (onSearch) {
        const params: JobSearchRequest = {
          jobTitle: jobTitle || undefined,
          location: location || undefined,
          experience: experience || undefined,
          employmentType: employmentType || undefined,
          minSalary: value[0],
          maxSalary: value[1],
        };
        onSearch(params);
      }
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [jobTitle, location, experience, employmentType, value, onSearch]);

  return (
    <div className="flex px-5 py-8">
      <div className="w-1/5">
        <MultiInput
          {...dropdownData[0]}
          onValueChange={(val) => setJobTitle(val)}
        />
      </div>
      <Divider mr="xs" size="sm" orientation="vertical" />
      <div className="w-1/5">
        <MultiInput
          {...dropdownData[1]}
          onValueChange={(val) => setLocation(val)}
        />
      </div>
      <Divider mr="xs" size="sm" orientation="vertical" />
      <div className="w-1/5">
        <MultiInput
          {...dropdownData[2]}
          onValueChange={(val) => setExperience(val)}
        />
      </div>
      <Divider mr="xs" size="sm" orientation="vertical" />
      <div className="w-1/5">
        <MultiInput
          {...dropdownData[3]}
          onValueChange={(val) => setEmploymentType(val)}
        />
      </div>
      <Divider mr="xs" size="sm" orientation="vertical" />
      <div className="w-1/5 [&_.mantine-Slider-label]:!translate-y-10">
        <div className="flex justify-between">
          <div>Salary</div>
          <div>
            &#36;{value[0].toLocaleString()} - &#36;{value[1].toLocaleString()}
          </div>
        </div>
        <RangeSlider
          color="brightSun.4"
          size="xs"
          value={value}
          onChange={setValue}
          label={null}
          min={70000}
          max={500000}
          step={5000}
          labelTransitionProps={{
            transition: "skew-down",
            duration: 150,
            timingFunction: "linear",
          }}
        />
      </div>
    </div>
  );
};

export default SearchBar;
