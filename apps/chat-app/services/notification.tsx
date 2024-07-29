
import axios from 'axios';

export const getNotifications = async () => {
  try {
    const response = await axios.get('/api/notifications');
    return response.data;
  } catch (error) {
    console.error('Error fetching notifications:', error);
    throw error;
  }
};


export const markAsRead = async (notificationId: number) => {
  try {
    await axios.patch(`/api/notifications/${notificationId}`, { read: true });
  } catch (error) {
    console.error('Error marking notification as read:', error);
    throw error;
  }
};
