"use client";

import { useAuth } from "@/Client/lib/auth-context";
import { mockNotifications } from "@/Client/lib/mock-data";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Bell,
  CheckCircle,
  AlertCircle,
  Info,
  Trash2,
  MailOpen,
  Mail,
} from "lucide-react";
import { useState } from "react";

export default function Notifications() {
  const { user } = useAuth();
  const [notifications, setNotifications] = useState(
    mockNotifications.filter((n) => n.studentId === user?.id),
  );

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "shortlist":
        return <CheckCircle className="text-green-500" size={20} />;
      case "reject":
        return <AlertCircle className="text-red-500" size={20} />;
      case "interview":
        return <Bell className="text-blue-500" size={20} />;
      case "offer":
        return <CheckCircle className="text-purple-500" size={20} />;
      default:
        return <Info className="text-gray-500" size={20} />;
    }
  };

  const getNotificationColor = (type: string) => {
    switch (type) {
      case "shortlist":
        return "bg-green-100 text-green-800";
      case "reject":
        return "bg-red-100 text-red-800";
      case "interview":
        return "bg-blue-100 text-blue-800";
      case "offer":
        return "bg-purple-100 text-purple-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getTypeLabel = (type: string) => {
    switch (type) {
      case "shortlist":
        return "Shortlisted";
      case "reject":
        return "Rejected";
      case "interview":
        return "Interview";
      case "offer":
        return "Offer";
      default:
        return "General";
    }
  };

  const handleDelete = (id: string) => {
    setNotifications(notifications.filter((n) => n.id !== id));
  };

  const handleMarkAsRead = (id: string) => {
    setNotifications(
      notifications.map((n) => (n.id === id ? { ...n, read: true } : n)),
    );
  };

  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <div className="flex-1 overflow-auto">
      <div className="p-6 lg:p-8 max-w-4xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-3xl font-bold text-foreground">
              Notifications
            </h1>
            <p className="text-muted-foreground mt-1">
              Stay updated with your placement journey
            </p>
          </div>
          {unreadCount > 0 && (
            <div className="flex items-center gap-2 px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
              <Bell size={16} />
              {unreadCount} New
            </div>
          )}
        </div>

        {/* Notifications List */}
        <div className="space-y-4">
          {notifications.length > 0 ? (
            notifications.map((notif) => (
              <Card
                key={notif.id}
                className={`transition-colors ${
                  notif.read ? "bg-background" : "bg-muted border-primary/50"
                }`}
              >
                <CardContent className="pt-6">
                  <div className="flex gap-4">
                    {/* Icon */}
                    <div className="flex-shrink-0 mt-1">
                      {getNotificationIcon(notif.type)}
                    </div>

                    {/* Content */}
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <span
                              className={`text-xs font-semibold px-2 py-1 rounded-full ${getNotificationColor(notif.type)}`}
                            >
                              {getTypeLabel(notif.type)}
                            </span>
                            {!notif.read && (
                              <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                            )}
                          </div>
                          <p className="text-foreground font-medium">
                            {notif.message}
                          </p>
                        </div>
                        <button
                          onClick={() => handleDelete(notif.id)}
                          className="text-muted-foreground hover:text-foreground transition-colors"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>

                      <p className="text-xs text-muted-foreground mb-3">
                        {new Date(notif.createdAt).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </p>

                      {!notif.read && (
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleMarkAsRead(notif.id)}
                        >
                          <MailOpen size={14} className="mr-2" />
                          Mark as Read
                        </Button>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          ) : (
            <Card>
              <CardContent className="pt-12 text-center pb-12">
                <Mail
                  className="mx-auto text-muted-foreground mb-3"
                  size={40}
                />
                <p className="text-muted-foreground">
                  You're all caught up! No new notifications
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
