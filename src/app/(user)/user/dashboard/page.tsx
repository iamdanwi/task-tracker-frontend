/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "sonner";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Trash2, Plus, CalendarIcon } from "lucide-react";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { format } from "date-fns";
import { DashboardHeader } from "@/components/dashboard-header";

interface Task {
  _id: string;
  name: string;
  description?: string;
  dueDate: string;
  status: string;
}

export default function DashboardPage() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTask, setNewTask] = useState({
    name: "",
    description: "",
    dueDate: "",
  });
  const [loading, setLoading] = useState(false);

  // Fetch tasks
  const fetchTasks = async () => {
    try {
      const res = await axios.get("/api/task/get", { withCredentials: true });
      setTasks(res.data);
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Failed to load tasks");
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  // Add task
  const addTask = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTask.name || !newTask.dueDate) {
      toast.error("Name and due date are required");
      return;
    }
    setLoading(true);
    try {
      await axios.post("/api/task/create", newTask, { withCredentials: true });
      toast.success("Task created 🎯");
      setNewTask({ name: "", description: "", dueDate: "" });
      fetchTasks();
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Failed to create task");
    } finally {
      setLoading(false);
    }
  };

  // Toggle status
  const toggleTask = async (task: Task) => {
    try {
      await axios.put(
        "/api/task/update",
        {
          id: task._id,
          status: task.status === "completed" ? "pending" : "completed",
        },
        { withCredentials: true }
      );
      fetchTasks();
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Failed to update task");
    }
  };

  // Delete task
  const deleteTask = async (id: string) => {
    try {
      await axios.delete("/api/task/delete", {
        data: { id },
        withCredentials: true,
      });
      fetchTasks();
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Failed to delete task");
    }
  };

  // Split tasks
  const pendingTasks = tasks.filter((t) => t.status === "pending");
  const completedTasks = tasks.filter((t) => t.status === "completed");

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-950">
      <DashboardHeader />

      {/* Page header */}
      <div className="max-w-5xl mx-auto px-6 py-10">
        <h1 className="text-3xl font-bold mb-2 text-gray-900 dark:text-gray-100">
          Task Dashboard
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mb-8">
          Manage your tasks efficiently. Add new tasks, mark them complete, and
          keep track of deadlines.
        </p>

        {/* Add Task Form */}
        <Card className="mb-8 bg-white dark:bg-gray-900 border dark:border-gray-800">
          <CardContent className="pt-6">
            <form
              onSubmit={addTask}
              className="flex flex-col md:flex-row gap-2"
            >
              <Input
                placeholder="Task name"
                value={newTask.name}
                onChange={(e) =>
                  setNewTask({ ...newTask, name: e.target.value })
                }
                required
              />
              <Input
                placeholder="Description (optional)"
                value={newTask.description}
                onChange={(e) =>
                  setNewTask({ ...newTask, description: e.target.value })
                }
              />
              {/* Calendar */}
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={`justify-start text-left font-normal ${
                      !newTask.dueDate && "text-muted-foreground"
                    }`}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {newTask.dueDate
                      ? format(new Date(newTask.dueDate), "PPP")
                      : "Pick due date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={
                      newTask.dueDate ? new Date(newTask.dueDate) : undefined
                    }
                    onSelect={(date) =>
                      setNewTask({
                        ...newTask,
                        dueDate: date?.toISOString() || "",
                      })
                    }
                    disabled={(date) =>
                      date < new Date(new Date().setHours(0, 0, 0, 0))
                    }
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              <Button type="submit" disabled={loading} className="flex gap-1">
                <Plus size={16} /> {loading ? "Adding..." : "Add"}
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Tabs */}
        <Tabs defaultValue="pending" className="w-full">
          <TabsList className="grid grid-cols-2 w-full bg-gray-100 dark:bg-gray-800">
            <TabsTrigger value="pending">Pending</TabsTrigger>
            <TabsTrigger value="completed">Completed</TabsTrigger>
          </TabsList>

          {/* Pending */}
          <TabsContent value="pending">
            {pendingTasks.length === 0 ? (
              <p className="text-gray-500 dark:text-gray-400 text-center py-6">
                No pending tasks 🎉
              </p>
            ) : (
              <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 mt-6">
                {pendingTasks.map((task) => (
                  <Card
                    key={task._id}
                    className="p-4 flex flex-col gap-3 bg-white dark:bg-gray-900 border dark:border-gray-800"
                  >
                    <div className="flex items-center gap-2">
                      <Checkbox
                        checked={false}
                        onCheckedChange={() => toggleTask(task)}
                      />
                      <p className="font-medium text-gray-900 dark:text-gray-100">
                        {task.name}
                      </p>
                    </div>
                    {task.description && (
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {task.description}
                      </p>
                    )}
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      Due: {new Date(task.dueDate).toLocaleDateString()}
                    </p>
                    <Button
                      variant="destructive"
                      size="icon"
                      onClick={() => deleteTask(task._id)}
                      className="self-end"
                    >
                      <Trash2 size={16} />
                    </Button>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>

          {/* Completed */}
          <TabsContent value="completed">
            {completedTasks.length === 0 ? (
              <p className="text-gray-500 dark:text-gray-400 text-center py-6">
                No completed tasks
              </p>
            ) : (
              <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 mt-6">
                {completedTasks.map((task) => (
                  <Card
                    key={task._id}
                    className="p-4 flex flex-col gap-3 bg-white dark:bg-gray-900 border dark:border-gray-800"
                  >
                    <div className="flex items-center gap-2">
                      <Checkbox
                        checked
                        onCheckedChange={() => toggleTask(task)}
                      />
                      <p className="font-medium line-through text-gray-400 dark:text-gray-500">
                        {task.name}
                      </p>
                    </div>
                    {task.description && (
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {task.description}
                      </p>
                    )}
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      Due: {new Date(task.dueDate).toLocaleDateString()}
                    </p>
                    <Button
                      variant="destructive"
                      size="icon"
                      onClick={() => deleteTask(task._id)}
                      className="self-end"
                    >
                      <Trash2 size={16} />
                    </Button>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </main>
  );
}
