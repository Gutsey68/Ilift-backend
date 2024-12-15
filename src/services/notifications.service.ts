import prisma from '../database/db';

export const getNotifications = async () => {
  return await prisma.notifications.findMany({});
};

export const getNotificationsOfUser = async (userId: string) => {
  return await prisma.notifications.findMany({
    where: {
      userId
    }
  });
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

export const createNotification = async (userId: string, type: string, content: string) => {
  return await prisma.notifications.create({
    data: {
      userId,
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
