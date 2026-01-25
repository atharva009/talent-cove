import { useEffect, useState } from "react";
import { Button, Divider, Loader, Text } from "@mantine/core";
import { IconArrowLeft } from "@tabler/icons-react";
import { Link, useSearchParams } from "react-router-dom";
import Profile from "../TalentProfile/Profile";
import { apiClient, TalentProfileDTO } from "../services/api";
import RecommendTalent from "../TalentProfile/RecommendTalent";

const TalentProfile = () => {
  const [searchParams] = useSearchParams();
  const talentId = searchParams.get("id") || "1"; // Default to ID 1 if not provided
  const [profile, setProfile] = useState<TalentProfileDTO | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchProfile();
  }, [talentId]);

  const fetchProfile = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await apiClient.getTalentProfile(parseInt(talentId));
      setProfile(data);
    } catch (err) {
      setError("Failed to load profile. Please try again later.");
      console.error("Error fetching profile:", err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-[100vh] bg-mine-shaft-950 font-[Poppins] p-4 flex justify-center items-center">
        <Loader size="lg" />
      </div>
    );
  }

  if (error || !profile) {
    return (
      <div className="min-h-[100vh] bg-mine-shaft-950 font-[Poppins] p-4">
        <Divider size="xs" />
        <Link className="my-4 inline-block" to="/find-talent">
          <Button leftSection={<IconArrowLeft size={20} />} color="brightSun.4" variant="light">
            Back
          </Button>
        </Link>
        <div className="flex justify-center items-center min-h-[400px]">
          <Text c="red">{error || "Profile not found"}</Text>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-[100vh] bg-mine-shaft-950 font-[Poppins] p-4">
      <Divider size="xs" />
      <Link className="my-4 inline-block" to="/find-talent">
        <Button leftSection={<IconArrowLeft size={20} />} color="brightSun.4" variant="light">
          Back
        </Button>
      </Link>
      <div className="flex gap-5">
        <Profile
          name={profile.name}
          role={profile.role}
          company={profile.company}
          location={profile.location}
          about={profile.about}
          skills={profile.skills}
          experience={profile.experience}
          certifications={profile.certifications}
        />
        <RecommendTalent />
      </div>
    </div>
  );
};

export default TalentProfile;