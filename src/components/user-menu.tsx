"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Mail, Lock, LogOut, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "sonner";
import { ThemeToggle } from "./theme-toggle";

interface UserMenuProps {
  name: string;
  email?: string;
}

export function UserMenu({ name, email }: UserMenuProps) {
  const router = useRouter();
  const initial = name.charAt(0).toUpperCase();

  const handleLogout = async () => {
    try {
      await axios.post("/api/auth/logout", {}, { withCredentials: true });
      toast.success("Logged out successfully");
      router.push("/login");
    } catch {
      toast.error("Logout failed");
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Avatar className="cursor-pointer h-12 w-12">
          <AvatarFallback className="font-bold text-xl">
            {initial}
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>
          <div className="flex flex-col">
            <span className="font-medium">{name}</span>
            {email && (
              <span className="text-xs text-muted-foreground">{email}</span>
            )}
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <Mail className="mr-2 h-4 w-4" />
            <span>Change Email</span>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Lock className="mr-2 h-4 w-4" />
            <span>Change Password</span>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <ThemeToggle />
        <DropdownMenuItem
          onClick={handleLogout}
          className="text-yellow-600 focus:text-yellow-700"
        >
          <LogOut className="mr-2 h-4 w-4" />
          <span>Log Out</span>
        </DropdownMenuItem>
        <DropdownMenuItem className="text-red-600 focus:text-red-700">
          <Trash2 className="mr-2 h-4 w-4" />
          <span>Delete Account</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
