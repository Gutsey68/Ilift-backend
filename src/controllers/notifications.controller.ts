import {
  createNotification,
  deleteNotification,
  getNotificationById,
  getNotifications,
  getNotificationsOfUser,
  updateNotification
} from '../services/notifications.service';

export const getNotificationsHandler = async (req, res) => {
  try {
    const notifications = await getNotifications();
    res.status(200).json({ message: 'Notifications récupérés avec succès', data: notifications });
  } catch (error) {
    res.status(500).json({ error: 'Erreur Interne du Serveur' });
  }
};

export const getNotificationsOfUserHandler = async (req, res) => {
  try {
    const notifications = await getNotificationsOfUser(req.user.id);

    if (!notifications) {
      return res.status(404).json({ error: 'Notifications non trouvés' });
    }

    res.status(200).json({ message: 'Notifications récupérés avec succès', data: notifications });
  } catch (error) {
    res.status(500).json({ error: 'Erreur Interne du Serveur' });
  }
};

export const createNotificationHandler = async (req, res) => {
  try {
    const notification = await createNotification(req.user.id, req.body.type, req.body.content);

    res.status(201).json({ message: 'Notification créée avec succès', data: notification });
  } catch (error) {
    res.status(500).json({ error: 'Erreur Interne du Serveur' });
  }
};

export const deleteNotificationHandler = async (req, res) => {
  try {
    const existingNotification = await getNotificationById(req.params.id);

    if (!existingNotification) {
      return res.status(404).json({ error: 'Notification non trouvée' });
    }

    const notification = await deleteNotification(req.params.id);

    res.status(200).json({ message: 'Notification supprimée avec succès', data: notification });
  } catch (error) {
    res.status(500).json({ error: 'Erreur Interne du Serveur' });
  }
};

export const updateNotificationHandler = async (req, res) => {
  try {
    const existingNotification = await getNotificationById(req.params.id);

    if (!existingNotification) {
      return res.status(404).json({ error: 'Notification non trouvée' });
    }

    const notification = await updateNotification(req.params.id, req.body.content);

    res.status(200).json({ message: 'Notification modifiée avec succès', data: notification });
  } catch (error) {
    res.status(500).json({ error: 'Erreur Interne du Serveur' });
  }
};
