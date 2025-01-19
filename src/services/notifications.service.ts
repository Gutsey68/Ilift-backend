/**
 * @fileoverview Service de gestion des notifications
 * Fournit les fonctions CRUD pour les notifications des utilisateurs
 */

import { Prisma } from '@prisma/client';
import prisma from '../database/db';
import { AppError, ErrorCodes } from '../errors/app.error';

/**
 * Récupère toutes les notifications
 * @throws {AppError} Si aucune notification n'est trouvée
 */
export const getNotifications = async () => {
  const notifications = await prisma.notifications.findMany({});

  if (!notifications.length) {
    throw AppError.NotFound('Aucune notification trouvée', ErrorCodes.NOT_FOUND);
  }

  return notifications;
};

/**
 * Récupère les notifications d'un utilisateur avec le compteur non lu
 * @returns {Promise<{notifications: Notification[], unreadCount: number}>}
 */
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

  return {
    notifications,
    unreadCount: notificationsCount
  };
};

/**
 * Récupère une notification par son identifiant
 * @throws {AppError} Si la notification n'est pas trouvée
 */
export const getNotificationById = async (id: string) => {
  const notification = await prisma.notifications.findUnique({
    where: { id }
  });

  if (!notification) {
    throw AppError.NotFound('Notification non trouvée', ErrorCodes.NOT_FOUND);
  }

  return notification;
};

/**
 * Crée une nouvelle notification
 * @throws {AppError} En cas d'erreur lors de la création
 */
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

/**
 * Supprime une notification par son identifiant
 * @throws {AppError} Si la notification n'est pas trouvée
 */
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

/**
 * Met à jour le contenu d'une notification
 * @throws {AppError} Si la notification n'est pas trouvée
 */
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

/**
 * Marque toutes les notifications d'un utilisateur comme lues
 * @returns {Promise<Prisma.BatchPayload>} Nombre de notifications mises à jour
 */
export const markAllAsRead = async (userId: string) => {
  return await prisma.notifications.updateMany({
    where: { userId, isRead: false },
    data: { isRead: true }
  });
};
