import { Avatar, TextInput } from "@mantine/core";
import { IconSearch } from "@tabler/icons-react";

const DreamJob = () => {
  return (
    <div className="flex items-center px-20">
      <div className="flex flex-col w-[45%] gap-4">
        <div className="text-6xl font-bold leading-tight text-mine-shaft-100 [&>span]:text-bright-sun-400">
          Find Your <span>Dream Job</span> with us!
        </div>
        <div className="text-lg text-mine-shaft-200">
          Good life begins with a good company. Start explore thousands of job
          in one place.
        </div>
        <div className="flex gap-4 mt-5">
          <TextInput
            className="bg-mine-shaft-900 rounded-lg p-1 px-2 text-mine-shaft-100 [&_input]:text-mine-shaft-100"
            variant="unstyled"
            label="Job Title"
            placeholder="Software Engineer"
          />
          <TextInput
            className="bg-mine-shaft-900 rounded-lg p-1 px-2 text-mine-shaft-100 [&_input]:text-mine-shaft-100"
            variant="unstyled"
            label="Job Type"
            placeholder="Full-time"
          />
          <div className="flex items-center justify-center h-full w-20 bg-bright-sun-500 rounded-lg text-mine-shaft-100 p-2 hover:bg-bright-sun-600 cursor-pointer">
            <IconSearch className="h-[85%] w-[85%]" />
          </div>
        </div>
      </div>
      <div className="w-[55%] flex items-center justify-center">
        <div className="w-[30rem] relative">
          <img src="/Boy.png" alt="boy" />
          <div className="absolute -right-10 w-fit top-[50%] border-bright-sun-400 border rounded-lg p-2 backdrop-blur-md">
            <div className="text-center mb-1 text-sm text-mine-shaft-100">
              20K+ got job!
            </div>
            <Avatar.Group>
              <Avatar src="avatar.png" />
              <Avatar src="avatar1.png" />
              <Avatar src="avatar2.png" />
              <Avatar>+19K</Avatar>
            </Avatar.Group>
          </div>
          <div className="absolute -left-10 w-fit top-[24%] border-bright-sun-400 border rounded-lg p-2 backdrop-blur-md gap-3">
            <div className="flex gap-2 items-center">
                <div className="w-10 h-10 p-1 bg-mine-shaft-900 rounded-lg">
                    <img src="/Google.png" alt="" />
                </div>
                <div className="text-sm text-mine-shaft-100">
                    <div>Software Engineer</div>
                    <div className="text-mine-shaft-200 text-xs">San Francisco, CA</div>
                </div>
            </div>
            <div className="flex gap-2 justify-around text-mine-shaft-200 text-xs mt-2">
                <span>1 day ago</span>
                <span>120 Applicants</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DreamJob;