import { getLikeById, getLikes, getLikesOfPost, likePost, unlikePost } from '../services/likes.service';
import { getPostById } from '../services/posts.service';

export const likePostHandler = async (req, res) => {
  try {
    const postId = req.params.id;

    const existingLike = await getLikeById(req.user.id, postId);

    if (existingLike) {
      return res.status(400).json({ error: 'Vous avez déjà aimé la publication' });
    }

    const like = await likePost(postId, req.user.id);

    if (!like) {
      return res.status(400).json({ error: 'Erreur lors de la mise à jour de la publication' });
    }

    res.status(200).json({ message: 'Publication aimée avec succès', data: like });
  } catch (error) {
    res.status(500).json({ error: 'Erreur Interne du Serveur' });
  }
};

export const unlikePostHandler = async (req, res) => {
  try {
    const postId = req.params.id;

    const existingLike = await getLikeById(postId, req.user.id);

    if (!existingLike) {
      return res.status(400).json({ error: "Vous n'avez pas aimé la publication" });
    }

    const like = await unlikePost(postId, req.user.id);

    if (!like) {
      return res.status(400).json({ error: 'Erreur lors de la mise à jour de la publication' });
    }

    res.status(200).json({ message: 'Publication non aimée avec succès' });
  } catch (error) {
    res.status(500).json({ error: 'Erreur Interne du Serveur' });
  }
};

export const getLikesOfAPostHandler = async (req, res) => {
  try {
    const postId = req.params.id;

    const existingPost = await getPostById(postId);

    if (!existingPost) {
      return res.status(404).json({ error: 'Publication non trouvée' });
    }

    const likes = await getLikesOfPost(postId);

    if (!likes) {
      return res.status(404).json({ error: "Aucun j'aime trouvé" });
    }

    res.status(200).json({ message: "J'aime récupéré avec succès", data: likes });
  } catch (error) {
    res.status(500).json({ error: 'Erreur Interne du Serveur' });
  }
};

export const getLikesHandler = async (req, res) => {
  try {
    const likes = await getLikes();

    if (!likes) {
      return res.status(404).json({ error: "Aucun j'aime trouvé" });
    }

    res.status(200).json({ message: "J'aime récupéré avec succès", data: likes });
  } catch (error) {
    res.status(500).json({ error: 'Erreur Interne du Serveur' });
  }
};
