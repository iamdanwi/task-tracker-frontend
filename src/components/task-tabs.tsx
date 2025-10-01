"use client";

import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";

interface Task {
  _id: string;
  name: string;
  description?: string;
  dueDate: string;
  status: string;
}

interface TaskTabsProps {
  tasks: Task[];
  toggleTask: (task: Task) => void;
  deleteTask: (id: string) => void;
}

export function TaskTabs({ tasks, toggleTask, deleteTask }: TaskTabsProps) {
  const pendingTasks = tasks.filter((t) => t.status === "pending");
  const completedTasks = tasks.filter((t) => t.status === "completed");

  return (
    <Tabs defaultValue="pending" className="w-full">
      {/* Tabs Navigation */}
      <TabsList className="grid w-full grid-cols-2 bg-gray-100 dark:bg-gray-800">
        <TabsTrigger value="pending">Pending</TabsTrigger>
        <TabsTrigger value="completed">Completed</TabsTrigger>
      </TabsList>

      {/* Pending Tasks */}
      <TabsContent value="pending">
        {pendingTasks.length === 0 ? (
          <p className="text-gray-500 dark:text-gray-400 text-center py-6">
            No pending tasks 🎉
          </p>
        ) : (
          <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 mt-4">
            {pendingTasks.map((task) => (
              <Card
                key={task._id}
                className="flex flex-col justify-between bg-white dark:bg-gray-900 border dark:border-gray-700"
              >
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-gray-900 dark:text-gray-100">
                    <Checkbox
                      checked={false}
                      onCheckedChange={() => toggleTask(task)}
                    />
                    <span>{task.name}</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="flex flex-col gap-2">
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
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </TabsContent>

      {/* Completed Tasks */}
      <TabsContent value="completed">
        {completedTasks.length === 0 ? (
          <p className="text-gray-500 dark:text-gray-400 text-center py-6">
            No completed tasks
          </p>
        ) : (
          <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 mt-4">
            {completedTasks.map((task) => (
              <Card
                key={task._id}
                className="flex flex-col justify-between bg-white dark:bg-gray-900 border dark:border-gray-700"
              >
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 line-through text-gray-400 dark:text-gray-500">
                    <Checkbox
                      checked={true}
                      onCheckedChange={() => toggleTask(task)}
                    />
                    <span>{task.name}</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="flex flex-col gap-2">
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
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </TabsContent>
    </Tabs>
  );
}
