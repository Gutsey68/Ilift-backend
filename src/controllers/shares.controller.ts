import { getPostById } from '../services/posts.service';
import { getShareById, getShares, getSharesOfAUser, sharePost, unsharePost } from '../services/shares.service';

export const getSharesHandler = async (req, res) => {
  try {
    const shares = await getShares();

    if (!shares) {
      return res.status(404).json({ error: 'Aucune republication trouvée' });
    }

    res.status(200).json({ message: 'Republications récupérées avec succès', data: shares });
  } catch (error) {
    res.status(500).json({ error: 'Erreur Interne du Serveur' });
  }
};

export const getSharesOfUserHandler = async (req, res) => {
  try {
    const userId = req.params.id;
    const shares = await getSharesOfAUser(userId);

    if (!shares || shares.length === 0) {
      return res.status(404).json({ error: 'Aucune publication republiée trouvée' });
    }

    const postsWithShares = shares.map(share => {
      const post = share.posts;
      return {
        ...post,
        isShared: true,
        doILike: false
      };
    });

    res.status(200).json({
      message: 'Republications récupérées avec succès',
      data: postsWithShares
    });
  } catch (error) {
    console.error('Erreur getSharesOfUserHandler:', error);
    res.status(500).json({ error: 'Erreur Interne du Serveur' });
  }
};

export const shareHandler = async (req, res) => {
  try {
    const postId = req.params.id;

    const existingPost = await getPostById(postId);

    if (!existingPost) {
      return res.status(404).json({ error: 'Publication non trouvée' });
    }

    const existingShare = await getShareById(req.user.id, postId);

    if (existingShare) {
      return res.status(400).json({ error: 'Vous avez déjà republié cette publication' });
    }

    const share = await sharePost(postId, req.user.id);

    if (!share) {
      return res.status(400).json({ error: 'Erreur lors de la republication' });
    }

    res.status(200).json({ message: 'Publication republiée avec succès', data: share });
  } catch (error) {
    res.status(500).json({ error: 'Erreur Interne du Serveur' });
  }
};

export const unshareHandler = async (req, res) => {
  try {
    const shareId = req.params.id;

    const existingShare = await getShareById(req.user.id, shareId);

    if (!existingShare) {
      return res.status(400).json({ error: "Vous n'avez pas republié cette publication" });
    }

    const share = await unsharePost(shareId, req.user.id);

    if (!share) {
      return res.status(400).json({ error: 'Erreur lors de la republication' });
    }

    res.status(200).json({ message: 'Republication suprimée avec succès' });
  } catch (error) {
    res.status(500).json({ error: 'Erreur Interne du Serveur' });
  }
};
