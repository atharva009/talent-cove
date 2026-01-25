import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Button,
  Card,
  Text,
  TextInput,
  Textarea,
  Loader,
  Divider,
  Badge,
  Modal,
  NumberInput,
  ActionIcon,
  Group,
  Stack,
  Alert,
} from "@mantine/core";
import {
  IconArrowLeft,
  IconEdit,
  IconTrash,
  IconPlus,
  IconCheck,
  IconX,
  IconAlertCircle,
} from "@tabler/icons-react";
import { useAuth } from "../context/AuthContext";
import { apiClient, TalentProfileDTO } from "../services/api";

const MyProfile = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [profile, setProfile] = useState<TalentProfileDTO | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [editMode, setEditMode] = useState(false);
  const [saving, setSaving] = useState(false);

  // Form state
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [company, setCompany] = useState("");
  const [location, setLocation] = useState("");
  const [about, setAbout] = useState("");
  const [skills, setSkills] = useState<string[]>([]);
  const [newSkill, setNewSkill] = useState("");

  // Modals
  const [experienceModalOpen, setExperienceModalOpen] = useState(false);
  const [certificationModalOpen, setCertificationModalOpen] = useState(false);
  const [editingExperience, setEditingExperience] = useState<any>(null);
  const [editingCertification, setEditingCertification] = useState<any>(null);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
      return;
    }
    fetchProfile();
  }, [isAuthenticated, navigate]);

  const fetchProfile = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await apiClient.getMyProfile();
      setProfile(data);
      initializeForm(data);
    } catch (err: any) {
      setError(err.message || "Failed to load profile");
      console.error("Error fetching profile:", err);
    } finally {
      setLoading(false);
    }
  };

  const initializeForm = (data: TalentProfileDTO) => {
    setName(data.name || "");
    setRole(data.role || "");
    setCompany(data.company || "");
    setLocation(data.location || "");
    setAbout(data.about || "");
    setSkills(data.skills || []);
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const updated = await apiClient.updateMyProfile({
        name,
        role,
        company,
        location,
        about,
        skills,
      });
      setProfile(updated);
      setEditMode(false);
      alert("Profile updated successfully!");
    } catch (err: any) {
      alert(err.message || "Failed to update profile");
    } finally {
      setSaving(false);
    }
  };

  const handleCancel = () => {
    if (profile) {
      initializeForm(profile);
    }
    setEditMode(false);
  };

  const addSkill = () => {
    if (newSkill.trim() && !skills.includes(newSkill.trim())) {
      setSkills([...skills, newSkill.trim()]);
      setNewSkill("");
    }
  };

  const removeSkill = (skill: string) => {
    setSkills(skills.filter((s) => s !== skill));
  };

  const handleAddExperience = async (experience: any) => {
    try {
      await apiClient.addExperience(experience);
      await fetchProfile();
      setExperienceModalOpen(false);
      alert("Experience added successfully!");
    } catch (err: any) {
      alert(err.message || "Failed to add experience");
    }
  };

  const handleUpdateExperience = async (id: number, experience: any) => {
    try {
      await apiClient.updateExperience(id, experience);
      await fetchProfile();
      setExperienceModalOpen(false);
      setEditingExperience(null);
      alert("Experience updated successfully!");
    } catch (err: any) {
      alert(err.message || "Failed to update experience");
    }
  };

  const handleDeleteExperience = async (id: number) => {
    if (!confirm("Are you sure you want to delete this experience?")) return;
    try {
      await apiClient.deleteExperience(id);
      await fetchProfile();
      alert("Experience deleted successfully!");
    } catch (err: any) {
      alert(err.message || "Failed to delete experience");
    }
  };

  const handleAddCertification = async (certification: any) => {
    try {
      await apiClient.addCertification(certification);
      await fetchProfile();
      setCertificationModalOpen(false);
      alert("Certification added successfully!");
    } catch (err: any) {
      alert(err.message || "Failed to add certification");
    }
  };

  const handleUpdateCertification = async (id: number, certification: any) => {
    try {
      await apiClient.updateCertification(id, certification);
      await fetchProfile();
      setCertificationModalOpen(false);
      setEditingCertification(null);
      alert("Certification updated successfully!");
    } catch (err: any) {
      alert(err.message || "Failed to update certification");
    }
  };

  const handleDeleteCertification = async (id: number) => {
    if (!confirm("Are you sure you want to delete this certification?")) return;
    try {
      await apiClient.deleteCertification(id);
      await fetchProfile();
      alert("Certification deleted successfully!");
    } catch (err: any) {
      alert(err.message || "Failed to delete certification");
    }
  };

  if (loading) {
    return (
      <div className="min-h-[100vh] bg-mine-shaft-950 font-[Poppins] p-4 flex justify-center items-center">
        <Loader size="lg" />
      </div>
    );
  }

  if (error && !profile) {
    return (
      <div className="min-h-[100vh] bg-mine-shaft-950 font-[Poppins] p-4">
        <Alert icon={<IconAlertCircle size={16} />} title="Error" color="red" variant="light">
          {error}
        </Alert>
        <Button mt="md" onClick={fetchProfile}>
          Retry
        </Button>
      </div>
    );
  }

  return (
    <div className="min-h-[100vh] bg-mine-shaft-950 font-[Poppins] p-4">
      <div className="max-w-6xl mx-auto">
        <Button
          leftSection={<IconArrowLeft size={20} />}
          color="brightSun.4"
          variant="light"
          onClick={() => navigate(-1)}
          mb="xl"
        >
          Back
        </Button>

        <div className="flex justify-between items-center mb-6">
          <Text size="xl" fw={700} className="text-mine-shaft-100">
            My Profile
          </Text>
          {!editMode ? (
            <Button
              leftSection={<IconEdit size={16} />}
              color="brightSun.4"
              onClick={() => setEditMode(true)}
            >
              Edit Profile
            </Button>
          ) : (
            <Group>
              <Button
                variant="outline"
                color="red"
                onClick={handleCancel}
                leftSection={<IconX size={16} />}
              >
                Cancel
              </Button>
              <Button
                color="brightSun.4"
                onClick={handleSave}
                loading={saving}
                leftSection={<IconCheck size={16} />}
              >
                Save Changes
              </Button>
            </Group>
          )}
        </div>

        <Card className="bg-mine-shaft-900 p-6 mb-6">
          <Stack gap="md">
            <div>
              <Text size="sm" c="dimmed" mb={4}>
                Name
              </Text>
              {editMode ? (
                <TextInput
                  value={name}
                  onChange={(e) => setName(e.currentTarget.value)}
                  placeholder="Your full name"
                />
              ) : (
                <Text size="lg">{profile?.name || "Not set"}</Text>
              )}
            </div>

            <div>
              <Text size="sm" c="dimmed" mb={4}>
                Role
              </Text>
              {editMode ? (
                <TextInput
                  value={role}
                  onChange={(e) => setRole(e.currentTarget.value)}
                  placeholder="Your current role"
                />
              ) : (
                <Text size="lg">{profile?.role || "Not set"}</Text>
              )}
            </div>

            <div>
              <Text size="sm" c="dimmed" mb={4}>
                Company
              </Text>
              {editMode ? (
                <TextInput
                  value={company}
                  onChange={(e) => setCompany(e.currentTarget.value)}
                  placeholder="Your company"
                />
              ) : (
                <Text size="lg">{profile?.company || "Not set"}</Text>
              )}
            </div>

            <div>
              <Text size="sm" c="dimmed" mb={4}>
                Location
              </Text>
              {editMode ? (
                <TextInput
                  value={location}
                  onChange={(e) => setLocation(e.currentTarget.value)}
                  placeholder="Your location"
                />
              ) : (
                <Text size="lg">{profile?.location || "Not set"}</Text>
              )}
            </div>

            <div>
              <Text size="sm" c="dimmed" mb={4}>
                About
              </Text>
              {editMode ? (
                <Textarea
                  value={about}
                  onChange={(e) => setAbout(e.currentTarget.value)}
                  placeholder="Tell us about yourself"
                  rows={4}
                />
              ) : (
                <Text>{profile?.about || "Not set"}</Text>
              )}
            </div>

            <div>
              <div className="flex justify-between items-center mb-4">
                <Text size="sm" c="dimmed">
                  Skills
                </Text>
                {editMode && (
                  <Button
                    size="xs"
                    leftSection={<IconPlus size={14} />}
                    onClick={() => {
                      const skill = prompt("Enter a skill:");
                      if (skill && !skills.includes(skill)) {
                        setSkills([...skills, skill]);
                      }
                    }}
                  >
                    Add Skill
                  </Button>
                )}
              </div>
              {editMode ? (
                <div className="flex flex-wrap gap-2">
                  {skills.map((skill, index) => (
                    <Badge
                      key={index}
                      color="brightSun"
                      rightSection={
                        <ActionIcon
                          size="xs"
                          color="brightSun"
                          radius="xl"
                          variant="transparent"
                          onClick={() => removeSkill(skill)}
                        >
                          <IconX size={10} />
                        </ActionIcon>
                      }
                    >
                      {skill}
                    </Badge>
                  ))}
                </div>
              ) : (
                <div className="flex flex-wrap gap-2">
                  {profile?.skills && profile.skills.length > 0 ? (
                    profile.skills.map((skill, index) => (
                      <Badge key={index} color="brightSun">
                        {skill}
                      </Badge>
                    ))
                  ) : (
                    <Text c="dimmed">No skills added</Text>
                  )}
                </div>
              )}
            </div>
          </Stack>
        </Card>

        {/* Experiences Section */}
        <Card className="bg-mine-shaft-900 p-6 mb-6">
          <div className="flex justify-between items-center mb-4">
            <Text size="lg" fw={600}>
              Experience
            </Text>
            <Button
              size="sm"
              leftSection={<IconPlus size={16} />}
              onClick={() => {
                setEditingExperience(null);
                setExperienceModalOpen(true);
              }}
            >
              Add Experience
            </Button>
          </div>
          <Divider mb="md" />
          {profile?.experience && profile.experience.length > 0 ? (
            <Stack gap="md">
              {profile.experience.map((exp, index) => (
                <Card key={index} className="bg-mine-shaft-800 p-4">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <Text fw={600} size="lg">
                        {exp.title}
                      </Text>
                      <Text c="dimmed">{exp.company}</Text>
                      <Text size="sm" c="dimmed">
                        {exp.location} • {exp.startDate} - {exp.endDate}
                      </Text>
                      {exp.description && (
                        <Text size="sm" mt="xs">
                          {exp.description}
                        </Text>
                      )}
                    </div>
                    <Group>
                      <ActionIcon
                        color="blue"
                        onClick={() => {
                          setEditingExperience({ ...exp, id: exp.id });
                          setExperienceModalOpen(true);
                        }}
                      >
                        <IconEdit size={16} />
                      </ActionIcon>
                      <ActionIcon
                        color="red"
                        onClick={() => {
                          if (exp.id) {
                            handleDeleteExperience(exp.id);
                          } else {
                            alert("Unable to delete: ID not available");
                          }
                        }}
                      >
                        <IconTrash size={16} />
                      </ActionIcon>
                    </Group>
                  </div>
                </Card>
              ))}
            </Stack>
          ) : (
            <Text c="dimmed">No experience added yet</Text>
          )}
        </Card>

        {/* Certifications Section */}
        <Card className="bg-mine-shaft-900 p-6">
          <div className="flex justify-between items-center mb-4">
            <Text size="lg" fw={600}>
              Certifications
            </Text>
            <Button
              size="sm"
              leftSection={<IconPlus size={16} />}
              onClick={() => {
                setEditingCertification(null);
                setCertificationModalOpen(true);
              }}
            >
              Add Certification
            </Button>
          </div>
          <Divider mb="md" />
          {profile?.certifications && profile.certifications.length > 0 ? (
            <Stack gap="md">
              {profile.certifications.map((cert, index) => (
                <Card key={index} className="bg-mine-shaft-800 p-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <Text fw={600} size="lg">
                        {cert.title}
                      </Text>
                      <Text c="dimmed">{cert.issuer}</Text>
                      <Text size="sm" c="dimmed">
                        Issued: {cert.issueDate}
                        {cert.credentialID && ` • ID: ${cert.credentialID}`}
                      </Text>
                    </div>
                    <Group>
                      <ActionIcon
                        color="blue"
                        onClick={() => {
                          setEditingCertification({ ...cert, id: cert.id });
                          setCertificationModalOpen(true);
                        }}
                      >
                        <IconEdit size={16} />
                      </ActionIcon>
                      <ActionIcon
                        color="red"
                        onClick={() => {
                          if (cert.id) {
                            handleDeleteCertification(cert.id);
                          } else {
                            alert("Unable to delete: ID not available");
                          }
                        }}
                      >
                        <IconTrash size={16} />
                      </ActionIcon>
                    </Group>
                  </div>
                </Card>
              ))}
            </Stack>
          ) : (
            <Text c="dimmed">No certifications added yet</Text>
          )}
        </Card>
      </div>

      {/* Experience Modal */}
      <ExperienceModal
        opened={experienceModalOpen}
        onClose={() => {
          setExperienceModalOpen(false);
          setEditingExperience(null);
        }}
        onSave={editingExperience ? handleUpdateExperience : handleAddExperience}
        editing={editingExperience}
      />

      {/* Certification Modal */}
      <CertificationModal
        opened={certificationModalOpen}
        onClose={() => {
          setCertificationModalOpen(false);
          setEditingCertification(null);
        }}
        onSave={
          editingCertification ? handleUpdateCertification : handleAddCertification
        }
        editing={editingCertification}
      />
    </div>
  );
};

