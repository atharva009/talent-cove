import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Card, Text, Badge, Loader, Divider, Alert } from "@mantine/core";
import { IconArrowLeft, IconBriefcase, IconMapPin, IconClock, IconAlertCircle } from "@tabler/icons-react";
import { useAuth } from "../context/AuthContext";
import { apiClient, ApplicationDTO } from "../services/api";

const MyApplications = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [applications, setApplications] = useState<ApplicationDTO[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
      return;
    }
    fetchApplications();
  }, [isAuthenticated, navigate]);

  const fetchApplications = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await apiClient.getMyApplications();
      setApplications(data);
    } catch (err: any) {
      setError(err.message || "Failed to load applications");
      console.error("Error fetching applications:", err);
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "ACCEPTED":
        return "green";
      case "REJECTED":
        return "red";
      case "REVIEWED":
        return "blue";
      default:
        return "yellow";
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case "ACCEPTED":
        return "Accepted";
      case "REJECTED":
        return "Rejected";
      case "REVIEWED":
        return "Under Review";
      default:
        return "Pending";
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  if (loading) {
    return (
      <div className="min-h-[100vh] bg-mine-shaft-950 font-[Poppins] p-4 flex justify-center items-center">
        <Loader size="lg" />
      </div>
    );
  }

  return (
    <div className="min-h-[100vh] bg-mine-shaft-950 font-[Poppins] p-4">
      <Divider size="xs" />
      <div className="max-w-6xl mx-auto mt-8">
        <Button
          leftSection={<IconArrowLeft size={20} />}
          color="brightSun.4"
          variant="light"
          onClick={() => navigate(-1)}
          mb="xl"
        >
          Back
        </Button>

        <div className="text-3xl font-semibold mb-6 text-mine-shaft-100">
          My Applications
        </div>

        {error && (
          <Alert
            icon={<IconAlertCircle size={16} />}
            title="Error"
            color="red"
            mb="md"
            variant="light"
          >
            {error}
          </Alert>
        )}

        {applications.length === 0 ? (
          <Card className="bg-mine-shaft-900 p-8 text-center">
            <Text size="lg" c="dimmed" mb="md">
              You haven't applied for any jobs yet.
            </Text>
            <Button
              color="brightSun.4"
              onClick={() => navigate("/find-jobs")}
            >
              Browse Jobs
            </Button>
          </Card>
        ) : (
          <div className="space-y-4">
            {applications.map((application) => (
              <Card
                key={application.id}
                className="bg-mine-shaft-900 p-6 hover:shadow-lg transition-shadow"
              >
                <div className="flex justify-between items-start mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <Text size="xl" fw={600} className="text-mine-shaft-100">
                        {application.jobTitle}
                      </Text>
                      <Badge
                        color={getStatusColor(application.status)}
                        variant="light"
                        size="lg"
                      >
                        {getStatusLabel(application.status)}
                      </Badge>
                    </div>
                    <Text size="lg" c="dimmed" mb="xs">
                      {application.company}
                    </Text>
                    <div className="flex gap-4 text-sm text-mine-shaft-400">
                      <div className="flex items-center gap-1">
                        <IconMapPin size={16} />
                        {application.location}
                      </div>
                      <div className="flex items-center gap-1">
                        <IconBriefcase size={16} />
                        ${application.salary.toLocaleString()}
                      </div>
                      <div className="flex items-center gap-1">
                        <IconClock size={16} />
                        Applied {formatDate(application.applicationDate)}
                      </div>
                    </div>
                  </div>
                </div>
                <Divider my="md" />
                <div className="flex justify-between items-center">
                  <Text size="sm" c="dimmed">
                    Application ID: #{application.id}
                  </Text>
                  <Button
                    variant="light"
                    color="brightSun.4"
                    onClick={() => navigate(`/find-jobs`)}
                  >
                    View Job
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyApplications;
