import {
  IconAsset,
  IconBrandFacebook,
  IconBrandInstagram,
  IconBrandX,
} from "@tabler/icons-react";
import { footerLinks } from "../Data/Data";

const Footer = () => {
  return (
    <div className="mt-20 pb-5 flex gap-4 justify-around">
      <div className="w-1/4 flex flex-col gap-4">
        <div className="flex gap-2 items-center">
          <IconAsset className="h-8 w-8 text-bright-sun-400" stroke={2} />
          <div className="text-xl font-semibold text-bright-sun-200">
            TalentCove
          </div>
        </div>
        <div className="text-sm text-mine-shaft-300">
          Job portal with user profiles, skill updates, certifications, work
          experience, and job postings.
        </div>
        <div className="flex gap-4 text-bright-sun-400 [&>div]:bg-mine-shaft-900 [&>div]:p-2 [&>div]:rounded-full hover:[&>div]:bg-mine-shaft-700 [&>div]:cursor-pointer">
          <div>
            <IconBrandFacebook />
          </div>
          <div>
            <IconBrandInstagram />
          </div>
          <div>
            <IconBrandX />
          </div>
        </div>
      </div>
      {footerLinks.map((item, index) => (
        <div key={index}>
          <div className="text-lg font-semibold mb-4 text-bright-sun-400">{item.title}</div>
          {item.links.map((link, index) => (
            <div key={index} className="text-mine-shaft-300 text-sm hover:text-bright-sun-400 cursor-pointer mb-1">
                {link.name}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default Footer;
