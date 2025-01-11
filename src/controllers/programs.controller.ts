import { NextFunction, Request, Response } from 'express';
import { AppError, ErrorCodes } from '../errors/app.error';
import {
  createProgram,
  deleteProgram,
  getProgramById,
  getPrograms,
  getProgramsOfUser,
  getWorkoutsOfProgram,
  updateProgram
} from '../services/programs.service';

export const getProgramsHandler = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    if (!req.user) {
      throw AppError.Unauthorized('Utilisateur non authentifié', ErrorCodes.INVALID_CREDENTIALS);
    }

    const programs = await getPrograms();
    res.status(200).json({
      message: 'Programmes récupérés avec succès',
      data: programs
    });
  } catch (error) {
    next(error);
  }
};

export const getProgramsOfUserHandler = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    if (!req.user) {
      throw AppError.Unauthorized('Utilisateur non authentifié', ErrorCodes.INVALID_CREDENTIALS);
    }

    const programs = await getProgramsOfUser(req.user.id);
    res.status(200).json({
      message: 'Programmes récupérés avec succès',
      data: programs
    });
  } catch (error) {
    next(error);
  }
};

export const getWorkoutsOfProgramHandler = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    if (!req.user) {
      throw AppError.Unauthorized('Utilisateur non authentifié', ErrorCodes.INVALID_CREDENTIALS);
    }

    const program = await getProgramById(req.params.id);
    const isAuthor = program.author.id === req.user.id;
    const isFollower = program.usersFollows.some(follow => follow.userId === req.user.id);

    if (!isAuthor && !isFollower) {
      throw AppError.Forbidden('Accès non autorisé', ErrorCodes.INVALID_CREDENTIALS);
    }

    const workouts = await getWorkoutsOfProgram(req.params.id);
    res.status(200).json({
      message: 'Séances récupérées avec succès',
      data: { workouts, program }
    });
  } catch (error) {
    next(error);
  }
};

export const createProgramHandler = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    if (!req.user) {
      throw AppError.Unauthorized('Utilisateur non authentifié', ErrorCodes.INVALID_CREDENTIALS);
    }

    const { name, description } = req.body;
    const program = await createProgram(name, description, req.user.id);

    res.status(201).json({
      message: 'Programme créé avec succès',
      data: program
    });
  } catch (error) {
    next(error);
  }
};

export const updateProgramHandler = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    if (!req.user) {
      throw AppError.Unauthorized('Utilisateur non authentifié', ErrorCodes.INVALID_CREDENTIALS);
    }

    const program = await updateProgram(req.params.id, {
      ...(req.body.name && { name: req.body.name }),
      ...(req.body.description && { description: req.body.description }),
      ...(typeof req.body.position === 'number' && { position: req.body.position })
    });

    res.status(200).json({
      message: 'Programme mis à jour avec succès',
      data: program
    });
  } catch (error) {
    next(error);
  }
};

export const deleteProgramHandler = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    if (!req.user) {
      throw AppError.Unauthorized('Utilisateur non authentifié', ErrorCodes.INVALID_CREDENTIALS);
    }

    await deleteProgram(req.params.id);

    res.status(200).json({
      message: 'Programme supprimé avec succès'
    });
  } catch (error) {
    next(error);
  }
};
