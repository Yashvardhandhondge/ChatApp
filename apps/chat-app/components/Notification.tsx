
"use client"
import React, { useEffect, useState } from 'react';
import { getNotifications,markAsRead } from '@/services/notification';

interface Notification {
  id: number;
  type: string;
  message: string;
  createdAt: string;
  read: boolean;
}

const NotificationList: React.FC = () => {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const fetchedNotifications = await getNotifications();
        setNotifications(fetchedNotifications);
      } catch (error) {
        console.error('Failed to fetch notifications:', error);
      }
    };

    fetchNotifications();
  }, []);

  const handleMarkAsRead = async (notificationId: number) => {
    try {
      await markAsRead(notificationId);
      setNotifications((prevNotifications) =>
        prevNotifications.map((notification) =>
          notification.id === notificationId ? { ...notification, read: true } : notification
        )
      );
    } catch (error) {
      console.error('Failed to mark notification as read:', error);
    }
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-md max-h-96 overflow-y-auto">
      <h2 className="text-xl font-bold mb-4">Notifications</h2>
      {notifications.length === 0 ? (
        <p>No new notifications.</p>
      ) : (
        <ul>
          {notifications.map((notification) => (
            <li
              key={notification.id}
              className={`border-b border-gray-200 py-2 ${notification.read ? 'bg-gray-100' : 'bg-blue-50'}`}
            >
              <div className="font-semibold text-gray-700">{notification.type}</div>
              <p className="text-gray-900">{notification.message}</p>
              <span className="text-sm text-gray-500">{new Date(notification.createdAt).toLocaleTimeString()}</span>
              {!notification.read && (
                <button
                  onClick={() => handleMarkAsRead(notification.id)}
                  className="text-blue-500 hover:text-blue-700 ml-2"
                >
                  Mark as Read
                </button>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default NotificationList;