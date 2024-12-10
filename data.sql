--
-- PostgreSQL database dump
--

-- Dumped from database version 17.2
-- Dumped by pg_dump version 17.2

-- Started on 2024-12-10 17:10:23

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 220 (class 1259 OID 17294)
-- Name: City; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."City" (
    id text NOT NULL,
    name text NOT NULL,
    country text NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);


ALTER TABLE public."City" OWNER TO postgres;

--
-- TOC entry 229 (class 1259 OID 17374)
-- Name: ExerciceMuscleGroups; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."ExerciceMuscleGroups" (
    "exercicesId" text NOT NULL,
    "musculeGroupsId" text NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);


ALTER TABLE public."ExerciceMuscleGroups" OWNER TO postgres;

--
-- TOC entry 224 (class 1259 OID 17326)
-- Name: ExerciceResults; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."ExerciceResults" (
    id text NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL,
    "exerciceId" text NOT NULL,
    "userId" text NOT NULL
);


ALTER TABLE public."ExerciceResults" OWNER TO postgres;

--
-- TOC entry 223 (class 1259 OID 17318)
-- Name: Exercices; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Exercices" (
    id text NOT NULL,
    name text NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);


ALTER TABLE public."Exercices" OWNER TO postgres;

--
-- TOC entry 233 (class 1259 OID 17406)
-- Name: ExercicesResultsPosts; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."ExercicesResultsPosts" (
    "postsId" text NOT NULL,
    "exercicesResultsId" text NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);


ALTER TABLE public."ExercicesResultsPosts" OWNER TO postgres;

--
-- TOC entry 234 (class 1259 OID 17544)
-- Name: Follows; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Follows" (
    "followedById" text NOT NULL,
    "followingId" text NOT NULL
);


ALTER TABLE public."Follows" OWNER TO postgres;

--
-- TOC entry 225 (class 1259 OID 17334)
-- Name: MuscleGroups; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."MuscleGroups" (
    id text NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL,
    name text NOT NULL
);


ALTER TABLE public."MuscleGroups" OWNER TO postgres;

--
-- TOC entry 235 (class 1259 OID 17561)
-- Name: Notifications; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Notifications" (
    id text NOT NULL,
    "userId" text NOT NULL,
    type text NOT NULL,
    content text NOT NULL,
    "isRead" boolean DEFAULT false NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE public."Notifications" OWNER TO postgres;

--
-- TOC entry 219 (class 1259 OID 17286)
-- Name: Posts; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Posts" (
    id text NOT NULL,
    photo text,
    title text,
    content text NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL,
    "authorId" text NOT NULL
);


ALTER TABLE public."Posts" OWNER TO postgres;

--
-- TOC entry 221 (class 1259 OID 17302)
-- Name: Programs; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Programs" (
    id text NOT NULL,
    name text NOT NULL,
    description text NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL,
    "authorId" text NOT NULL
);


ALTER TABLE public."Programs" OWNER TO postgres;

--
-- TOC entry 232 (class 1259 OID 17398)
-- Name: Role; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Role" (
    id text NOT NULL,
    name text NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);


ALTER TABLE public."Role" OWNER TO postgres;

--
-- TOC entry 236 (class 1259 OID 17590)
-- Name: Sets; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Sets" (
    id text NOT NULL,
    reps integer NOT NULL,
    weight integer NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL,
    "exerciceResultId" text NOT NULL
);


ALTER TABLE public."Sets" OWNER TO postgres;

--
-- TOC entry 237 (class 1259 OID 17603)
-- Name: Tags; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Tags" (
    id text NOT NULL,
    name text NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);


ALTER TABLE public."Tags" OWNER TO postgres;

--
-- TOC entry 238 (class 1259 OID 17611)
-- Name: TagsPosts; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."TagsPosts" (
    "postId" text NOT NULL,
    "tagId" text NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);


ALTER TABLE public."TagsPosts" OWNER TO postgres;

--
-- TOC entry 218 (class 1259 OID 17278)
-- Name: User; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."User" (
    id text NOT NULL,
    pseudo text NOT NULL,
    email text NOT NULL,
    "passwordHash" text NOT NULL,
    bio text,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL,
    "profilePhoto" text,
    "roleId" text,
    "cityId" text,
    "isBan" boolean DEFAULT false NOT NULL
);


ALTER TABLE public."User" OWNER TO postgres;

--
-- TOC entry 228 (class 1259 OID 17366)
-- Name: UsersComments; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."UsersComments" (
    "postsId" text NOT NULL,
    "usersId" text NOT NULL,
    content text NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);


ALTER TABLE public."UsersComments" OWNER TO postgres;

