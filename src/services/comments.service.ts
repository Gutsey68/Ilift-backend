import prisma from '../database/db';

export const commentPost = async (content: string, usersId: string, postsId: string) => {
  return await prisma.usersComments.create({
    data: {
      content,
      usersId,
      postsId
    }
  });
};

export const getCommentsOfPost = async (postsId: string) => {
  return await prisma.usersComments.findMany({
    where: {
      postsId
    },
    include: {
      users: {
        select: {
          id: true,
          pseudo: true,
          profilePhoto: true
        }
      }
    }
  });
};

export const deleteComment = async (postsId: string, usersId: string) => {
  return await prisma.usersComments.delete({
    where: {
      postsId_usersId: {
        postsId,
        usersId
      }
    }
  });
};

export const getCommentById = async (postsId: string, usersId: string) => {
  return await prisma.usersComments.findUnique({
    where: {
      postsId_usersId: {
        postsId,
        usersId
      }
    }
  });
};

export const updateComment = async (content: string, postsId: string, usersId: string) => {
  return await prisma.usersComments.update({
    where: {
      postsId_usersId: {
        postsId,
        usersId
      }
    },
    data: {
      content
    }
  });
};

export const getComments = async () => {
  return await prisma.usersComments.findMany();
};
