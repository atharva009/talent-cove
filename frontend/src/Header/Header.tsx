import { Avatar, Indicator, Button, Menu } from "@mantine/core";
import { IconAsset, IconBell, IconSettings, IconLogout, IconUser, IconBriefcase } from "@tabler/icons-react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import NavLinks from "./NavLinks";

const Header = () => {
  const { user, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <div className="w-full h-24 text-white flex justify-between items-center px-6 bg-mine-shaft-950 font-[Poppins]">
      <Link to="/" className="flex gap-2 items-center">
        <IconAsset className="h-10 w-10 text-bright-sun-400" stroke={2} />
        <div className="text-3xl font-semibold text-bright-sun-200">
          TalentCove
        </div>
      </Link>
      <NavLinks />
      <div className="flex gap-5 items-center">
        {isAuthenticated && user ? (
          <>
            <Menu shadow="md" width={200}>
              <Menu.Target>
                <div className="flex gap-2 items-center cursor-pointer">
                  <Avatar color="yellow" radius="xl">
                    {getInitials(user.name)}
                  </Avatar>
                  <div className="text-sm">
                    <div className="font-semibold">{user.name}</div>
                    <div className="text-xs text-mine-shaft-400">{user.role}</div>
                  </div>
                </div>
              </Menu.Target>
              <Menu.Dropdown>
                <Menu.Item
                  leftSection={<IconUser size={14} />}
                  component={Link}
                  to="/my-profile"
                >
                  My Profile
                </Menu.Item>
                <Menu.Item
                  leftSection={<IconBriefcase size={14} />}
                  component={Link}
                  to="/my-applications"
                >
                  My Applications
                </Menu.Item>
                <Menu.Item leftSection={<IconSettings size={14} />}>
                  Settings
                </Menu.Item>
                <Menu.Divider />
                <Menu.Item
                  color="red"
                  leftSection={<IconLogout size={14} />}
                  onClick={handleLogout}
                >
                  Logout
                </Menu.Item>
              </Menu.Dropdown>
            </Menu>
            <div className="bg-mine-shaft-900 p-2 rounded-full cursor-pointer">
              <IconSettings stroke={1.5} />
            </div>
            <div className="bg-mine-shaft-900 p-2 rounded-full cursor-pointer">
              <Indicator color="brightSun.5" size={10} offset={2} processing>
                <IconBell stroke={1.5} />
              </Indicator>
            </div>
          </>
        ) : (
          <div className="flex gap-3">
            <Button
              variant="subtle"
              color="brightSun.4"
              component={Link}
              to="/login"
            >
              Login
            </Button>
            <Button
              color="brightSun.4"
              component={Link}
              to="/register"
            >
              Sign Up
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;
