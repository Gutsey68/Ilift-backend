/**
 * @fileovview Contrôleurs pour la gestion des notifications
 * Gère les requêtes liées aux notifications utilisateur
 */

import { NextFunction, Request, Response } from 'express';
import { AppError, ErrorCodes } from '../errors/app.error';
import {
  createNotification,
  deleteNotification,
  getNotifications,
  getNotificationsOfUser,
  markAllAsRead,
  updateNotification
} from '../services/notifications.service';

/**
 * Récupère toutes les notifications
 * @throws {AppError} Si l'utilisateur n'est pas authentifié
 */
export const getNotificationsHandler = async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (!req.user) {
      throw AppError.Unauthorized('Utilisateur non authentifié', ErrorCodes.INVALID_CREDENTIALS);
    }

    const notifications = await getNotifications();
    res.status(200).json({
      message: 'Notifications récupérées avec succès',
      data: notifications
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Récupère les notifications d'un utilisateur spécifique
 * @throws {AppError} Si l'utilisateur n'est pas authentifié
 */
export const getNotificationsOfUserHandler = async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (!req.user) {
      throw AppError.Unauthorized('Utilisateur non authentifié', ErrorCodes.INVALID_CREDENTIALS);
    }

    const notifications = await getNotificationsOfUser(req.user.id);
    res.status(200).json({
      message: 'Notifications récupérées avec succès',
      data: notifications
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Crée une nouvelle notification
 * @throws {AppError} Si l'utilisateur n'est pas authentifié
 */
export const createNotificationHandler = async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (!req.user) {
      throw AppError.Unauthorized('Utilisateur non authentifié', ErrorCodes.INVALID_CREDENTIALS);
    }

    const notification = await createNotification(req.user.id, req.body.senderId, req.body.type, req.body.content);

    res.status(201).json({
      message: 'Notification créée avec succès',
      data: notification
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Supprime une notification
 * @throws {AppError} Si l'utilisateur n'est pas authentifié
 */
export const deleteNotificationHandler = async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (!req.user) {
      throw AppError.Unauthorized('Utilisateur non authentifié', ErrorCodes.INVALID_CREDENTIALS);
    }

    await deleteNotification(req.params.id);
    res.status(200).json({
      message: 'Notification supprimée avec succès'
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Met à jour une notification
 * @throws {AppError} Si l'utilisateur n'est pas authentifié
 */
export const updateNotificationHandler = async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (!req.user) {
      throw AppError.Unauthorized('Utilisateur non authentifié', ErrorCodes.INVALID_CREDENTIALS);
    }

    const notification = await updateNotification(req.params.id, req.body.content);
    res.status(200).json({
      message: 'Notification modifiée avec succès',
      data: notification
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Marque toutes les notifications comme lues
 * @throws {AppError} Si l'utilisateur n'est pas authentifié
 */
export const markAllAsReadHandler = async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (!req.user) {
      throw AppError.Unauthorized('Utilisateur non authentifié', ErrorCodes.INVALID_CREDENTIALS);
    }

    await markAllAsRead(req.user.id);
    res.status(200).json({
      message: 'Notifications marquées comme lues'
    });
  } catch (error) {
    next(error);
  }
};
