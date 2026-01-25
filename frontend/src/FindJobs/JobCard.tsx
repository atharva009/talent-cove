import { useState, useEffect } from "react";
import { Divider, Text, Button, Loader } from "@mantine/core";
import { IconBookmark, IconClockHour3, IconCheck } from "@tabler/icons-react";
import { useAuth } from "../context/AuthContext";
import { apiClient } from "../services/api";
import { useNavigate } from "react-router-dom";

interface JobCardProps {
  id: number;
  company: string;
  jobTitle: string;
  applicants: number;
  experience: string;
  employmentType: string;
  location: string;
  description: string;
  salary: number | string;
  postedDaysAgo: number;
}

const JobCard = (props: JobCardProps) => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [hasApplied, setHasApplied] = useState(false);
  const [isApplying, setIsApplying] = useState(false);
  const [checkingStatus, setCheckingStatus] = useState(true);

  useEffect(() => {
    if (isAuthenticated) {
      checkApplicationStatus();
    } else {
      setCheckingStatus(false);
    }
  }, [isAuthenticated, props.id]);

  const checkApplicationStatus = async () => {
    try {
      const applied = await apiClient.hasApplied(props.id);
      setHasApplied(applied);
    } catch (error) {
      console.error("Error checking application status:", error);
    } finally {
      setCheckingStatus(false);
    }
  };

  const handleApply = async () => {
    if (!isAuthenticated) {
      navigate("/login");
      return;
    }

    setIsApplying(true);
    try {
      await apiClient.applyForJobQuery(props.id);
      setHasApplied(true);
      // Show success message
      alert(`Successfully applied for ${props.jobTitle} at ${props.company}!`);
    } catch (error: any) {
      console.error("Error applying for job:", error);
      const errorMessage = error.message || "Failed to apply for job. Please try again.";
      alert(errorMessage);
    } finally {
      setIsApplying(false);
    }
  };

  return (
    <div className="p-4 bg-mine-shaft-900 w-72 flex flex-col gap-4 rounded-xl hover:shadow-[0_0_5px_1px_yellow] !shadow-bright-sun-400">
      <div className="flex justify-between">
        <div className="flex gap-2 items-center">
          <div className="p-2 bg-mine-shaft-200 rounded-md">
            <img className="h-7" src={`/Icons/${props.company}.png`} alt="" />
          </div>
          <div className="flex flex-col gap-1">
            <div className="font-semibold">{props.jobTitle}</div>
            <div className="text-xs text-mine-shaft-300">
              {props.company} &#x2022; {props.applicants} Applicants
            </div>
          </div>
        </div>
        <IconBookmark className="text-mine-shaft-300 cursor-pointer" />
      </div>
      <div className="flex gap-2 [&>div]:py-1 [&>div]:px-2 [&>div]:bg-mine-shaft-800 [&>div]:text-bright-sun-400 [&>div]:rounded-md text-xs">
        <div>{props.experience}</div>
        <div>{props.employmentType}</div>
        <div>{props.location}</div>
      </div>
      <Text
        className="!text-xs text-justify !text-mine-shaft-300"
        lineClamp={3}
      >
        {props.description}
      </Text>
      <Divider size="xs" color="mineShaft.7" />
      <div className="flex justify-between items-center">
        <div className="font-semibold text-mine-shaft-200">
          ${typeof props.salary === 'number' ? props.salary.toLocaleString() : props.salary}
        </div>
        <div className="flex gap-1 text-mine-shaft-400 text-xs items-center">
          <IconClockHour3 className="h-5 w-5" stroke={1.5} /> {props.postedDaysAgo} days ago
        </div>
      </div>
      {checkingStatus ? (
        <Button
          fullWidth
          color="brightSun.4"
          variant="light"
          disabled
          leftSection={<Loader size="xs" />}
        >
          Checking...
        </Button>
      ) : hasApplied ? (
        <Button
          fullWidth
          color="green"
          variant="light"
          disabled
          leftSection={<IconCheck size={16} />}
        >
          Applied
        </Button>
      ) : (
        <Button
          fullWidth
          color="brightSun.4"
          onClick={handleApply}
          loading={isApplying}
        >
          {isAuthenticated ? "Apply Now" : "Login to Apply"}
        </Button>
      )}
    </div>
  );
};

export default JobCard;
