import { PrismaClient } from '@prisma/client';
import express, { Request, Response } from 'express';

const app = express();
const port = process.env.PORT || 3000;
const prisma = new PrismaClient();

app.get('/', (req: Request, res: Response) => {
    res.send('Hello, TypeScript Express!');
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});

async function main() {
    // Créer un exercice
    const exercice = await prisma.exercice.create({
        data: {
            name: 'Squats',
            sets: 3,
            reps: 10
        }
    });

    // Créer un utilisateur avec des données associées
    const user = await prisma.user.create({
        data: {
            pseudo: 'Alice',
            email: 'alice@prisma.io',
            passwordHash: 'hashedpassword123',
            bio: 'I like turtles',
            posts: {
                create: [
                    {
                        title: 'Hello World',
                        content: 'This is my first post!',
                        updatedAt: new Date()
                    }
                ]
            },
            workouts: {
                create: [
                    {
                        name: 'Full Body Workout',
                        updatedAt: new Date(),
                        exercices: {
                            create: [
                                {
                                    exerciceId: exercice.id
                                }
                            ]
                        }
                    }
                ]
            }
        }
    });

    // Créer des résultats pour l'exercice
    await prisma.exerciceResult.createMany({
        data: [
            {
                setNumber: 1,
                updatedAt: new Date(),
                reps: 10,
                weight: 100.0,
                exerciceId: exercice.id
            },
            {
                setNumber: 2,
                updatedAt: new Date(),
                reps: 10,
                weight: 100.0,
                exerciceId: exercice.id
            }
        ]
    });

    // Récupérer tous les utilisateurs avec leurs posts et leurs workouts
    const allUsers = await prisma.user.findMany({
        include: {
            posts: true,
            workouts: {
                include: {
                    exercices: {
                        include: {
                            exercice: {
                                include: {
                                    results: true
                                }
                            }
                        }
                    }
                }
            }
        }
    });

    console.dir(allUsers, { depth: null });
}

main()
    .catch(e => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
