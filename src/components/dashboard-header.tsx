"use client";

import { useEffect, useState } from "react";
import { UserMenu } from "./user-menu";
import axios from "axios";
import { toast } from "sonner";

interface User {
  id: string;
  name: string;
  email: string;
}

export function DashboardHeader() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchUser = async () => {
    try {
      const res = await axios.get("/api/user/get-user", {
        withCredentials: true,
      });
      setUser(res.data.user);
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        toast.error(
          (err.response?.data as { message?: string })?.message ||
            "Failed to fetch user"
        );
      } else {
        toast.error("Unexpected error fetching user");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <header className="flex items-center justify-between p-6 border-b bg-white dark:bg-gray-900 dark:border-gray-800">
      <div>
        <h1 className="text-2xl font-bold">
          Hi,{" "}
          <span className="text-primary">
            {loading ? "..." : user?.name || "Guest"}
          </span>
        </h1>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Anything the mind can conceive and believe, it can achieve.
        </p>
      </div>

      {!loading && user && <UserMenu name={user.name} email={user.email} />}
    </header>
  );
}