// Experience Modal Component
const ExperienceModal = ({ opened, onClose, onSave, editing }: any) => {
  const [title, setTitle] = useState("");
  const [company, setCompany] = useState("");
  const [location, setLocation] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [isCurrent, setIsCurrent] = useState(false);
  const [description, setDescription] = useState("");

  const formatDateForDisplay = (dateStr: string): string => {
    // Convert "YYYY-MM-DD" or "MMM yyyy" to "MMM yyyy" for display
    if (!dateStr) return "";
    if (dateStr.includes("-") && dateStr.length === 10) {
      // ISO format: YYYY-MM-DD
      const [year, month, day] = dateStr.split("-");
      const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
      return `${months[parseInt(month) - 1]} ${year}`;
    }
    return dateStr; // Already in "MMM yyyy" format
  };

  useEffect(() => {
    if (editing) {
      setTitle(editing.title || "");
      setCompany(editing.company || "");
      setLocation(editing.location || "");
      setStartDate(formatDateForDisplay(editing.startDate || ""));
      setEndDate(editing.endDate === "Present" ? "" : formatDateForDisplay(editing.endDate || ""));
      setIsCurrent(editing.endDate === "Present" || !editing.endDate);
      setDescription(editing.description || "");
    } else {
      setTitle("");
      setCompany("");
      setLocation("");
      setStartDate("");
      setEndDate("");
      setIsCurrent(false);
      setDescription("");
    }
  }, [editing, opened]);

  const parseDate = (dateStr: string): string => {
    // Convert "MMM yyyy" to "yyyy-MM-01" for backend
    if (!dateStr) return "";
    const months: { [key: string]: string } = {
      "Jan": "01", "Feb": "02", "Mar": "03", "Apr": "04", "May": "05", "Jun": "06",
      "Jul": "07", "Aug": "08", "Sep": "09", "Oct": "10", "Nov": "11", "Dec": "12"
    };
    const parts = dateStr.trim().split(" ");
    if (parts.length === 2) {
      const month = months[parts[0]];
      const year = parts[1];
      if (month && year) {
        return `${year}-${month}-01`;
      }
    }
    return dateStr; // Return as-is if parsing fails
  };

  const handleSubmit = () => {
    const experience = {
      title,
      company,
      location,
      startDate: parseDate(startDate),
      endDate: isCurrent ? null : (endDate ? parseDate(endDate) : null),
      description,
      isCurrent,
    };
    if (editing && editing.id) {
      onSave(editing.id, experience);
    } else {
      onSave(experience);
    }
  };

  return (
    <Modal opened={opened} onClose={onClose} title="Add Experience" size="lg">
      <Stack gap="md">
        <TextInput
          label="Job Title"
          value={title}
          onChange={(e) => setTitle(e.currentTarget.value)}
          required
        />
        <TextInput
          label="Company"
          value={company}
          onChange={(e) => setCompany(e.currentTarget.value)}
          required
        />
        <TextInput
          label="Location"
          value={location}
          onChange={(e) => setLocation(e.currentTarget.value)}
          required
        />
        <TextInput
          label="Start Date (MMM yyyy)"
          value={startDate}
          onChange={(e) => setStartDate(e.currentTarget.value)}
          placeholder="e.g., Jan 2020"
          required
        />
        <div>
          <input
            type="checkbox"
            checked={isCurrent}
            onChange={(e) => setIsCurrent(e.target.checked)}
            className="mr-2"
          />
          <label>I currently work here</label>
        </div>
        {!isCurrent && (
          <TextInput
            label="End Date (MMM yyyy)"
            value={endDate}
            onChange={(e) => setEndDate(e.currentTarget.value)}
            placeholder="e.g., Dec 2022"
          />
        )}
        <Textarea
          label="Description"
          value={description}
          onChange={(e) => setDescription(e.currentTarget.value)}
          rows={4}
        />
        <Group justify="flex-end">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button color="brightSun.4" onClick={handleSubmit}>
            Save
          </Button>
        </Group>
      </Stack>
    </Modal>
  );
};

