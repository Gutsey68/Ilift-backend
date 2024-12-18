import { getAllPostsByUser, getPostById, getPosts, getPostsOfUserAndHisFollowings } from '../services/posts.service';

export const getPostsHandler = async (req, res) => {
  try {
    const posts = await getPosts();

    if (!posts) {
      return res.status(404).json({ error: 'Aucune publication trouvée' });
    }

    res.status(200).json({ message: 'Publications récupérées avec succès', data: posts });
  } catch (error) {
    res.status(500).json({ error: 'Erreur Interne du Serveur' });
  }
};

export const getPostByIdHandler = async (req, res) => {
  try {
    const id = req.params.id;

    const post = await getPostById(id);

    if (!post) {
      return res.status(404).json({ error: 'Poste non trouvé' });
    }

    res.status(200).json({ message: 'Publication récupérée avec succès', data: post });
  } catch (error) {
    res.status(500).json({ error: 'Erreur Interne du Serveur' });
  }
};

export const getAllPostsByUserHandler = async (req, res) => {
  try {
    const userId = req.params.userId;

    if (!userId) {
      return res.status(400).json({ error: "Id de l'utilisateur manquant" });
    }

    const posts = await getAllPostsByUser(userId);

    if (!posts) {
      return res.status(404).json({ error: 'Aucune publication trouvée' });
    }

    res.status(200).json({ message: 'Publications récupérées avec succès', data: posts });
  } catch (error) {
    res.status(500).json({ error: 'Erreur Interne du Serveur' });
  }
};

export const getPostsOfUserAndHisFollowingsHandler = async (req, res) => {
  try {
    const userId = req.params.userId;

    if (!userId) {
      return res.status(400).json({ error: "Id de l'utilisateur manquant" });
    }

    const page = parseInt(req.query.page) || 1;

    const posts = await getPostsOfUserAndHisFollowings(userId, page);

    if (!posts) {
      return res.status(404).json({ error: 'Aucune publication trouvée' });
    }

    res.status(200).json({ message: 'Publications récupérées avec succès', data: posts });
  } catch (error) {
    res.status(500).json({ error: 'Erreur Interne du Serveur' });
  }
};

export const createPostHandler = async (req, res) => {};

export const updatePostHandler = async (req, res) => {};

export const deletePostHandler = async (req, res) => {};

export const likePostHandler = async (req, res) => {};

export const unlikePostHandler = async (req, res) => {};

export const getLikesHandler = async (req, res) => {};

export const createCommentHandler = async (req, res) => {};

export const getCommentsHandler = async (req, res) => {};

export const deleteCommentHandler = async (req, res) => {};

export const updateCommentHandler = async (req, res) => {};
