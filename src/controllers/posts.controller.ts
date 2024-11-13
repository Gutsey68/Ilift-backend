import { getAllPostsByUser, getPostById, getPosts, getPostsOfUserAndHisFollowings } from '../services/post.service';

export const getPostsHandler = async (req, res) => {
  try {
    const posts = await getPosts();
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
    const posts = await getAllPostsByUser(userId);
    res.status(200).json({ message: 'Publications récupérées avec succès', data: posts });
  } catch (error) {
    res.status(500).json({ error: 'Erreur Interne du Serveur' });
  }
};

export const getPostsOfUserAndHisFollowingsHandler = async (req, res) => {
  try {
    const userId = req.params.userId;
    const posts = await getPostsOfUserAndHisFollowings(userId);
    res.status(200).json({ message: 'Publications récupérées avec succès', data: posts });
  } catch (error) {
    res.status(500).json({ error: 'Erreur Interne du Serveur' });
  }
};