// Certification Modal Component
const CertificationModal = ({ opened, onClose, onSave, editing }: any) => {
  const [title, setTitle] = useState("");
  const [issuer, setIssuer] = useState("");
  const [issueDate, setIssueDate] = useState("");
  const [credentialId, setCredentialId] = useState("");

  const formatDateForDisplay = (dateStr: string): string => {
    // Convert "YYYY-MM-DD" or "MMM yyyy" to "MMM yyyy" for display
    if (!dateStr) return "";
    if (dateStr.includes("-") && dateStr.length === 10) {
      // ISO format: YYYY-MM-DD
      const [year, month, day] = dateStr.split("-");
      const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
      return `${months[parseInt(month) - 1]} ${year}`;
    }
    return dateStr; // Already in "MMM yyyy" format
  };

  useEffect(() => {
    if (editing) {
      setTitle(editing.title || "");
      setIssuer(editing.issuer || "");
      setIssueDate(formatDateForDisplay(editing.issueDate || ""));
      setCredentialId(editing.credentialID || "");
    } else {
      setTitle("");
      setIssuer("");
      setIssueDate("");
      setCredentialId("");
    }
  }, [editing, opened]);

  const parseDate = (dateStr: string): string => {
    // Convert "MMM yyyy" to "yyyy-MM-01" for backend
    if (!dateStr) return "";
    const months: { [key: string]: string } = {
      "Jan": "01", "Feb": "02", "Mar": "03", "Apr": "04", "May": "05", "Jun": "06",
      "Jul": "07", "Aug": "08", "Sep": "09", "Oct": "10", "Nov": "11", "Dec": "12"
    };
    const parts = dateStr.trim().split(" ");
    if (parts.length === 2) {
      const month = months[parts[0]];
      const year = parts[1];
      if (month && year) {
        return `${year}-${month}-01`;
      }
    }
    return dateStr; // Return as-is if parsing fails
  };

  const handleSubmit = () => {
    const certification = {
      title,
      issuer,
      issueDate: parseDate(issueDate),
      credentialId,
    };
    if (editing && editing.id) {
      onSave(editing.id, certification);
    } else {
      onSave(certification);
    }
  };

  return (
    <Modal opened={opened} onClose={onClose} title="Add Certification" size="lg">
      <Stack gap="md">
        <TextInput
          label="Certification Title"
          value={title}
          onChange={(e) => setTitle(e.currentTarget.value)}
          required
        />
        <TextInput
          label="Issuing Organization"
          value={issuer}
          onChange={(e) => setIssuer(e.currentTarget.value)}
          required
        />
        <TextInput
          label="Issue Date (MMM yyyy)"
          value={issueDate}
          onChange={(e) => setIssueDate(e.currentTarget.value)}
          placeholder="e.g., Jan 2020"
          required
        />
        <TextInput
          label="Credential ID (Optional)"
          value={credentialId}
          onChange={(e) => setCredentialId(e.currentTarget.value)}
        />
        <Group justify="flex-end">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button color="brightSun.4" onClick={handleSubmit}>
            Save
          </Button>
        </Group>
      </Stack>
    </Modal>
  );
};

export default MyProfile;
