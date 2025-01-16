import { Avatar, Indicator } from "@mantine/core";
import { IconAsset, IconBell, IconSettings } from "@tabler/icons-react";
import NavLinks from "./NavLinks";

const Header = () => {
  return (
    <div className="w-full h-24 text-white flex justify-between items-center px-6 bg-mine-shaft-950 font-[Poppins]">
      <div className="flex gap-2 items-center">
        <IconAsset className="h-10 w-10 text-bright-sun-400" stroke={2} />
        <div className="text-3xl font-semibold text-bright-sun-200">
          TalentCove
        </div>
      </div>
      <NavLinks />
      <div className="flex gap-5 items-center">
        <div className="flex gap-2 items-center">
          <Avatar color="yellow" radius="xl">
            AH
          </Avatar>
        </div>
        <div className="bg-mine-shaft-900 p-2 rounded-full">
          <IconSettings stroke={1.5} />
        </div>
        <div className="bg-mine-shaft-900 p-2 rounded-full">
          <Indicator color="brightSun.5" size={10} offset={2} processing>
            <IconBell stroke={1.5} />
          </Indicator>
        </div>
      </div>
    </div>
  );
};

export default Header;
