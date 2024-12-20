import { createPost, deletePost, getAllPostsByUser, getPostById, getPosts, getPostsOfUserAndHisFollowings, updatePost } from '../services/posts.service';

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

export const createPostHandler = async (req, res) => {
  try {
    const { photo, content } = req.body;

    if (req.file) {
      req.body.photo = req.file.path.replace(/\\/g, '/');
    }

    const post = await createPost(photo, content, req.user.id);

    if (!post) {
      return res.status(400).json({ error: "La publication n'a pas pu être posté" });
    }

    res.status(201).json({ message: 'Publication créée avec succès', data: post });
  } catch (error) {
    res.status(500).json({ error: 'Erreur Interne du Serveur' });
  }
};

export const updatePostHandler = async (req, res) => {
  try {
    const id = req.params.id;

    const existingPost = await getPostById(id);

    if (!existingPost) {
      return res.status(404).json({ error: 'Publication non trouvée' });
    }

    if (req.file) {
      req.body.photo = req.file.path.replace(/\\/g, '/');
    }

    const { content } = req.body;

    const post = await updatePost({ content, photo: req.body.photo }, id);

    if (!post) {
      return res.status(400).json({ error: "La publication n'a pas pu être mise à jour" });
    }

    res.status(200).json({ message: 'Publication mise à jour avec succès', data: post });
  } catch (error) {
    res.status(500).json({ error: 'Erreur Interne du Serveur' });
  }
};

export const deletePostHandler = async (req, res) => {
  try {
    const id = req.params.id;

    const post = await getPostById(id);

    if (!post) {
      return res.status(404).json({ error: 'Publication non trouvée' });
    }

    const deletedPost = await deletePost(id);

    if (!deletedPost) {
      return res.status(400).json({ error: "La publication n'a pas pu être supprimée" });
    }

    res.status(200).json({ message: 'Publication supprimée avec succès' });
  } catch (error) {
    res.status(500).json({ error: 'Erreur Interne du Serveur' });
  }
};
