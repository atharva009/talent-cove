import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Button, TextInput, PasswordInput, Text, Alert } from '@mantine/core';
import { IconAlertCircle } from '@tabler/icons-react';
import { useAuth } from '../context/AuthContext';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await login({ email, password });
      navigate('/');
    } catch (err: any) {
      setError(err.message || 'Login failed. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[100vh] bg-mine-shaft-950 font-[Poppins] flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-mine-shaft-900 p-8 rounded-xl shadow-lg">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-bright-sun-400 mb-2">Welcome Back</h1>
          <Text c="dimmed">Sign in to your TalentCove account</Text>
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

          <PasswordInput
            label="Password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.currentTarget.value)}
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
            Sign In
          </Button>
        </form>

        <Text ta="center" mt="md" c="dimmed">
          Don't have an account?{' '}
          <Link to="/register" className="text-bright-sun-400 hover:underline">
            Sign up
          </Link>
        </Text>
      </div>
    </div>
  );
};

export default Login;
