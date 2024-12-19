import {
  commentPost,
  createPost,
  deleteComment,
  deletePost,
  getAllPostsByUser,
  getCommentById,
  getCommentsOfPost,
  getLikeById,
  getLikesOfPost,
  getPostById,
  getPosts,
  getPostsOfUserAndHisFollowings,
  likePost,
  unlikePost,
  updateComment,
  updatePost
} from '../services/posts.service';

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

    const { content } = req.body;

    const post = await updatePost({ content }, id);

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

    const existingLike = await getLikeById(req.user.id, postId);

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

export const getCommentsHandler = async (req, res) => {
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
