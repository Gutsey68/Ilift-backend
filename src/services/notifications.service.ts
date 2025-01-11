import { Prisma } from '@prisma/client';
import prisma from '../database/db';
import { AppError, ErrorCodes } from '../errors/app.error';

export const getNotifications = async () => {
  const notifications = await prisma.notifications.findMany({});

  if (!notifications.length) {
    throw AppError.NotFound('Aucune notification trouvée', ErrorCodes.NOT_FOUND);
  }

  return notifications;
};

export const getNotificationsOfUser = async (userId: string) => {
  const [notifications, notificationsCount] = await Promise.all([
    prisma.notifications.findMany({
      where: { userId },
      include: {
        sender: {
          select: {
            id: true,
            pseudo: true,
            profilePhoto: true
          }
        }
      },
      orderBy: { createdAt: 'desc' }
    }),
    prisma.notifications.count({
      where: {
        userId,
        isRead: false
      }
    })
  ]);

  if (!notifications.length) {
    throw AppError.NotFound('Aucune notification trouvée', ErrorCodes.NOT_FOUND);
  }

  return {
    notifications,
    unreadCount: notificationsCount
  };
};

export const getNotificationById = async (id: string) => {
  const notification = await prisma.notifications.findUnique({
    where: { id }
  });

  if (!notification) {
    throw AppError.NotFound('Notification non trouvée', ErrorCodes.NOT_FOUND);
  }

  return notification;
};

export const createNotification = async (userId: string, senderId: string, type: string, content: string) => {
  try {
    return await prisma.notifications.create({
      data: { userId, senderId, type, content }
    });
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      throw AppError.BadRequest('Erreur lors de la création de la notification', ErrorCodes.BAD_REQUEST);
    }
    throw error;
  }
};

export const deleteNotification = async (id: string) => {
  try {
    return await prisma.notifications.delete({
      where: { id }
    });
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === 'P2025') {
        throw AppError.NotFound('Notification non trouvée', ErrorCodes.NOT_FOUND);
      }
    }
    throw error;
  }
};

export const updateNotification = async (id: string, content: string) => {
  try {
    return await prisma.notifications.update({
      where: { id },
      data: { content }
    });
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === 'P2025') {
        throw AppError.NotFound('Notification non trouvée', ErrorCodes.NOT_FOUND);
      }
    }
    throw error;
  }
};

export const markAllAsRead = async (userId: string) => {
  return await prisma.notifications.updateMany({
    where: { userId, isRead: false },
    data: { isRead: true }
  });
};
