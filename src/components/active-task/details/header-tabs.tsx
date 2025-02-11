"use client";

import { useEffect, useState } from "react";
import HeaderTab from "@/components/tabs/headerTabs";
import DeatilsPage from "./deatils-page";
import PhotosPage from "./vehicle-photos";
import CallSMSPage from "./show-call-sms-page";
import History from "./history-page";
import Tickets from "./tickets";
import Inventory from "./inventory";
import { useParams } from "next/navigation";
import { useTaskStore } from "@/hooks/active-task/use-active-task-details";
import { useTabStore } from "@/hooks/use-tabs";

const cardData = [
  { label: "Details", active: true, value: "Details" },
  { label: "Photos", active: true, value: "Photos" },
  { label: "SMS/Call", active: true, value: "SMS/Call" },
  { label: "History", active: true, value: "History" },
  { label: "Tickets", active: true, value: "Tickets" },
  { label: "Inventory", active: true, value: "Inventory" },
];

const cardData1 = [{ label1: "Filter", icon: "" }];

export default function HeaderTabs() {
  const { id } = useParams();
  const { setActiveTab, activeTab } = useTabStore();
  const { fetchTaskDetails } = useTaskStore();
  const [tasks, setTasks] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setActiveTab("Details");
      fetchTaskDetails(id);
    }
  }, [id, setActiveTab, fetchTaskDetails]);

  // // console.log('activeTab', activeTab)
  useEffect(() => {
    const fetchOngoingTask = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const token = localStorage.getItem("authToken");
        const parsedToken = token ? JSON.parse(token) : null;

        if (!parsedToken?.token) {
          throw new Error("No auth token found");
        }

        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/get-ongoing-task`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${parsedToken.token}`,
            },
            body: JSON.stringify({ task_id: id }),
          }
        );

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        
        if (!data.data) {
          throw new Error("No data received from server");
        }

        setTasks(data.data);
      } catch (error) {
        console.error("Error fetching ongoing task:", error);
        // setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    if (id) {
      fetchOngoingTask();
    }
  }, [id]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-4">
        <div className="text-gray-600">Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center p-4">
        <div className="text-red-600">Error: {error}</div>
      </div>
    );
  }
  return (
    <div>
      <HeaderTab cardData={cardData} cardData1={cardData1} />
      {tasks ? (
        <>
          {activeTab === "Details" && <DeatilsPage tasks={tasks} />}
          {activeTab === "Photos" && <PhotosPage tasks={tasks}/>}
          {activeTab === "SMS/Call" && <CallSMSPage tasks={tasks} />}
          {activeTab === "History" && <History tasks={tasks}/>}
          {activeTab === "Tickets" && <Tickets tasks={tasks} />}
          {activeTab === "Inventory" && <Inventory />}
        </>
      ) : (
        <div className="flex items-center justify-center p-4">
          <div className="text-gray-600">No task data available</div>
        </div>
      )}
    </div>
  );
}