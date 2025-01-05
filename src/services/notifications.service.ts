import prisma from '../database/db';

export const getNotifications = async () => {
  return await prisma.notifications.findMany({});
};

export const getNotificationsOfUser = async (userId: string) => {
  const notifications = await prisma.notifications.findMany({
    where: {
      userId
    },
    include: {
      sender: {
        select: {
          id: true,
          pseudo: true,
          profilePhoto: true
        }
      }
    },
    orderBy: {
      createdAt: 'desc'
    }
  });

  const notificationsCount = await prisma.notifications.count({
    where: {
      userId,
      isRead: false
    }
  });

  return {
    notifications,
    unreadCount: notificationsCount
  };
};

export const deleteNotification = async (id: string) => {
  return await prisma.notifications.delete({
    where: {
      id
    }
  });
};

export const getNotificationById = async (id: string) => {
  return await prisma.notifications.findUnique({
    where: {
      id
    }
  });
};

export const createNotification = async (userId: string, senderId: string, type: string, content: string) => {
  return await prisma.notifications.create({
    data: {
      userId,
      senderId,
      type,
      content
    }
  });
};

export const updateNotification = async (id: string, content: string) => {
  return await prisma.notifications.update({
    where: {
      id
    },
    data: {
      content
    }
  });
};

export const markAllAsRead = async (userId: string) => {
  return await prisma.notifications.updateMany({
    where: {
      userId,
      isRead: false
    },
    data: {
      isRead: true
    }
  });
};