--
-- TOC entry 226 (class 1259 OID 17350)
-- Name: UsersLikes; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."UsersLikes" (
    "postsId" text NOT NULL,
    "usersId" text NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE public."UsersLikes" OWNER TO postgres;

--
-- TOC entry 231 (class 1259 OID 17390)
-- Name: UsersProgramsFollows; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."UsersProgramsFollows" (
    "programId" text NOT NULL,
    "userId" text NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);


ALTER TABLE public."UsersProgramsFollows" OWNER TO postgres;

--
-- TOC entry 227 (class 1259 OID 17358)
-- Name: UsersShares; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."UsersShares" (
    "postsId" text NOT NULL,
    "usersId" text NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE public."UsersShares" OWNER TO postgres;

--
-- TOC entry 222 (class 1259 OID 17310)
-- Name: Workouts; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Workouts" (
    id text NOT NULL,
    name text NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL,
    "programId" text NOT NULL,
    "userId" text NOT NULL
);


ALTER TABLE public."Workouts" OWNER TO postgres;

--
-- TOC entry 230 (class 1259 OID 17382)
-- Name: WorkoutsExercises; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."WorkoutsExercises" (
    "workoutId" text NOT NULL,
    "exerciceId" text NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);


ALTER TABLE public."WorkoutsExercises" OWNER TO postgres;

--
-- TOC entry 217 (class 1259 OID 17092)
-- Name: _prisma_migrations; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public._prisma_migrations (
    id character varying(36) NOT NULL,
    checksum character varying(64) NOT NULL,
    finished_at timestamp with time zone,
    migration_name character varying(255) NOT NULL,
    logs text,
    rolled_back_at timestamp with time zone,
    started_at timestamp with time zone DEFAULT now() NOT NULL,
    applied_steps_count integer DEFAULT 0 NOT NULL
);


ALTER TABLE public._prisma_migrations OWNER TO postgres;

--
-- TOC entry 5024 (class 0 OID 17294)
-- Dependencies: 220
-- Data for Name: City; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."City" (id, name, country, "createdAt", "updatedAt") FROM stdin;
city1	Paris	France	2024-11-24 15:13:05.281	2024-11-24 15:13:05.281
city2	Lyon	France	2024-11-24 15:13:05.281	2024-11-24 15:13:05.281
city3	Marseille	France	2024-11-24 15:13:05.281	2024-11-24 15:13:05.281
city4	Toulouse	France	2024-11-24 15:13:05.281	2024-11-24 15:13:05.281
city5	Bordeaux	France	2024-11-24 15:13:05.281	2024-11-24 15:13:05.281
city6	Nice	France	2024-11-24 15:13:05.281	2024-11-24 15:13:05.281
city7	Nantes	France	2024-11-24 15:13:05.281	2024-11-24 15:13:05.281
city8	Strasbourg	France	2024-11-24 15:13:05.281	2024-11-24 15:13:05.281
city9	Montpellier	France	2024-11-24 15:13:05.281	2024-11-24 15:13:05.281
city10	Lille	France	2024-11-24 15:13:05.281	2024-11-24 15:13:05.281
city11	Rennes	France	2024-11-24 15:13:05.281	2024-11-24 15:13:05.281
city12	Reims	France	2024-11-24 15:13:05.281	2024-11-24 15:13:05.281
city13	Toulon	France	2024-11-24 15:13:05.281	2024-11-24 15:13:05.281
city14	Le Havre	France	2024-11-24 15:13:05.281	2024-11-24 15:13:05.281
city15	Saint-Étienne	France	2024-11-24 15:13:05.281	2024-11-24 15:13:05.281
city16	Grenoble	France	2024-11-24 15:13:05.281	2024-11-24 15:13:05.281
city17	Dijon	France	2024-11-24 15:13:05.281	2024-11-24 15:13:05.281
city18	Angers	France	2024-11-24 15:13:05.281	2024-11-24 15:13:05.281
city19	Villeurbanne	France	2024-11-24 15:13:05.281	2024-11-24 15:13:05.281
city20	Clermont-Ferrand	France	2024-11-24 15:13:05.281	2024-11-24 15:13:05.281
\.


--
-- TOC entry 5033 (class 0 OID 17374)
-- Dependencies: 229
-- Data for Name: ExerciceMuscleGroups; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."ExerciceMuscleGroups" ("exercicesId", "musculeGroupsId", "createdAt", "updatedAt") FROM stdin;
\.


--
-- TOC entry 5028 (class 0 OID 17326)
-- Dependencies: 224
-- Data for Name: ExerciceResults; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."ExerciceResults" (id, "createdAt", "updatedAt", "exerciceId", "userId") FROM stdin;
result2	2024-11-24 15:30:38.943	2024-11-24 15:30:38.943	exercise2	cuid2
result3	2024-11-24 15:30:38.943	2024-11-24 15:30:38.943	exercise3	cuid3
result4	2024-11-24 15:30:38.943	2024-11-24 15:30:38.943	exercise4	cuid4
result5	2024-11-24 15:30:38.943	2024-11-24 15:30:38.943	exercise5	cuid5
result6	2024-11-24 15:30:38.943	2024-11-24 15:30:38.943	exercise6	cuid6
result7	2024-11-24 15:30:38.943	2024-11-24 15:30:38.943	exercise7	cuid7
result8	2024-11-24 15:30:38.943	2024-11-24 15:30:38.943	exercise8	cuid8
result9	2024-11-24 15:30:38.943	2024-11-24 15:30:38.943	exercise9	cuid9
result10	2024-11-24 15:30:38.943	2024-11-24 15:30:38.943	exercise10	cuid10
result1	2024-11-24 15:30:38.943	2024-12-08 12:39:34.679	exercise1	gauthier
gauthier	2024-12-08 12:40:10.521	2024-12-08 12:39:36.495	exercise1	gauthier
\.


--
-- TOC entry 5027 (class 0 OID 17318)
-- Dependencies: 223
-- Data for Name: Exercices; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Exercices" (id, name, "createdAt", "updatedAt") FROM stdin;
exercise2	Squat	2024-11-24 15:13:29.883	2024-11-24 15:13:29.883
exercise3	Soulevé de terre	2024-11-24 15:13:29.883	2024-11-24 15:13:29.883
exercise4	Tractions	2024-11-24 15:13:29.883	2024-11-24 15:13:29.883
exercise5	Curl biceps	2024-11-24 15:13:29.883	2024-11-24 15:13:29.883
exercise6	Extensions triceps	2024-11-24 15:13:29.883	2024-11-24 15:13:29.883
exercise7	Fentes	2024-11-24 15:13:29.883	2024-11-24 15:13:29.883
exercise8	Développé militaire	2024-11-24 15:13:29.883	2024-11-24 15:13:29.883
exercise9	Rowing barre	2024-11-24 15:13:29.883	2024-11-24 15:13:29.883
exercise10	Pompes	2024-11-24 15:13:29.883	2024-11-24 15:13:29.883
exercise11	Abdos crunch	2024-11-24 15:13:29.883	2024-11-24 15:13:29.883
exercise12	Planche	2024-11-24 15:13:29.883	2024-11-24 15:13:29.883
exercise13	Élévations latérales	2024-11-24 15:13:29.883	2024-11-24 15:13:29.883
exercise14	Oiseau	2024-11-24 15:13:29.883	2024-11-24 15:13:29.883
exercise15	Mollets debout	2024-11-24 15:13:29.883	2024-11-24 15:13:29.883
exercise16	Presse à jambes	2024-11-24 15:13:29.883	2024-11-24 15:13:29.883
exercise17	Extension des ischios	2024-11-24 15:13:29.883	2024-11-24 15:13:29.883
exercise18	Pull-over	2024-11-24 15:13:29.883	2024-11-24 15:13:29.883
exercise19	Chaises	2024-11-24 15:13:29.883	2024-11-24 15:13:29.883
exercise20	Burpees	2024-11-24 15:13:29.883	2024-11-24 15:13:29.883
exercise1	Développé couché avec haltères	2024-11-24 15:13:29.883	2024-12-08 12:38:36.053
\.


--
-- TOC entry 5037 (class 0 OID 17406)
-- Dependencies: 233
-- Data for Name: ExercicesResultsPosts; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."ExercicesResultsPosts" ("postsId", "exercicesResultsId", "createdAt", "updatedAt") FROM stdin;
\.


--
-- TOC entry 5038 (class 0 OID 17544)
-- Dependencies: 234
-- Data for Name: Follows; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Follows" ("followedById", "followingId") FROM stdin;
cuid1	cuid2
cuid1	cuid3
cuid2	cuid4
cuid2	cuid5
cuid3	cuid6
cuid3	cuid7
cuid4	cuid8
cuid4	cuid9
cuid5	cuid10
cuid5	cuid11
cuid6	cuid12
cuid6	cuid13
cuid7	cuid14
cuid7	cuid15
cuid8	cuid16
cuid8	cuid17
cuid9	cuid18
cuid9	cuid19
cuid10	cuid20
cuid10	cuid1
cuid1	cuid4
cuid2	cuid6
cuid2	cuid7
cuid3	cuid8
cuid3	cuid9
cuid3	cuid10
cuid4	cuid11
cuid4	cuid12
cuid4	cuid13
cuid5	cuid14
cuid5	cuid15
cuid5	cuid16
cuid6	cuid17
cuid6	cuid18
cuid6	cuid19
cuid7	cuid20
cuid7	cuid1
cuid7	cuid2
cuid8	cuid3
cuid8	cuid4
cuid8	cuid5
cuid9	cuid6
cuid9	cuid7
cuid9	cuid8
cuid10	cuid9
cuid10	cuid10
cuid10	cuid11
cuid11	cuid12
cuid11	cuid13
cuid11	cuid14
cuid12	cuid15
cuid12	cuid16
cuid12	cuid17
cuid13	cuid18
cuid13	cuid19
cuid13	cuid20
cuid14	cuid1
cuid14	cuid2
cuid14	cuid3
cuid15	cuid4
cuid15	cuid5
cuid15	cuid6
cuid16	cuid7
cuid16	cuid8
cuid16	cuid9
cuid17	cuid10
cuid17	cuid11
cuid17	cuid12
cuid18	cuid13
cuid18	cuid14
cuid18	cuid15
cuid19	cuid16
cuid19	cuid17
cuid19	cuid18
cuid20	cuid19
cuid20	cuid20
cuid20	cuid1
gauthier	cuid7
gauthier	cuid1
gauthier	cuid15
gauthier	cuid9
gauthier	cuid14
gauthier	cuid10
cuid19	gauthier
cuid18	gauthier
cuid7	gauthier
cuid6	gauthier
cuid5	gauthier
cuid4	gauthier
cuid1	gauthier
cuid9	gauthier
cuid10	gauthier
cuid14	gauthier
cuid15	gauthier
cuid3	gauthier
\.


--
-- TOC entry 5029 (class 0 OID 17334)
-- Dependencies: 225
-- Data for Name: MuscleGroups; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."MuscleGroups" (id, "createdAt", "updatedAt", name) FROM stdin;
muscle1	2024-11-24 15:13:20.73	2024-11-24 15:13:20.73	Dos
muscle2	2024-11-24 15:13:20.73	2024-11-24 15:13:20.73	Deltoïdes
muscle3	2024-11-24 15:13:20.73	2024-11-24 15:13:20.73	Pectoraux
muscle4	2024-11-24 15:13:20.73	2024-11-24 15:13:20.73	Biceps
muscle5	2024-11-24 15:13:20.73	2024-11-24 15:13:20.73	Triceps
muscle6	2024-11-24 15:13:20.73	2024-11-24 15:13:20.73	Abdominaux
muscle7	2024-11-24 15:13:20.73	2024-11-24 15:13:20.73	Quadriceps
muscle8	2024-11-24 15:13:20.73	2024-11-24 15:13:20.73	Ischio-jambiers
muscle9	2024-11-24 15:13:20.73	2024-11-24 15:13:20.73	Mollets
muscle10	2024-11-24 15:13:20.73	2024-11-24 15:13:20.73	Trapèzes
\.


--
-- TOC entry 5039 (class 0 OID 17561)
-- Dependencies: 235
-- Data for Name: Notifications; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Notifications" (id, "userId", type, content, "isRead", "createdAt") FROM stdin;
notif1	cuid1	follow	Vous avez un nouveau follower : cuid2.	f	2024-11-24 15:33:12.666
notif2	cuid2	like	Votre post a été aimé par cuid1.	t	2024-11-24 15:33:12.666
notif3	cuid3	share	Votre post a été partagé par cuid4.	f	2024-11-24 15:33:12.666
notif4	cuid4	comment	cuid5 a commenté votre post.	f	2024-11-24 15:33:12.666
notif5	cuid5	follow	Vous avez un nouveau follower : cuid6.	t	2024-11-24 15:33:12.666
\.


--
-- TOC entry 5023 (class 0 OID 17286)
-- Dependencies: 219
-- Data for Name: Posts; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Posts" (id, photo, title, content, "createdAt", "updatedAt", "authorId") FROM stdin;
post42	https://example.com/photos/post42.jpg	Barre Fixe	Les classiques restent efficaces ! 💥	2024-11-24 15:21:28.427	2024-11-24 15:21:28.427	cuid2
post10	https://images.unsplash.com/photo-1520774779505-a7782b3fb733?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cnVubmluZyUyMHJhaW58ZW58MHx8MHx8fDA%3D	Running	5 km sous la pluie 🌧️	2024-11-24 15:21:28.427	2024-11-24 15:03:49.059	cuid10
post1	https://images.unsplash.com/photo-1645810809381-97f6fd2f7d10?q=80&w=2130&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D	Squat profond	Le squat du jour 🔥	2024-11-24 15:21:28.427	2024-12-10 13:17:12.032	cuid1
post11	https://images.unsplash.com/photo-1514512364185-4c2b0985be01?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8cHVzaCUyMHVwfGVufDB8fDB8fHww	Pompes	Des pompes chaque jour, c'est la clé ! 🏆	2024-11-24 15:21:28.427	2024-11-24 15:03:49.059	cuid11
post12	https://images.unsplash.com/photo-1518644961665-ed172691aaa1?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Zml0bmVzcyUyMGZyaWVuZHN8ZW58MHx8MHx8fDA%3D	Fitness Friends	S'entraîner avec les amis = motivation 💕	2024-11-24 15:21:28.427	2024-11-24 15:03:49.059	cuid12
post13	https://images.unsplash.com/photo-1592632789004-57d4354f2499?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8bGVncyUyMHNwb3J0fGVufDB8fDB8fHww	Mollets en feu	Ça brûle, mais on aime ça 🔥	2024-11-24 15:21:28.427	2024-11-24 15:03:49.059	cuid13
post14	https://images.unsplash.com/photo-1603503364272-6e28e046b37a?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fHB1c2glMjB1cHxlbnwwfHwwfHx8MA%3D%3D	Push-Up Challenge	100 pompes, qui me suit ? 😎	2024-11-24 15:21:28.427	2024-11-24 15:03:49.059	cuid14
post15	https://images.unsplash.com/photo-1520787497953-1985ca467702?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YWJzfGVufDB8fDB8fHww	Core Training	Abdos en béton ! 🏋️	2024-11-24 15:21:28.427	2024-11-24 15:03:49.059	cuid15
post16	https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8eW9nYXxlbnwwfHwwfHx8MA%3D%3D	Yoga Time	Namaste 🙏	2024-11-24 15:21:28.427	2024-11-24 15:03:49.059	cuid16
post17	https://images.unsplash.com/photo-1681407978539-b57f1c41c75f?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8cHJlcGFyYXRpb24lMjBzcG9ydHxlbnwwfHwwfHx8MA%3D%3D	Préparation Physique	On prépare la prochaine compétition ⚡	2024-11-24 15:21:28.427	2024-11-24 15:03:49.059	cuid17
post18	https://images.unsplash.com/photo-1603394595873-62d990afa49a?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fHJvcGUlMjBqdW1wZWR8ZW58MHx8MHx8fDA%3D	Corde à sauter	Le cardio fun et efficace 🪢	2024-11-24 15:21:28.427	2024-11-24 15:03:49.059	cuid18
post19	https://images.unsplash.com/photo-1565873741541-59207da8b88d?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8cmVzdCUyMGRheXxlbnwwfHwwfHx8MA%3D%3D	Récupération	Stretching post-training pour éviter les courbatures 💆	2024-11-24 15:21:28.427	2024-11-24 15:03:49.059	cuid19
post2	https://images.unsplash.com/photo-1642267379398-c430d619019d?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8bGVnJTIwZGF5fGVufDB8fDB8fHww	Leg Day	Rien ne vaut un bon leg day 💪	2024-11-24 15:21:28.427	2024-11-24 15:03:49.059	cuid2
post20	https://images.unsplash.com/photo-1519311965067-36d3e5f33d39?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8YWZ0ZXIlMjB3b3Jrb3V0fGVufDB8fDB8fHww	Workout Done	Session terminée, heureux et fatigué 😌	2024-11-24 15:21:28.427	2024-11-24 15:03:49.059	cuid20
post21	https://images.unsplash.com/photo-1561061000-687d53665dc0?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8YmFjayUyMHdvcmtvdXR8ZW58MHx8MHx8fDA%3D	Trapèzes	Travailler les trapèzes aujourd'hui 💪	2024-11-24 15:21:28.427	2024-11-24 15:03:49.059	cuid1
post22	https://images.unsplash.com/photo-1506366516817-c9ea3d734adb?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8Z2Fpbnp8ZW58MHx8MHx8fDA%3D	Gainz Mode	Focus et détermination 🎯	2024-11-24 15:21:28.427	2024-11-24 15:03:49.059	cuid2
post23	https://images.unsplash.com/photo-1541600383005-565c949cf777?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8c3F1YXR8ZW58MHx8MHx8fDA%3D	Rep Max	Test de 1RM sur le squat 💥	2024-11-24 15:21:28.427	2024-11-24 15:03:49.059	cuid3
post24	https://images.unsplash.com/photo-1532517287333-fbb66d7e6006?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fGRyaW5rJTIwd2F0ZXJ8ZW58MHx8MHx8fDA%3D	Hydratation	Pensez à boire de l'eau 🚰	2024-11-24 15:21:28.427	2024-11-24 15:03:49.059	cuid4
post25	https://images.unsplash.com/photo-1677165733273-dcc3724c00e8?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8cHVsbCUyMHVwc3xlbnwwfHwwfHx8MA%3D%3D	Pull-Ups	Un bon nombre de tractions ce matin 🌟	2024-11-24 15:21:28.427	2024-11-24 15:03:49.059	cuid5
post26	https://images.unsplash.com/photo-1489659831163-682b5af42225?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8cnVubmluZ3xlbnwwfHwwfHx8MA%3D%3D	Morning Run	Courir au lever du soleil 🌅	2024-11-24 15:21:28.427	2024-11-24 15:03:49.059	cuid6
post27	https://images.unsplash.com/photo-1578762560042-46ad127c95ea?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8a2V0dGxlYmVsbHxlbnwwfHwwfHx8MA%3D%3D	Kettlebell	Swing, swing, swing ! 🏋️	2024-11-24 15:21:28.427	2024-11-24 15:03:49.059	cuid7
post28	https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8aGVhbHRoeSUyMGZvb2R8ZW58MHx8MHx8fDA%3D	Nutrition	Un bon repas après l'effort 🍽️	2024-11-24 15:21:28.427	2024-11-24 15:03:49.059	cuid8
post29	https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Z3ltfGVufDB8fDB8fHww	Delts	Épaules rondes en construction 🛠️	2024-11-24 15:21:28.427	2024-11-24 15:03:49.059	cuid9
post3	https://images.unsplash.com/photo-1662385929994-e93be8a24dcb?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGhpaXR8ZW58MHx8MHx8fDA%3D	Burpees	Session cardio intense ce matin ! 🏋️‍♂️	2024-11-24 15:21:28.427	2024-11-24 15:03:49.059	cuid3
post30	https://images.unsplash.com/photo-1604233098531-90b71b1b17a6?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8c3F1YXR8ZW58MHx8MHx8fDA%3D	Squat PR	Record battu sur le squat ! 🚀	2024-11-24 15:21:28.427	2024-11-24 15:03:49.059	cuid10
post31	https://images.unsplash.com/photo-1562771379-eafdca7a02f8?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8c3ByaW50c3xlbnwwfHwwfHx8MA%3D%3D	Sprints	Session explosive au parc 🏃‍♂️	2024-11-24 15:21:28.427	2024-11-24 15:03:49.059	cuid11
post32	https://images.unsplash.com/photo-1618881513484-b9fc3f48e584?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bW9iaWxpdHklMjBzcG9ydHxlbnwwfHwwfHx8MA%3D%3D	Mobility	Augmenter sa mobilité pour performer mieux 🦵	2024-11-24 15:21:28.427	2024-11-24 15:03:49.059	cuid12
post33	https://images.unsplash.com/photo-1671314986658-8982aa72625d?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8cHVsbCUyMGd5bXxlbnwwfHwwfHx8MA%3D%3D	Pull Day	Un bon tirage pour le dos 💪	2024-11-24 15:21:28.427	2024-11-24 15:03:49.059	cuid13
post34	https://plus.unsplash.com/premium_photo-1667518251023-12d83d46bb8d?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjV8fGNhcmRpb3xlbnwwfHwwfHx8MA%3D%3D	Cardio	Je déteste et j'aime le cardio 😂	2024-11-24 15:21:28.427	2024-11-24 15:03:49.059	cuid14
post35	https://images.unsplash.com/photo-1574680178050-55c6a6a96e0a?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjJ8fGNhcmRpb3xlbnwwfHwwfHx8MA%3D%3D	Progress Pics	Regarder où j'étais il y a 6 mois 🙌	2024-11-24 15:21:28.427	2024-11-24 15:03:49.059	cuid15
post36	https://images.unsplash.com/photo-1567598508481-65985588e295?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjB8fGNhcmRpb3xlbnwwfHwwfHx8MA%3D%3D	Posture	Travail sur la posture aujourd'hui 🦵	2024-11-24 15:21:28.427	2024-11-24 15:03:49.059	cuid16
post37	https://images.unsplash.com/photo-1518310790390-836058cb000b?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Z3ltJTIwZnJpZW5kc3xlbnwwfHwwfHx8MA%3D%3D	Friends & Fitness	Motivation à plusieurs 💕	2024-11-24 15:21:28.427	2024-11-24 15:03:49.059	cuid17
post38	https://images.unsplash.com/photo-1530143311094-34d807799e8f?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8aGlsbHMlMjBzcG9ydHxlbnwwfHwwfHx8MA%3D%3D	Hill Sprints	Gravir les collines avec puissance 🏔️	2024-11-24 15:21:28.427	2024-11-24 15:03:49.059	cuid18
post39	https://images.unsplash.com/photo-1533560974115-3c8b3b6a0082?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8ZGVhZGxpZnR8ZW58MHx8MHx8fDA%3D	Hamstrings	Focus sur les ischio-jambiers aujourd'hui 🔥	2024-11-24 15:21:28.427	2024-11-24 15:03:49.059	cuid19
post4	https://images.unsplash.com/photo-1534368959876-26bf04f2c947?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8YmVuY2glMjBwcmVzc3xlbnwwfHwwfHx8MA%3D%3D	PR Bench	Nouveau record personnel sur le bench press 💥	2024-11-24 15:21:28.427	2024-11-24 15:03:49.059	cuid4
post40	https://images.unsplash.com/photo-1652363722856-214ce6a06a44?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8YmVuY2glMjBwcmVzc3xlbnwwfHwwfHx8MA%3D%3D	Push Day	Une bonne journée de poussée 🏋️	2024-11-24 15:21:28.427	2024-11-24 15:03:49.059	cuid20
post6	https://images.unsplash.com/photo-1534368270820-9de3d8053204?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fGJlbmNoJTIwcHJlc3N8ZW58MHx8MHx8fDA%3D	Gainz	Progression visible ! 📈	2024-11-24 15:21:28.427	2024-11-24 15:03:49.059	cuid6
post49	https://images.unsplash.com/photo-1652363722833-509b3aac287b?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fGJlbmNoJTIwcHJlc3N8ZW58MHx8MHx8fDA%3D	Motivation	Chaque jour, un pas de plus 💫	2024-11-24 15:21:28.427	2024-11-24 15:03:49.059	cuid9
post44	https://images.unsplash.com/photo-1531520563951-4c0e3d3fcacc?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8Z3ltfGVufDB8fDB8fHww	Cool Down	Finir la séance par un bon étirement 🧘	2024-11-24 15:21:28.427	2024-11-24 15:03:49.059	cuid4
post41	https://images.unsplash.com/photo-1548690312-e3b507d8c110?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGd5bXxlbnwwfHwwfHx8MA%3D%3D	Circuit Training	Un bon circuit pour transpirer 💧	2024-11-24 15:21:28.427	2024-11-24 15:03:49.059	cuid1
post45	https://images.unsplash.com/photo-1550259979-ed79b48d2a30?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fGd5bXxlbnwwfHwwfHx8MA%3D%3D	HIIT	Courte mais intense 🔥	2024-11-24 15:21:28.427	2024-11-24 15:03:49.059	cuid5
post50	https://images.unsplash.com/photo-1434682881908-b43d0467b798?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fGd5bXxlbnwwfHwwfHx8MA%3D%3D	Dernière Rép	Donner tout ce qu'on a dans la dernière répétition ⚡	2024-11-24 15:21:28.427	2024-11-24 15:03:49.059	cuid10
post43	https://images.unsplash.com/photo-1536922246289-88c42f957773?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTl8fGd5bXxlbnwwfHwwfHx8MA%3D%3D	Bodyweight	Pas besoin de machines pour s'entraîner 👌	2024-11-24 15:21:28.427	2024-11-24 15:03:49.059	cuid3
post5	https://images.unsplash.com/photo-1595078475328-1ab05d0a6a0e?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjJ8fGd5bXxlbnwwfHwwfHx8MA%3D%3D	Deadlift	Deadlift = amour 💯	2024-11-24 15:21:28.427	2024-11-24 15:03:49.059	cuid5
post7	https://images.unsplash.com/photo-1518611012118-696072aa579a?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjN8fGd5bXxlbnwwfHwwfHx8MA%3D%3D	Planche	Qui peut tenir 2 minutes ? 😏	2024-11-24 15:21:28.427	2024-11-24 15:03:49.059	cuid7
post48	https://images.unsplash.com/photo-1519505907962-0a6cb0167c73?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D	Endurance	Une bonne session longue distance 🏃‍♀️	2024-11-24 15:21:28.427	2024-11-24 15:03:49.059	cuid8
post9	https://images.unsplash.com/photo-1598268030450-7a476f602bf6?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8YmljZXBzJTIwY3VybHxlbnwwfHwwfHx8MA%3D%3D	Biceps Curl	Focus sur les bras aujourd'hui 💪	2024-11-24 15:21:28.427	2024-11-24 15:03:49.059	cuid9
post8	https://images.unsplash.com/photo-1516208813382-cbaf53501037?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fHNob3VsZGVyJTIwZ3ltfGVufDB8fDB8fHww	Stretching	Ne jamais négliger la souplesse 🤸‍♀️	2024-11-24 15:21:28.427	2024-11-24 15:03:49.059	cuid8
post46	https://images.unsplash.com/photo-1659350725631-7c70d152d56b?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjB8fHNob3VsZGVyJTIwZ3ltfGVufDB8fDB8fHww	Développé Épaules	Toujours viser plus haut ! 🎯	2024-11-24 15:21:28.427	2024-11-24 15:03:49.059	cuid6
post47	https://images.unsplash.com/photo-1677165733273-dcc3724c00e8?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8cHVsbCUyMHVwfGVufDB8fDB8fHww	Pull-Ups Again	Les tractions, ça ne vieillit jamais 💪	2024-11-24 15:21:28.427	2024-11-24 15:03:49.059	cuid7
gauthier	https://miro.medium.com/v2/resize:fit:1200/1*KiKfbR4yX81t9WC6gPoyvw.jpeg	Développer coucher	❤️❤️❤️	2024-12-08 10:55:35.263	2024-12-08 10:56:10.453	gauthier
\.


--
-- TOC entry 5025 (class 0 OID 17302)
-- Dependencies: 221
-- Data for Name: Programs; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Programs" (id, name, description, "createdAt", "updatedAt", "authorId") FROM stdin;
program1	Débutant Full Body	Un programme pour débutants couvrant tout le corps.	2024-11-24 15:33:12.666	2024-11-24 15:33:12.666	cuid1
program2	Entraînement PPL	Push, Pull, Legs pour des gains équilibrés.	2024-11-24 15:33:12.666	2024-11-24 15:33:12.666	cuid2
program3	Force et Hypertrophie	Un programme pour augmenter la force et le volume.	2024-11-24 15:33:12.666	2024-11-24 15:33:12.666	cuid3
program4	HIIT pour Cardio	Sessions courtes et intenses pour brûler des calories.	2024-11-24 15:33:12.666	2024-11-24 15:33:12.666	cuid4
program5	Planche et Core	Focus sur les muscles du tronc et la stabilité.	2024-11-24 15:33:12.666	2024-11-24 15:33:12.666	cuid5
gauthier	PPL/Upper	Programme 4 jours 	2024-11-24 15:10:09.889	2024-11-24 15:09:19.415	gauthier
\.


--
-- TOC entry 5036 (class 0 OID 17398)
-- Dependencies: 232
-- Data for Name: Role; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Role" (id, name, "createdAt", "updatedAt") FROM stdin;
role1	User	2024-11-24 15:13:12.763	2024-11-24 15:13:12.763
role2	Admin	2024-11-24 15:13:12.763	2024-11-24 15:13:12.763
\.


--
-- TOC entry 5040 (class 0 OID 17590)
-- Dependencies: 236
-- Data for Name: Sets; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Sets" (id, reps, weight, "createdAt", "updatedAt", "exerciceResultId") FROM stdin;
set2	8	55	2024-11-24 15:30:38.943	2024-11-24 15:30:38.943	result2
set3	12	40	2024-11-24 15:30:38.943	2024-11-24 15:30:38.943	result3
set4	15	30	2024-11-24 15:30:38.943	2024-11-24 15:30:38.943	result4
set5	6	70	2024-11-24 15:30:38.943	2024-11-24 15:30:38.943	result5
set6	8	65	2024-11-24 15:30:38.943	2024-11-24 15:30:38.943	result6
set7	10	60	2024-11-24 15:30:38.943	2024-11-24 15:30:38.943	result7
set8	12	45	2024-11-24 15:30:38.943	2024-11-24 15:30:38.943	result8
set9	15	35	2024-11-24 15:30:38.943	2024-11-24 15:30:38.943	result9
set10	8	75	2024-11-24 15:30:38.943	2024-11-24 15:30:38.943	result10
set1	9	42	2024-11-24 15:30:38.943	2024-12-08 12:37:11.64	result1
gauthier1	9	42	2024-12-08 12:42:00.373	2024-12-08 12:40:19.273	gauthier
gauthier2	9	42	2024-12-08 12:42:01.373	2024-12-08 12:46:20.029	gauthier
gauthier3	8	42	2024-12-08 12:42:02.373	2024-12-08 12:46:20.029	gauthier
gauthier4	7	38	2024-12-08 12:42:03.373	2024-12-08 12:46:20.029	gauthier
set11	8	42	2024-11-24 15:30:38.953	2024-12-08 12:46:20.029	result1
set12	7	42	2024-11-24 15:30:38.963	2024-12-08 12:46:20.029	result1
set13	8	38	2024-11-24 15:30:38.973	2024-12-08 12:48:01.989	result1
\.


--
-- TOC entry 5041 (class 0 OID 17603)
-- Dependencies: 237
-- Data for Name: Tags; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Tags" (id, name, "createdAt", "updatedAt") FROM stdin;
tag1	Pump	2024-11-24 15:11:10.355	2024-11-24 15:11:10.355
tag2	Gainz	2024-11-24 15:11:10.355	2024-11-24 15:11:10.355
tag3	Leg Day	2024-11-24 15:11:10.355	2024-11-24 15:11:10.355
tag4	PR	2024-11-24 15:11:10.355	2024-11-24 15:11:10.355
tag5	Chest Day	2024-11-24 15:11:10.355	2024-11-24 15:11:10.355
tag6	Strength	2024-11-24 15:11:10.355	2024-11-24 15:11:10.355
tag7	Hypertrophy	2024-11-24 15:11:10.355	2024-11-24 15:11:10.355
tag8	Recovery	2024-11-24 15:11:10.355	2024-11-24 15:11:10.355
tag9	Deadlift	2024-11-24 15:11:10.355	2024-11-24 15:11:10.355
tag10	Squat	2024-11-24 15:11:10.355	2024-11-24 15:11:10.355
tag11	Bench Press	2024-11-24 15:11:10.355	2024-11-24 15:11:10.355
tag12	Core	2024-11-24 15:11:10.355	2024-11-24 15:11:10.355
tag13	Back Day	2024-11-24 15:11:10.355	2024-11-24 15:11:10.355
tag14	Arms	2024-11-24 15:11:10.355	2024-11-24 15:11:10.355
tag15	Cardio	2024-11-24 15:11:10.355	2024-11-24 15:11:10.355
tag16	Warm Up	2024-11-24 15:11:10.355	2024-11-24 15:11:10.355
tag17	Cool Down	2024-11-24 15:11:10.355	2024-11-24 15:11:10.355
tag18	Mobility	2024-11-24 15:11:10.355	2024-11-24 15:11:10.355
tag19	Powerlifting	2024-11-24 15:11:10.355	2024-11-24 15:11:10.355
tag20	Bodybuilding	2024-11-24 15:11:10.355	2024-11-24 15:11:10.355
\.


--
-- TOC entry 5042 (class 0 OID 17611)
-- Dependencies: 238
-- Data for Name: TagsPosts; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."TagsPosts" ("postId", "tagId", "createdAt", "updatedAt") FROM stdin;
post1	tag3	2024-11-24 15:22:34.407	2024-11-24 15:22:34.407
post1	tag10	2024-11-24 15:22:34.407	2024-11-24 15:22:34.407
post2	tag2	2024-11-24 15:22:34.407	2024-11-24 15:22:34.407
post2	tag7	2024-11-24 15:22:34.407	2024-11-24 15:22:34.407
post3	tag1	2024-11-24 15:22:34.407	2024-11-24 15:22:34.407
post4	tag4	2024-11-24 15:22:34.407	2024-11-24 15:22:34.407
post4	tag6	2024-11-24 15:22:34.407	2024-11-24 15:22:34.407
post10	tag15	2024-11-24 15:22:34.407	2024-11-24 15:22:34.407
post10	tag18	2024-11-24 15:22:34.407	2024-11-24 15:22:34.407
post9	tag13	2024-11-24 15:22:34.407	2024-11-24 15:22:34.407
post5	tag5	2024-11-24 15:22:34.407	2024-11-24 15:22:34.407
post7	tag3	2024-11-24 15:22:34.407	2024-11-24 15:22:34.407
post20	tag16	2024-11-24 15:22:34.407	2024-11-24 15:22:34.407
post6	tag17	2024-11-24 15:22:34.407	2024-11-24 15:22:34.407
post8	tag14	2024-11-24 15:22:34.407	2024-11-24 15:22:34.407
post12	tag12	2024-11-24 15:22:34.407	2024-11-24 15:22:34.407
post14	tag8	2024-11-24 15:22:34.407	2024-11-24 15:22:34.407
post19	tag9	2024-11-24 15:22:34.407	2024-11-24 15:22:34.407
post11	tag11	2024-11-24 15:22:34.407	2024-11-24 15:22:34.407
post15	tag6	2024-11-24 15:22:34.407	2024-11-24 15:22:34.407
post16	tag7	2024-11-24 15:22:34.407	2024-11-24 15:22:34.407
post18	tag19	2024-11-24 15:22:34.407	2024-11-24 15:22:34.407
post13	tag20	2024-11-24 15:22:34.407	2024-11-24 15:22:34.407
\.


--
-- TOC entry 5022 (class 0 OID 17278)
-- Dependencies: 218
-- Data for Name: User; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."User" (id, pseudo, email, "passwordHash", bio, "createdAt", "updatedAt", "profilePhoto", "roleId", "cityId", "isBan") FROM stdin;
cuid18	dance_lover	dance.lover@example.com	hashed_password_18	Passionné de danse et de musique.	2024-11-24 15:15:09.208	2024-11-24 14:45:03.695	https://images.unsplash.com/photo-1628015081036-0747ec8f077a?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8Z2lybHxlbnwwfHwwfHx8MA%3D%3D	\N	city18	f
cuid1	john_doe	john.doe@example.com	hashed_password_1	Passionné de fitness et de nutrition.	2024-11-24 15:15:09.208	2024-11-24 14:39:38.689	https://images.unsplash.com/photo-1499996860823-5214fcc65f8f?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bWVufGVufDB8fDB8fHww	\N	city1	f
cuid10	strength_guru	strength.guru@example.com	hashed_password_10	Spécialiste en musculation.	2024-11-24 15:15:09.208	2024-11-24 14:45:03.695	https://images.unsplash.com/photo-1503001358144-8d7f2c1db9f5?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8bWVufGVufDB8fDB8fHww	\N	city10	f
cuid11	nature_lover	nature.lover@example.com	hashed_password_11	Randonnées et aventures en plein air.	2024-11-24 15:15:09.208	2024-11-24 14:45:03.695	https://images.unsplash.com/photo-1519058082700-08a0b56da9b4?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8bWVufGVufDB8fDB8fHww	\N	city11	f
cuid12	swimmer_pro	swimmer.pro@example.com	hashed_password_12	Nageur professionnel.	2024-11-24 15:15:09.208	2024-11-24 14:45:03.695	https://images.unsplash.com/photo-1611403119860-57c4937ef987?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDF8fHxlbnwwfHx8fHw%3D	\N	city12	f
cuid13	adventure_seeker	adventure.seeker@example.com	hashed_password_13	Voyages et sensations fortes.	2024-11-24 15:15:09.208	2024-11-24 14:45:03.695	https://images.unsplash.com/photo-1507081323647-4d250478b919?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDJ8fHxlbnwwfHx8fHw%3D	\N	city13	f
cuid15	tech_lifter	tech.lifter@example.com	hashed_password_15	Développeur et amateur de gym.	2024-11-24 15:15:09.208	2024-11-24 14:45:03.695	https://images.unsplash.com/photo-1492288991661-058aa541ff43?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDd8fHxlbnwwfHx8fHw%3D	\N	city15	f
cuid16	zen_guy	zen.guy@example.com	hashed_password_16	Méditation et relaxation.	2024-11-24 15:15:09.208	2024-11-24 14:45:03.695	https://images.unsplash.com/photo-1441786485319-5e0f0c092803?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDEwfHx8ZW58MHx8fHx8	\N	city16	f
cuid17	gym_rat	gym.rat@example.com	hashed_password_17	Toujours à la salle.	2024-11-24 15:15:09.208	2024-11-24 14:45:03.695	https://images.unsplash.com/photo-1664575602554-2087b04935a5?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8d29tYW58ZW58MHx8MHx8fDA%3D	\N	city17	f
cuid19	martial_artist	martial.artist@example.com	hashed_password_19	Artiste martial depuis 10 ans.	2024-11-24 15:15:09.208	2024-11-24 14:45:03.695	https://images.unsplash.com/photo-1613005798967-632017e477c8?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8Z2lybHxlbnwwfHwwfHx8MA%3D%3D	\N	city19	f
cuid2	jane_smith	jane.smith@example.com	hashed_password_2	Adepte de yoga et méditation.	2024-11-24 15:15:09.208	2024-11-24 14:45:03.695	https://images.unsplash.com/photo-1505033575518-a36ea2ef75ae?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cHJvZmlsZXxlbnwwfHwwfHx8MA%3D%3D	\N	city2	f
cuid9	bike_enthusiast	bike.enthusiast@example.com	hashed_password_9	Amateur de cyclisme.	2024-11-24 15:15:09.208	2024-11-24 15:08:17.9	https://images.unsplash.com/photo-1486166849615-da9f8d217a00?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8YmlrZSUyMGd1eXxlbnwwfHwwfHx8MA%3D%3D	\N	city9	f
gauthier	John	seyzgauthier@gmail.com	$2b$10$51HQvB9plogKkCR3HrIT.uhn9511ruokZFbS0eN2.p1NR94Kc9Ue2	No pen no gain	2024-11-24 14:35:19.265	2024-12-10 13:15:22.108	https://images.unsplash.com/photo-1591741543032-bf439b4fd46c?q=80&w=2187&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D	\N	city8	f
cuid14	fit_mom	fit.mom@example.com	hashed_password_14	Maman active et motivée.	2024-11-24 15:15:09.208	2024-12-10 13:17:49.676	https://images.unsplash.com/photo-1645810809381-97f6fd2f7d10?q=80&w=2130&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D	\N	city14	f
cuid20	foodie_runner	foodie.runner@example.com	hashed_password_20	Combine gastronomie et running.	2024-11-24 15:15:09.208	2024-11-24 14:45:03.695	https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8cHJvZmlsZXxlbnwwfHwwfHx8MA%3D%3D	\N	city20	f
cuid3	fit_fanatic	fit.fanatic@example.com	hashed_password_3	Entraîneur personnel et coach.	2024-11-24 15:15:09.208	2024-11-24 14:45:03.695	https://images.unsplash.com/photo-1532074205216-d0e1f4b87368?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fHByb2ZpbGV8ZW58MHx8MHx8fDA%3D	\N	city3	f
cuid4	runner123	runner123@example.com	hashed_password_4	Fan de course à pied et marathons.	2024-11-24 15:15:09.208	2024-11-24 14:45:03.695	https://images.unsplash.com/photo-1502323777036-f29e3972d82f?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fHByb2ZpbGV8ZW58MHx8MHx8fDA%3D	\N	city4	f
cuid5	mountain_climber	mountain.climber@example.com	hashed_password_5	Amoureux des sommets et des randonnées.	2024-11-24 15:15:09.208	2024-11-24 14:45:03.695	https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fHByb2ZpbGV8ZW58MHx8MHx8fDA%3D	\N	city5	f
cuid6	healthy_eater	healthy.eater@example.com	hashed_password_6	Gourmet et nutritionniste.	2024-11-24 15:15:09.208	2024-11-24 14:45:03.695	https://images.unsplash.com/photo-1506863530036-1efeddceb993?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fHByb2ZpbGV8ZW58MHx8MHx8fDA%3D	\N	city6	f
cuid7	crossfit_queen	crossfit.queen@example.com	hashed_password_7	Accro au CrossFit.	2024-11-24 15:15:09.208	2024-11-24 14:45:03.695	https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NTl8fHByb2ZpbGV8ZW58MHx8MHx8fDA%3D	\N	city7	f
cuid8	yoga_master	yoga.master@example.com	hashed_password_8	Instructeur de yoga certifié.	2024-11-24 15:15:09.208	2024-11-24 14:45:03.695	https://images.unsplash.com/photo-1525873765963-8931ab571545?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NjB8fHByb2ZpbGV8ZW58MHx8MHx8fDA%3D	\N	city8	f
\.


--
-- TOC entry 5032 (class 0 OID 17366)
-- Dependencies: 228
-- Data for Name: UsersComments; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."UsersComments" ("postsId", "usersId", content, "createdAt", "updatedAt") FROM stdin;
post1	cuid1	Super séance aujourd'hui ! 💪	2024-11-24 15:28:42.371	2024-11-24 15:28:42.371
post2	cuid1	Quel exercice incroyable, merci pour le partage !	2024-11-24 15:28:42.371	2024-11-24 15:28:42.371
post3	cuid2	J'ai adoré cet entraînement, à refaire !	2024-11-24 15:28:42.371	2024-11-24 15:28:42.371
post4	cuid2	Trop inspirant, merci ! 🙌	2024-11-24 15:28:42.371	2024-11-24 15:28:42.371
post5	cuid3	Mes jambes me remercient pas, mais moi oui 😂	2024-11-24 15:28:42.371	2024-11-24 15:28:42.371
post6	cuid3	Très bonne technique sur cet exercice !	2024-11-24 15:28:42.371	2024-11-24 15:28:42.371
post7	cuid4	Est-ce que tu as des alternatives pour cet exercice ?	2024-11-24 15:28:42.371	2024-11-24 15:28:42.371
post8	cuid4	Merci pour la motivation, on lâche rien 💯	2024-11-24 15:28:42.371	2024-11-24 15:28:42.371
post9	cuid5	Trop stylé ce post, continue comme ça !	2024-11-24 15:28:42.371	2024-11-24 15:28:42.371
post10	cuid5	Le gain est réel avec cette méthode !	2024-11-24 15:28:42.371	2024-11-24 15:28:42.371
post11	cuid6	Je vais essayer cet entraînement dès demain.	2024-11-24 15:28:42.371	2024-11-24 15:28:42.371
post12	cuid6	Bravo pour ton progrès, super motivant !	2024-11-24 15:28:42.371	2024-11-24 15:28:42.371
post13	cuid7	Rien de mieux qu'un bon squat 🔥	2024-11-24 15:28:42.371	2024-11-24 15:28:42.371
post14	cuid7	Ce contenu est vraiment inspirant.	2024-11-24 15:28:42.371	2024-11-24 15:28:42.371
post15	cuid8	Les abdos sont prêts pour l'été 🏖️	2024-11-24 15:28:42.371	2024-11-24 15:28:42.371
post16	cuid8	Incroyable cette performance ! 💪	2024-11-24 15:28:42.371	2024-11-24 15:28:42.371
post17	cuid9	Comment progresser rapidement sur cet exercice ?	2024-11-24 15:28:42.371	2024-11-24 15:28:42.371
post18	cuid9	Trop cool cette méthode d'entraînement.	2024-11-24 15:28:42.371	2024-11-24 15:28:42.371
post19	cuid10	Je ne connaissais pas cet exercice, merci !	2024-11-24 15:28:42.371	2024-11-24 15:28:42.371
post20	cuid10	Toujours au top tes publications 👍	2024-11-24 15:28:42.371	2024-11-24 15:28:42.371
post1	cuid11	Un vrai modèle d'inspiration 💫	2024-11-24 15:28:42.371	2024-11-24 15:28:42.371
post2	cuid11	Ton contenu est toujours pertinent, merci !	2024-11-24 15:28:42.371	2024-11-24 15:28:42.371
post3	cuid12	Je vais tenter cet enchaînement ce week-end.	2024-11-24 15:28:42.371	2024-11-24 15:28:42.371
post4	cuid12	Parfait pour améliorer ma posture, merci 🙏	2024-11-24 15:28:42.371	2024-11-24 15:28:42.371
post5	cuid13	Un vrai challenge, mais tellement efficace.	2024-11-24 15:28:42.371	2024-11-24 15:28:42.371
post6	cuid13	Une méthode à essayer, merci pour le partage.	2024-11-24 15:28:42.371	2024-11-24 15:28:42.371
post7	cuid14	Bravo pour ton effort, continue !	2024-11-24 15:28:42.371	2024-11-24 15:28:42.371
post8	cuid14	Je me lance dès demain sur cet exercice.	2024-11-24 15:28:42.371	2024-11-24 15:28:42.371
post9	cuid15	Un bon boost de motivation 💥	2024-11-24 15:28:42.371	2024-11-24 15:28:42.371
post10	cuid15	Super post, merci pour l'inspiration.	2024-11-24 15:28:42.371	2024-11-24 15:28:42.371
post11	cuid16	Toujours motivé grâce à tes conseils !	2024-11-24 15:28:42.371	2024-11-24 15:28:42.371
post12	cuid16	Ce genre de contenu est exactement ce qu'il me faut.	2024-11-24 15:28:42.371	2024-11-24 15:28:42.371
post13	cuid17	Des gains garantis avec cette méthode !	2024-11-24 15:28:42.371	2024-11-24 15:28:42.371
post14	cuid17	Merci pour le partage, vraiment utile.	2024-11-24 15:28:42.371	2024-11-24 15:28:42.371
post15	cuid18	C'est ce qu'il me fallait pour progresser.	2024-11-24 15:28:42.371	2024-11-24 15:28:42.371
post16	cuid18	Du contenu de qualité comme toujours 👏	2024-11-24 15:28:42.371	2024-11-24 15:28:42.371
post17	cuid19	Un grand merci pour cette démonstration.	2024-11-24 15:28:42.371	2024-11-24 15:28:42.371
post18	cuid19	Top cet enchaînement, je vais tester.	2024-11-24 15:28:42.371	2024-11-24 15:28:42.371
post19	cuid20	Tu es vraiment une source d'inspiration.	2024-11-24 15:28:42.371	2024-11-24 15:28:42.371
post20	cuid20	Bravo pour cette performance, incroyable !	2024-11-24 15:28:42.371	2024-11-24 15:28:42.371
post3	cuid1	Ce post me motive à fond, merci !	2024-11-24 15:28:42.371	2024-11-24 15:28:42.371
post6	cuid4	Un contenu simple et efficace 👌	2024-11-24 15:28:42.371	2024-11-24 15:28:42.371
post7	cuid5	Gains garantis avec cette méthode.	2024-11-24 15:28:42.371	2024-11-24 15:28:42.371
post8	cuid6	Une approche intéressante pour progresser.	2024-11-24 15:28:42.371	2024-11-24 15:28:42.371
post9	cuid7	Merci pour cette idée, je l'adore.	2024-11-24 15:28:42.371	2024-11-24 15:28:42.371
post10	cuid8	Excellent pour améliorer mes performances.	2024-11-24 15:28:42.371	2024-11-24 15:28:42.371
post11	cuid9	Les résultats parlent d'eux-mêmes !	2024-11-24 15:28:42.371	2024-11-24 15:28:42.371
post12	cuid10	Je vais intégrer ça dans ma routine.	2024-11-24 15:28:42.371	2024-11-24 15:28:42.371
post13	cuid11	Encore une publication au top !	2024-11-24 15:28:42.371	2024-11-24 15:28:42.371
post14	cuid12	Très bien expliqué, merci !	2024-11-24 15:28:42.371	2024-11-24 15:28:42.371
post15	cuid13	Une méthode super efficace à tester.	2024-11-24 15:28:42.371	2024-11-24 15:28:42.371
post16	cuid14	Ton contenu est toujours inspirant.	2024-11-24 15:28:42.371	2024-11-24 15:28:42.371
post17	cuid15	Bravo pour cette vidéo explicative.	2024-11-24 15:28:42.371	2024-11-24 15:28:42.371
post18	cuid16	Exactement ce dont j'avais besoin.	2024-11-24 15:28:42.371	2024-11-24 15:28:42.371
post19	cuid17	Une très bonne méthode pour débuter.	2024-11-24 15:28:42.371	2024-11-24 15:28:42.371
post20	cuid18	Merci pour ces conseils précieux.	2024-11-24 15:28:42.371	2024-11-24 15:28:42.371
post1	cuid19	Je recommande cette approche à tous.	2024-11-24 15:28:42.371	2024-11-24 15:28:42.371
post2	cuid20	Tu es une vraie source d'inspiration.	2024-11-24 15:28:42.371	2024-11-24 15:28:42.371
\.


--
-- TOC entry 5030 (class 0 OID 17350)
-- Dependencies: 226
-- Data for Name: UsersLikes; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."UsersLikes" ("postsId", "usersId", "createdAt") FROM stdin;
post1	cuid1	2024-11-24 15:25:54.402
post2	cuid1	2024-11-24 15:25:54.402
post3	cuid1	2024-11-24 15:25:54.402
post4	cuid2	2024-11-24 15:25:54.402
post5	cuid2	2024-11-24 15:25:54.402
post6	cuid2	2024-11-24 15:25:54.402
post7	cuid3	2024-11-24 15:25:54.402
post8	cuid3	2024-11-24 15:25:54.402
post9	cuid3	2024-11-24 15:25:54.402
post10	cuid4	2024-11-24 15:25:54.402
post11	cuid4	2024-11-24 15:25:54.402
post12	cuid4	2024-11-24 15:25:54.402
post13	cuid5	2024-11-24 15:25:54.402
post14	cuid5	2024-11-24 15:25:54.402
post15	cuid5	2024-11-24 15:25:54.402
post16	cuid6	2024-11-24 15:25:54.402
post17	cuid6	2024-11-24 15:25:54.402
post18	cuid6	2024-11-24 15:25:54.402
post19	cuid7	2024-11-24 15:25:54.402
post20	cuid7	2024-11-24 15:25:54.402
post1	cuid7	2024-11-24 15:25:54.402
post2	cuid8	2024-11-24 15:25:54.402
post3	cuid8	2024-11-24 15:25:54.402
post4	cuid8	2024-11-24 15:25:54.402
post5	cuid9	2024-11-24 15:25:54.402
post6	cuid9	2024-11-24 15:25:54.402
post7	cuid9	2024-11-24 15:25:54.402
post8	cuid10	2024-11-24 15:25:54.402
post9	cuid10	2024-11-24 15:25:54.402
post10	cuid10	2024-11-24 15:25:54.402
post11	cuid11	2024-11-24 15:25:54.402
post12	cuid11	2024-11-24 15:25:54.402
post13	cuid11	2024-11-24 15:25:54.402
post14	cuid12	2024-11-24 15:25:54.402
post15	cuid12	2024-11-24 15:25:54.402
post16	cuid12	2024-11-24 15:25:54.402
post17	cuid13	2024-11-24 15:25:54.402
post18	cuid13	2024-11-24 15:25:54.402
post19	cuid13	2024-11-24 15:25:54.402
post20	cuid14	2024-11-24 15:25:54.402
post1	cuid14	2024-11-24 15:25:54.402
post2	cuid14	2024-11-24 15:25:54.402
post3	cuid15	2024-11-24 15:25:54.402
post4	cuid15	2024-11-24 15:25:54.402
post5	cuid15	2024-11-24 15:25:54.402
post6	cuid16	2024-11-24 15:25:54.402
post7	cuid16	2024-11-24 15:25:54.402
post8	cuid16	2024-11-24 15:25:54.402
post9	cuid17	2024-11-24 15:25:54.402
post10	cuid17	2024-11-24 15:25:54.402
post11	cuid17	2024-11-24 15:25:54.402
post12	cuid18	2024-11-24 15:25:54.402
post13	cuid18	2024-11-24 15:25:54.402
post14	cuid18	2024-11-24 15:25:54.402
post15	cuid19	2024-11-24 15:25:54.402
post16	cuid19	2024-11-24 15:25:54.402
post17	cuid19	2024-11-24 15:25:54.402
post18	cuid20	2024-11-24 15:25:54.402
post19	cuid20	2024-11-24 15:25:54.402
post20	cuid20	2024-11-24 15:25:54.402
\.


--
-- TOC entry 5035 (class 0 OID 17390)
-- Dependencies: 231
-- Data for Name: UsersProgramsFollows; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."UsersProgramsFollows" ("programId", "userId", "createdAt", "updatedAt") FROM stdin;
\.


--
-- TOC entry 5031 (class 0 OID 17358)
-- Dependencies: 227
-- Data for Name: UsersShares; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."UsersShares" ("postsId", "usersId", "createdAt") FROM stdin;
post1	cuid1	2024-11-24 15:26:51.947
post2	cuid1	2024-11-24 15:26:51.947
post3	cuid1	2024-11-24 15:26:51.947
post4	cuid2	2024-11-24 15:26:51.947
post5	cuid2	2024-11-24 15:26:51.947
post6	cuid2	2024-11-24 15:26:51.947
post7	cuid3	2024-11-24 15:26:51.947
post8	cuid3	2024-11-24 15:26:51.947
post9	cuid3	2024-11-24 15:26:51.947
post10	cuid4	2024-11-24 15:26:51.947
post11	cuid4	2024-11-24 15:26:51.947
post12	cuid4	2024-11-24 15:26:51.947
post13	cuid5	2024-11-24 15:26:51.947
post14	cuid5	2024-11-24 15:26:51.947
post15	cuid5	2024-11-24 15:26:51.947
post16	cuid6	2024-11-24 15:26:51.947
post17	cuid6	2024-11-24 15:26:51.947
post18	cuid6	2024-11-24 15:26:51.947
post19	cuid7	2024-11-24 15:26:51.947
post20	cuid7	2024-11-24 15:26:51.947
post1	cuid7	2024-11-24 15:26:51.947
post2	cuid8	2024-11-24 15:26:51.947
post3	cuid8	2024-11-24 15:26:51.947
post4	cuid8	2024-11-24 15:26:51.947
post5	cuid9	2024-11-24 15:26:51.947
post6	cuid9	2024-11-24 15:26:51.947
post7	cuid9	2024-11-24 15:26:51.947
post8	cuid10	2024-11-24 15:26:51.947
post9	cuid10	2024-11-24 15:26:51.947
post10	cuid10	2024-11-24 15:26:51.947
post11	cuid11	2024-11-24 15:26:51.947
post12	cuid11	2024-11-24 15:26:51.947
post13	cuid11	2024-11-24 15:26:51.947
post14	cuid12	2024-11-24 15:26:51.947
post15	cuid12	2024-11-24 15:26:51.947
post16	cuid12	2024-11-24 15:26:51.947
post17	cuid13	2024-11-24 15:26:51.947
post18	cuid13	2024-11-24 15:26:51.947
post19	cuid13	2024-11-24 15:26:51.947
post20	cuid14	2024-11-24 15:26:51.947
post1	cuid14	2024-11-24 15:26:51.947
post2	cuid14	2024-11-24 15:26:51.947
post3	cuid15	2024-11-24 15:26:51.947
post4	cuid15	2024-11-24 15:26:51.947
post5	cuid15	2024-11-24 15:26:51.947
post6	cuid16	2024-11-24 15:26:51.947
post7	cuid16	2024-11-24 15:26:51.947
post8	cuid16	2024-11-24 15:26:51.947
post9	cuid17	2024-11-24 15:26:51.947
post10	cuid17	2024-11-24 15:26:51.947
post11	cuid17	2024-11-24 15:26:51.947
post12	cuid18	2024-11-24 15:26:51.947
post13	cuid18	2024-11-24 15:26:51.947
post14	cuid18	2024-11-24 15:26:51.947
post15	cuid19	2024-11-24 15:26:51.947
post16	cuid19	2024-11-24 15:26:51.947
post17	cuid19	2024-11-24 15:26:51.947
post18	cuid20	2024-11-24 15:26:51.947
post19	cuid20	2024-11-24 15:26:51.947
post20	cuid20	2024-11-24 15:26:51.947
\.


--
-- TOC entry 5026 (class 0 OID 17310)
-- Dependencies: 222
-- Data for Name: Workouts; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Workouts" (id, name, "createdAt", "updatedAt", "programId", "userId") FROM stdin;
workout1	Full Body	2024-11-24 15:33:12.666	2024-11-24 15:33:12.666	program1	cuid1
workout2	Push Day	2024-11-24 15:33:12.666	2024-11-24 15:33:12.666	program2	cuid2
workout3	Pull Day	2024-11-24 15:33:12.666	2024-11-24 15:33:12.666	program3	cuid3
workout4	Leg Day	2024-11-24 15:33:12.666	2024-11-24 15:33:12.666	program4	cuid4
workout5	Upper Body	2024-11-24 15:33:12.666	2024-11-24 15:33:12.666	program5	cuid5
legs	Legs	2024-11-29 18:01:14.095	2024-11-29 18:00:48.532	gauthier	gauthier
1push	Push	2024-11-29 18:00:25.951	2024-11-29 18:01:37.511	gauthier	gauthier
2pull	Pull	2024-11-29 18:01:14.095	2024-11-29 18:01:37.511	gauthier	gauthier
\.


--
-- TOC entry 5034 (class 0 OID 17382)
-- Dependencies: 230
-- Data for Name: WorkoutsExercises; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."WorkoutsExercises" ("workoutId", "exerciceId", "createdAt", "updatedAt") FROM stdin;
2pull	exercise18	2024-11-29 18:03:17.181	2024-11-29 18:02:00.127
2pull	exercise4	2024-11-29 18:03:17.181	2024-11-29 18:02:00.318
1push	exercise8	2024-11-29 18:03:17.181	2024-11-29 18:02:01.054
1push	exercise1	2024-11-29 18:03:17.181	2024-11-29 18:02:01.238
legs	exercise16	2024-11-29 18:03:17.181	2024-11-29 18:02:12.959
legs	exercise2	2024-11-29 18:03:17.181	2024-11-29 18:02:13.191
\.


--
-- TOC entry 5021 (class 0 OID 17092)
-- Dependencies: 217
-- Data for Name: _prisma_migrations; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public._prisma_migrations (id, checksum, finished_at, migration_name, logs, rolled_back_at, started_at, applied_steps_count) FROM stdin;
a9b86ea5-da72-4af8-a993-10665fc607cd	498265f79edf48a3aa69c7cbc588e9dd323eece628891cb6aa5bdc9d8dc0e610	2024-11-24 15:03:01.767503+01	20240926054251_init	\N	\N	2024-11-24 15:03:01.712739+01	1
5791e93d-f88a-4d47-9177-c123f240736c	a60c9b811da60338e01f5f85a0a54492e825200f86e0503981565658420d326e	2024-11-24 15:03:01.856621+01	20241025121041_shema	\N	\N	2024-11-24 15:03:01.768219+01	1
b9fae6fa-4e29-4c21-980f-b4a1994c897d	32171e3d4a200f4c20b69806878f45e81546ca1e81157b5dd5884afdf7e7be02	2024-11-24 15:03:01.867441+01	20241025144501_add	\N	\N	2024-11-24 15:03:01.857207+01	1
68b104d9-3631-481c-b8df-933a53da9543	3c5a16493647fa6dc033777a4b92ac87c110f223598fe0376a307f275a5b27ba	2024-11-24 15:03:01.881164+01	20241025145731_add	\N	\N	2024-11-24 15:03:01.868602+01	1
00b0663b-7b60-4154-a548-29adcfee8433	4aa6f9add8d4081c849ce3f57c0423029f613fa54f6c49e766bcaf9c68ebbb38	2024-11-24 15:03:01.887239+01	20241029192632_add	\N	\N	2024-11-24 15:03:01.881735+01	1
cd158d8a-f8fc-4cde-b872-41aad05f3a3e	46b486f6da28ce0bd9de162104dd7e64f9c6152e13c01a2ef05127dfd750cbc8	2024-11-24 15:03:01.892262+01	20241103180804_optional	\N	\N	2024-11-24 15:03:01.887705+01	1
58007519-1d2f-45d7-8cb3-707021f20da3	aa5754397a2d0743a38d718f155492e909b416f005497d486b93a6bc71b8ce2c	2024-11-24 15:03:01.895774+01	20241117190549_musclegrp	\N	\N	2024-11-24 15:03:01.892955+01	1
86b68e1f-44c2-4268-8a0b-550ac8a9035c	46c1666f3dd34d2b78cb11f39ff98ce8064b0a232b52e78be2d588122031fd21	2024-11-24 15:03:01.898904+01	20241117191226_exercices	\N	\N	2024-11-24 15:03:01.89629+01	1
2656b122-ed8f-414f-9127-4915b7bbdb6b	e534efcf8658392eb334c9b93404b47266269d8da65f5ab979cff7d194437b96	2024-11-24 15:03:01.90356+01	20241118110230_results	\N	\N	2024-11-24 15:03:01.899703+01	1
2d1180c0-e153-41c1-800d-e183849977ce	52411d9c6c95b82b2a8fb83bc420afd987fc9e1f1c037eb22ac4f23e6b9c24ce	2024-11-24 15:03:01.906282+01	20241118111853_delete_sets	\N	\N	2024-11-24 15:03:01.904231+01	1
39aceafb-06db-4b90-b9aa-8fe143c85c48	2d8730f474d7a909a0e1776278055b7d7792cc7f5ecab74a66ccf571353f877a	2024-11-24 15:03:01.912368+01	20241118115837_add	\N	\N	2024-11-24 15:03:01.906988+01	1
3e5bd1b0-ad92-40f9-bef6-c5351ca0b448	41877ad0ae9c11ae5778f37a70e0018b4e8b706182db5e70294a5b5fc2bb6a99	2024-11-24 15:03:01.924433+01	20241120123624_add	\N	\N	2024-11-24 15:03:01.912851+01	1
145e6323-a982-497e-b96b-2d64cc494a6c	85873ba2acfe5a41e5f252aec020f05cac0ffb990433634408a8f2a1496aef9d	2024-11-24 15:03:03.219564+01	20241124140303_loose	\N	\N	2024-11-24 15:03:03.217374+01	1
2fd5e73f-549d-45ea-a3c9-efadb34ff43e	3efcdfc2d6358ffb4d43826a12b99b8a40d1c1e0933523aaf817d347b9cb057d	2024-12-10 14:13:24.138279+01	20241210131324_migration	\N	\N	2024-12-10 14:13:24.122304+01	1
\.


--
-- TOC entry 4811 (class 2606 OID 17301)
-- Name: City City_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."City"
    ADD CONSTRAINT "City_pkey" PRIMARY KEY (id);


--
-- TOC entry 4829 (class 2606 OID 17381)
-- Name: ExerciceMuscleGroups ExerciceMuscleGroups_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."ExerciceMuscleGroups"
    ADD CONSTRAINT "ExerciceMuscleGroups_pkey" PRIMARY KEY ("musculeGroupsId", "exercicesId");


--
-- TOC entry 4819 (class 2606 OID 17333)
-- Name: ExerciceResults ExerciceResults_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."ExerciceResults"
    ADD CONSTRAINT "ExerciceResults_pkey" PRIMARY KEY (id);


--
-- TOC entry 4837 (class 2606 OID 17413)
-- Name: ExercicesResultsPosts ExercicesResultsPosts_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."ExercicesResultsPosts"
    ADD CONSTRAINT "ExercicesResultsPosts_pkey" PRIMARY KEY ("exercicesResultsId", "postsId");


--
-- TOC entry 4817 (class 2606 OID 17325)
-- Name: Exercices Exercices_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Exercices"
    ADD CONSTRAINT "Exercices_pkey" PRIMARY KEY (id);


--
-- TOC entry 4839 (class 2606 OID 17550)
-- Name: Follows Follows_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Follows"
    ADD CONSTRAINT "Follows_pkey" PRIMARY KEY ("followingId", "followedById");


--
-- TOC entry 4821 (class 2606 OID 17341)
-- Name: MuscleGroups MuscleGroups_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."MuscleGroups"
    ADD CONSTRAINT "MuscleGroups_pkey" PRIMARY KEY (id);


--
-- TOC entry 4841 (class 2606 OID 17569)
-- Name: Notifications Notifications_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Notifications"
    ADD CONSTRAINT "Notifications_pkey" PRIMARY KEY (id);


--
-- TOC entry 4809 (class 2606 OID 17293)
-- Name: Posts Posts_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Posts"
    ADD CONSTRAINT "Posts_pkey" PRIMARY KEY (id);


--
-- TOC entry 4813 (class 2606 OID 17309)
-- Name: Programs Programs_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Programs"
    ADD CONSTRAINT "Programs_pkey" PRIMARY KEY (id);


--
-- TOC entry 4835 (class 2606 OID 17405)
-- Name: Role Role_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Role"
    ADD CONSTRAINT "Role_pkey" PRIMARY KEY (id);


--
-- TOC entry 4843 (class 2606 OID 17597)
-- Name: Sets Sets_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Sets"
    ADD CONSTRAINT "Sets_pkey" PRIMARY KEY (id);


--
-- TOC entry 4847 (class 2606 OID 17618)
-- Name: TagsPosts TagsPosts_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."TagsPosts"
    ADD CONSTRAINT "TagsPosts_pkey" PRIMARY KEY ("postId", "tagId");


--
-- TOC entry 4845 (class 2606 OID 17610)
-- Name: Tags Tags_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Tags"
    ADD CONSTRAINT "Tags_pkey" PRIMARY KEY (id);


--
-- TOC entry 4806 (class 2606 OID 17285)
-- Name: User User_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."User"
    ADD CONSTRAINT "User_pkey" PRIMARY KEY (id);


--
-- TOC entry 4827 (class 2606 OID 17373)
-- Name: UsersComments UsersComments_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."UsersComments"
    ADD CONSTRAINT "UsersComments_pkey" PRIMARY KEY ("postsId", "usersId");


--
-- TOC entry 4823 (class 2606 OID 17357)
-- Name: UsersLikes UsersLikes_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."UsersLikes"
    ADD CONSTRAINT "UsersLikes_pkey" PRIMARY KEY ("postsId", "usersId");


--
-- TOC entry 4833 (class 2606 OID 17397)
-- Name: UsersProgramsFollows UsersProgramsFollows_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."UsersProgramsFollows"
    ADD CONSTRAINT "UsersProgramsFollows_pkey" PRIMARY KEY ("programId", "userId");


--
-- TOC entry 4825 (class 2606 OID 17365)
-- Name: UsersShares UsersShares_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."UsersShares"
    ADD CONSTRAINT "UsersShares_pkey" PRIMARY KEY ("postsId", "usersId");


--
-- TOC entry 4831 (class 2606 OID 17389)
-- Name: WorkoutsExercises WorkoutsExercises_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."WorkoutsExercises"
    ADD CONSTRAINT "WorkoutsExercises_pkey" PRIMARY KEY ("exerciceId", "workoutId");


--
-- TOC entry 4815 (class 2606 OID 17317)
-- Name: Workouts Workouts_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Workouts"
    ADD CONSTRAINT "Workouts_pkey" PRIMARY KEY (id);


--
-- TOC entry 4803 (class 2606 OID 17100)
-- Name: _prisma_migrations _prisma_migrations_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public._prisma_migrations
    ADD CONSTRAINT _prisma_migrations_pkey PRIMARY KEY (id);


--
-- TOC entry 4804 (class 1259 OID 17415)
-- Name: User_email_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX "User_email_key" ON public."User" USING btree (email);


--
-- TOC entry 4807 (class 1259 OID 17414)
-- Name: User_pseudo_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX "User_pseudo_key" ON public."User" USING btree (pseudo);


--
-- TOC entry 4862 (class 2606 OID 17487)
-- Name: ExerciceMuscleGroups ExerciceMuscleGroups_exercicesId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."ExerciceMuscleGroups"
    ADD CONSTRAINT "ExerciceMuscleGroups_exercicesId_fkey" FOREIGN KEY ("exercicesId") REFERENCES public."Exercices"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- TOC entry 4863 (class 2606 OID 17492)
-- Name: ExerciceMuscleGroups ExerciceMuscleGroups_musculeGroupsId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."ExerciceMuscleGroups"
    ADD CONSTRAINT "ExerciceMuscleGroups_musculeGroupsId_fkey" FOREIGN KEY ("musculeGroupsId") REFERENCES public."MuscleGroups"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- TOC entry 4854 (class 2606 OID 17452)
-- Name: ExerciceResults ExerciceResults_exerciceId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."ExerciceResults"
    ADD CONSTRAINT "ExerciceResults_exerciceId_fkey" FOREIGN KEY ("exerciceId") REFERENCES public."Exercices"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- TOC entry 4855 (class 2606 OID 17585)
-- Name: ExerciceResults ExerciceResults_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."ExerciceResults"
    ADD CONSTRAINT "ExerciceResults_userId_fkey" FOREIGN KEY ("userId") REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- TOC entry 4868 (class 2606 OID 17522)
-- Name: ExercicesResultsPosts ExercicesResultsPosts_exercicesResultsId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."ExercicesResultsPosts"
    ADD CONSTRAINT "ExercicesResultsPosts_exercicesResultsId_fkey" FOREIGN KEY ("exercicesResultsId") REFERENCES public."ExerciceResults"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- TOC entry 4869 (class 2606 OID 17517)
-- Name: ExercicesResultsPosts ExercicesResultsPosts_postsId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."ExercicesResultsPosts"
    ADD CONSTRAINT "ExercicesResultsPosts_postsId_fkey" FOREIGN KEY ("postsId") REFERENCES public."Posts"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- TOC entry 4870 (class 2606 OID 17551)
-- Name: Follows Follows_followedById_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Follows"
    ADD CONSTRAINT "Follows_followedById_fkey" FOREIGN KEY ("followedById") REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- TOC entry 4871 (class 2606 OID 17556)
-- Name: Follows Follows_followingId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Follows"
    ADD CONSTRAINT "Follows_followingId_fkey" FOREIGN KEY ("followingId") REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- TOC entry 4872 (class 2606 OID 17570)
-- Name: Notifications Notifications_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Notifications"
    ADD CONSTRAINT "Notifications_userId_fkey" FOREIGN KEY ("userId") REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- TOC entry 4850 (class 2606 OID 17619)
-- Name: Posts Posts_authorId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Posts"
    ADD CONSTRAINT "Posts_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 4851 (class 2606 OID 17437)
-- Name: Programs Programs_authorId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Programs"
    ADD CONSTRAINT "Programs_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- TOC entry 4873 (class 2606 OID 17598)
-- Name: Sets Sets_exerciceResultId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Sets"
    ADD CONSTRAINT "Sets_exerciceResultId_fkey" FOREIGN KEY ("exerciceResultId") REFERENCES public."ExerciceResults"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- TOC entry 4874 (class 2606 OID 17624)
-- Name: TagsPosts TagsPosts_postId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."TagsPosts"
    ADD CONSTRAINT "TagsPosts_postId_fkey" FOREIGN KEY ("postId") REFERENCES public."Posts"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 4875 (class 2606 OID 17629)
-- Name: TagsPosts TagsPosts_tagId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."TagsPosts"
    ADD CONSTRAINT "TagsPosts_tagId_fkey" FOREIGN KEY ("tagId") REFERENCES public."Tags"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 4848 (class 2606 OID 17580)
-- Name: User User_cityId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."User"
    ADD CONSTRAINT "User_cityId_fkey" FOREIGN KEY ("cityId") REFERENCES public."City"(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- TOC entry 4849 (class 2606 OID 17575)
-- Name: User User_roleId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."User"
    ADD CONSTRAINT "User_roleId_fkey" FOREIGN KEY ("roleId") REFERENCES public."Role"(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- TOC entry 4860 (class 2606 OID 17477)
-- Name: UsersComments UsersComments_postsId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."UsersComments"
    ADD CONSTRAINT "UsersComments_postsId_fkey" FOREIGN KEY ("postsId") REFERENCES public."Posts"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- TOC entry 4861 (class 2606 OID 17482)
-- Name: UsersComments UsersComments_usersId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."UsersComments"
    ADD CONSTRAINT "UsersComments_usersId_fkey" FOREIGN KEY ("usersId") REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- TOC entry 4856 (class 2606 OID 17457)
-- Name: UsersLikes UsersLikes_postsId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."UsersLikes"
    ADD CONSTRAINT "UsersLikes_postsId_fkey" FOREIGN KEY ("postsId") REFERENCES public."Posts"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- TOC entry 4857 (class 2606 OID 17462)
-- Name: UsersLikes UsersLikes_usersId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."UsersLikes"
    ADD CONSTRAINT "UsersLikes_usersId_fkey" FOREIGN KEY ("usersId") REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- TOC entry 4866 (class 2606 OID 17507)
-- Name: UsersProgramsFollows UsersProgramsFollows_programId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."UsersProgramsFollows"
    ADD CONSTRAINT "UsersProgramsFollows_programId_fkey" FOREIGN KEY ("programId") REFERENCES public."Programs"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- TOC entry 4867 (class 2606 OID 17512)
-- Name: UsersProgramsFollows UsersProgramsFollows_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."UsersProgramsFollows"
    ADD CONSTRAINT "UsersProgramsFollows_userId_fkey" FOREIGN KEY ("userId") REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- TOC entry 4858 (class 2606 OID 17467)
-- Name: UsersShares UsersShares_postsId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."UsersShares"
    ADD CONSTRAINT "UsersShares_postsId_fkey" FOREIGN KEY ("postsId") REFERENCES public."Posts"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- TOC entry 4859 (class 2606 OID 17472)
-- Name: UsersShares UsersShares_usersId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."UsersShares"
    ADD CONSTRAINT "UsersShares_usersId_fkey" FOREIGN KEY ("usersId") REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- TOC entry 4864 (class 2606 OID 17502)
-- Name: WorkoutsExercises WorkoutsExercises_exerciceId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."WorkoutsExercises"
    ADD CONSTRAINT "WorkoutsExercises_exerciceId_fkey" FOREIGN KEY ("exerciceId") REFERENCES public."Exercices"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- TOC entry 4865 (class 2606 OID 17497)
-- Name: WorkoutsExercises WorkoutsExercises_workoutId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."WorkoutsExercises"
    ADD CONSTRAINT "WorkoutsExercises_workoutId_fkey" FOREIGN KEY ("workoutId") REFERENCES public."Workouts"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- TOC entry 4852 (class 2606 OID 17447)
-- Name: Workouts Workouts_programId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Workouts"
    ADD CONSTRAINT "Workouts_programId_fkey" FOREIGN KEY ("programId") REFERENCES public."Programs"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- TOC entry 4853 (class 2606 OID 17442)
-- Name: Workouts Workouts_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Workouts"
    ADD CONSTRAINT "Workouts_userId_fkey" FOREIGN KEY ("userId") REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


-- Completed on 2024-12-10 17:10:23

--
-- PostgreSQL database dump complete
--

