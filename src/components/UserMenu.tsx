import { useUserContext } from "@/contexts/user";
import { Avatar, Box, Button, IconButton, Menu, MenuItem } from "@mui/material";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function UserMenu() {
  const { user, setUser } = useUserContext();
  const router = useRouter();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const logout = () => {
    setUser(null);
    router.push("/");
  };

  return (
    <>
      <IconButton onClick={handleClick}>
        <Avatar>{`${user?.firstName?.at(0)}${user?.lastName?.at(0)}`}</Avatar>
      </IconButton>
      <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
        <MenuItem onClick={() => router.push("/profile")}>Profile</MenuItem>
        <MenuItem onClick={logout}>Log out</MenuItem>
      </Menu>
    </>
  );
}
