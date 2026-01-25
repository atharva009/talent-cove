import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Button, TextInput, PasswordInput, Text, Alert, Select } from '@mantine/core';
import { IconAlertCircle } from '@tabler/icons-react';
import { useAuth } from '../context/AuthContext';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [role, setRole] = useState<string | null>('USER');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    setLoading(true);

    try {
      await register({ name, email, password, role: role || undefined });
      navigate('/');
    } catch (err: any) {
      setError(err.message || 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[100vh] bg-mine-shaft-950 font-[Poppins] flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-mine-shaft-900 p-8 rounded-xl shadow-lg">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-bright-sun-400 mb-2">Create Account</h1>
          <Text c="dimmed">Join TalentCove today</Text>
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

        <form onSubmit={handleSubmit} className="space-y-4">
          <TextInput
            label="Full Name"
            placeholder="John Doe"
            value={name}
            onChange={(e) => setName(e.currentTarget.value)}
            required
            size="md"
            minLength={2}
            styles={{
              label: { color: 'var(--mantine-color-mineShaft-2)' },
              input: { backgroundColor: 'var(--mantine-color-mineShaft-8)' },
            }}
          />

          <TextInput
            label="Email"
            placeholder="your.email@example.com"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.currentTarget.value)}
            required
            size="md"
            styles={{
              label: { color: 'var(--mantine-color-mineShaft-2)' },
              input: { backgroundColor: 'var(--mantine-color-mineShaft-8)' },
            }}
          />

          <Select
            label="Account Type"
            placeholder="Select account type"
            value={role}
            onChange={setRole}
            data={[
              { value: 'USER', label: 'Job Seeker' },
              { value: 'EMPLOYER', label: 'Employer' },
            ]}
            size="md"
            styles={{
              label: { color: 'var(--mantine-color-mineShaft-2)' },
              input: { backgroundColor: 'var(--mantine-color-mineShaft-8)' },
            }}
          />

          <PasswordInput
            label="Password"
            placeholder="Enter your password (min 6 characters)"
            value={password}
            onChange={(e) => setPassword(e.currentTarget.value)}
            required
            size="md"
            minLength={6}
            styles={{
              label: { color: 'var(--mantine-color-mineShaft-2)' },
              input: { backgroundColor: 'var(--mantine-color-mineShaft-8)' },
            }}
          />

          <PasswordInput
            label="Confirm Password"
            placeholder="Confirm your password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.currentTarget.value)}
            required
            size="md"
            styles={{
              label: { color: 'var(--mantine-color-mineShaft-2)' },
              input: { backgroundColor: 'var(--mantine-color-mineShaft-8)' },
            }}
          />

          <Button
            type="submit"
            fullWidth
            size="md"
            color="brightSun.4"
            loading={loading}
            mt="xl"
          >
            Create Account
          </Button>
        </form>

        <Text ta="center" mt="md" c="dimmed">
          Already have an account?{' '}
          <Link to="/login" className="text-bright-sun-400 hover:underline">
            Sign in
          </Link>
        </Text>
      </div>
    </div>
  );
};

export default Register;
