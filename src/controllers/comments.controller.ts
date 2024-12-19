import { commentPost, deleteComment, getCommentById, getComments, getCommentsOfPost, updateComment } from '../services/comments.service';
import { getPostById } from '../services/posts.service';

export const createCommentHandler = async (req, res) => {
  try {
    const postId = req.params.id;

    const existingPost = await getPostById(postId);

    if (!existingPost) {
      return res.status(404).json({ error: 'Publication non trouvée' });
    }

    const { content } = req.body;

    const comment = await commentPost(content, req.user.id, postId);

    if (!comment) {
      return res.status(400).json({ error: "Le commentaire n'a pas pu être posté" });
    }

    res.status(201).json({ message: 'Commentaire créé avec succès', data: comment });
  } catch (error) {
    res.status(500).json({ error: 'Erreur Interne du Serveur' });
  }
};

export const getCommentsOfAPostHandler = async (req, res) => {
  try {
    const postId = req.params.id;

    const existingPost = await getPostById(postId);

    if (!existingPost) {
      return res.status(404).json({ error: 'Publication non trouvée' });
    }

    const comments = await getCommentsOfPost(postId);

    if (!comments) {
      return res.status(404).json({ error: 'Aucun commentaire trouvé' });
    }

    res.status(200).json({ message: 'Commentaires récupérés avec succès', data: comments });
  } catch (error) {
    res.status(500).json({ error: 'Erreur Interne du Serveur' });
  }
};

export const deleteCommentHandler = async (req, res) => {
  try {
    const id = req.params.id;

    const comment = await getCommentById(id, req.user.id);

    if (!comment) {
      return res.status(404).json({ error: 'Commentaire non trouvé' });
    }

    const deletedComment = await deleteComment(id, req.user.id);

    if (!deletedComment) {
      return res.status(400).json({ error: "Le commentaire n'a pas pu être supprimé" });
    }

    res.status(200).json({ message: 'Commentaire supprimé avec succès' });
  } catch (error) {
    res.status(500).json({ error: 'Erreur Interne du Serveur' });
  }
};

export const updateCommentHandler = async (req, res) => {
  try {
    const id = req.params.id;

    const existingComment = await getCommentById(id, req.user.id);

    if (!existingComment) {
      return res.status(404).json({ error: 'Commentaire non trouvé' });
    }

    const { content } = req.body;

    const comment = await updateComment(content, id, req.user.id);

    if (!comment) {
      return res.status(400).json({ error: "Le commentaire n'a pas pu être mis à jour" });
    }

    res.status(200).json({ message: 'Commentaire mis à jour avec succès', data: comment });
  } catch (error) {
    res.status(500).json({ error: 'Erreur Interne du Serveur' });
  }
};

export const getCommentsHandler = async (req, res) => {
  try {
    const comments = await getComments();

    if (!comments) {
      return res.status(404).json({ error: 'Aucun commentaire trouvé' });
    }

    res.status(200).json({ message: 'Commentaires récupérés avec succès', data: comments });
  } catch (error) {
    res.status(500).json({ error: 'Erreur Interne du Serveur' });
  }
};
