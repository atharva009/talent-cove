import { Divider, Input, RangeSlider } from "@mantine/core";
import { useState } from "react";
import MultiInput from "../FindJobs/MultiInput";
import { searchFields } from "../Data/TalentData";
import { IconUserCircle } from "@tabler/icons-react";

const SearchBar = () => {
  const [value, setValue] = useState<[number, number]>([70000, 500000]);
  return (
    <div className="flex px-5 py-8">
        <div className="flex items-center">
            <div className="text-bright-sun-400 bg-mine-shaft-900 rounded-full p-1 mr-2"><IconUserCircle size={30} /></div>
        </div>
        <Input className="[&_input]:!placeholder-mine-shaft-200" variant="unstyled" placeholder="Talent Name" />
      {searchFields.map((item, index) => (
        <>
          <div key={index} className="w-1/5">
            <MultiInput {...item} />
          </div>
          <Divider mr="xs" size="sm" orientation="vertical" />
        </>
      ))}
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
