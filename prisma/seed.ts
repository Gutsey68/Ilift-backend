import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const roles = [
    { id: 'role1-id', name: 'Admin' },
    { id: 'role2-id', name: 'User' }
  ];
  await prisma.role.createMany({ data: roles });

  const cities = [
    { id: 'city1-id', name: 'Strasbourg', country: 'France' },
    { id: 'city2-id', name: 'Paris', country: 'France' },
    { id: 'city3-id', name: 'Lyon', country: 'France' },
    { id: 'city4-id', name: 'Marseille', country: 'France' },
    { id: 'city5-id', name: 'Nice', country: 'France' },
    { id: 'city6-id', name: 'Bordeaux', country: 'France' },
    { id: 'city7-id', name: 'Lille', country: 'France' },
    { id: 'city8-id', name: 'Toulouse', country: 'France' }
  ];
  await prisma.city.createMany({ data: cities });

  const users = [
    {
      id: 'user1-id',
      pseudo: 'john_doe',
      email: 'john.doe@example.com',
      passwordHash: 'hashedpassword123',
      roleId: 'role2-id',
      cityId: 'city1-id'
    },
    {
      id: 'user2-id',
      pseudo: 'FitFreak',
      email: 'fit.freak@example.com',
      passwordHash: 'hashedpassword910',
      roleId: 'role2-id',
      cityId: 'city2-id'
    },
    {
      id: 'user3-id',
      pseudo: 'IronWarrior',
      email: 'iron.warrior@example.com',
      passwordHash: 'hashedpassword123',
      roleId: 'role2-id',
      cityId: 'city2-id'
    },
    {
      id: 'user4-id',
      pseudo: 'jane_doe',
      email: 'jane.doe@example.com',
      passwordHash: 'hashedpassword456',
      roleId: 'role2-id',
      cityId: 'city4-id'
    },
    {
      id: 'user5-id',
      pseudo: 'MaxFitness',
      email: 'max.fitness@example.com',
      passwordHash: 'hashedpassword789',
      roleId: 'role2-id',
      cityId: 'city6-id'
    },
    {
      id: 'user6-id',
      pseudo: 'AnnaLift',
      email: 'anna.lift@example.com',
      passwordHash: 'hashedpassword012',
      roleId: 'role2-id',
      cityId: 'city5-id'
    },
    {
      id: 'user7-id',
      pseudo: 'GymGeek',
      email: 'gym.geek@example.com',
      passwordHash: 'hashedpassword345',
      roleId: 'role2-id',
      cityId: 'city8-id'
    },
    {
      id: 'user8-id',
      pseudo: 'HealthyHarper',
      email: 'harper.fit@example.com',
      passwordHash: 'hashedpassword678',
      roleId: 'role2-id',
      cityId: 'city7-id'
    }
  ];

  await prisma.user.createMany({ data: users });

  const programs = [
    {
      id: 'program1-id',
      name: 'Programme Débutant',
      description: 'Programme pour débutants',
      authorId: 'user1-id'
    },
    {
      id: 'program2-id',
      name: 'Programme Avancé',
      description: 'Programme pour utilisateurs avancés',
      authorId: 'user2-id'
    }
  ];
  await prisma.programs.createMany({ data: programs });

  const exercises = [
    { id: 'exercise1-id', name: 'Squat', sets: 3, reps: 10 },
    { id: 'exercise2-id', name: 'Bench Press', sets: 3, reps: 8 }
  ];
  await prisma.exercices.createMany({ data: exercises });

  const workouts = [
    {
      id: 'workout1-id',
      name: 'Entraînement 1',
      programId: 'program1-id',
      userId: 'user1-id'
    },
    {
      id: 'workout2-id',
      name: 'Entraînement 2',
      programId: 'program2-id',
      userId: 'user2-id'
    }
  ];
  await prisma.workouts.createMany({ data: workouts });

  const workoutsExercises = [
    { workoutId: 'workout1-id', exerciceId: 'exercise1-id' },
    { workoutId: 'workout2-id', exerciceId: 'exercise2-id' }
  ];
  for (const we of workoutsExercises) {
    await prisma.workoutsExercises.create({ data: we });
  }

  const posts = [
    {
      id: 'post1',
      photo:
        'https://images.unsplash.com/photo-1526506118085-60ce8714f8c5?q=80&w=2187&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      title: 'My First Workout',
      content: '🏋🏻 Just finished my first workout session!',
      authorId: 'user1-id'
    },
    {
      id: 'post2',
      photo:
        'https://plus.unsplash.com/premium_photo-1673580742890-4af144293960?q=80&w=2128&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      title: 'Healthy Eating Tips',
      content: '🥑 Here are some tips for healthy eating.',
      authorId: 'user2-id'
    },
    {
      id: 'post3',
      photo:
        'https://images.unsplash.com/photo-1434682772747-f16d3ea162c3?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjZ8fGd5bXxlbnwwfHwwfHx8MA%3D%3D',
      title: 'Leg Day!',
      content: '🔥 Legs are on fire! Great workout today!',
      authorId: 'user3-id'
    },
    {
      id: 'post4',
      photo:
        'https://images.unsplash.com/flagged/photo-1556746834-1cb5b8fabd54?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NDB8fGNhcmRpb3xlbnwwfHwwfHx8MA%3D%3D',
      title: 'Cardio Session',
      content: '🏃‍♂️ Hit the track today. Feeling refreshed!',
      authorId: 'user4-id'
    },
    {
      id: 'post5',
      photo:
        'https://images.unsplash.com/photo-1549476464-37392f717541?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NTR8fGd5bXxlbnwwfHwwfHx8MA%3D%3D',
      title: 'Upper Body Strength',
      content: '💪 Pushed my limits today. Getting stronger!',
      authorId: 'user5-id'
    },
    {
      id: 'post6',
      photo:
        'https://images.unsplash.com/photo-1585577529540-a8095ea25427?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fHJlY292ZXJ5fGVufDB8fDB8fHww',
      title: 'Recovery Day',
      content: '🧘 Taking it easy today. Rest and recovery.',
      authorId: 'user8-id'
    },
    {
      id: 'post7',
      photo:
        'https://images.unsplash.com/photo-1652363722856-214ce6a06a44?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8YmVuY2glMjBwcmVzc3xlbnwwfHwwfHx8MA%3D%3D',
      title: 'New PR!',
      content: '🏆 Just hit a new personal record on the bench press!',
      authorId: 'user8-id'
    }
  ];
  await prisma.posts.createMany({ data: posts });

  const comments = [
    {
      postsId: 'post1',
      usersId: 'user2-id',
      content: 'Super post !'
    },
    {
      postsId: 'post2',
      usersId: 'user1-id',
      content: "Merci pour l'info !"
    }
  ];
  for (const comment of comments) {
    await prisma.usersComments.create({ data: comment });
  }

  const follows = [
    { followingId: 'user1-id', followedById: 'user2-id' },
    { followingId: 'user1-id', followedById: 'user3-id' },
    { followingId: 'user2-id', followedById: 'user1-id' },
    { followingId: 'user2-id', followedById: 'user3-id' },
    { followingId: 'user2-id', followedById: 'user4-id' },
    { followingId: 'user2-id', followedById: 'user5-id' },
    { followingId: 'user3-id', followedById: 'user6-id' },
    { followingId: 'user3-id', followedById: 'user7-id' },
    { followingId: 'user4-id', followedById: 'user8-id' },
    { followingId: 'user4-id', followedById: 'user1-id' },
    { followingId: 'user5-id', followedById: 'user2-id' },
    { followingId: 'user5-id', followedById: 'user3-id' },
    { followingId: 'user6-id', followedById: 'user4-id' },
    { followingId: 'user6-id', followedById: 'user5-id' },
    { followingId: 'user7-id', followedById: 'user6-id' },
    { followingId: 'user7-id', followedById: 'user7-id' },
    { followingId: 'user8-id', followedById: 'user8-id' },
    { followingId: 'user8-id', followedById: 'user1-id' }
  ];

  for (const follow of follows) {
    await prisma.follows.create({ data: follow });
  }

  console.log('Seed complet terminé !');
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async e => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
