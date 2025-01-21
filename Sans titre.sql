--
-- PostgreSQL database cluster dump
--

-- Started on 2025-01-21 16:14:40 CET

SET default_transaction_read_only = off;

SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;

--
-- Roles
--

CREATE ROLE postgres;
ALTER ROLE postgres WITH SUPERUSER INHERIT CREATEROLE CREATEDB LOGIN REPLICATION BYPASSRLS PASSWORD 'SCRAM-SHA-256$4096:vTNf6+lpYOEZGTPTaLX0oQ==$gv7Aq7qegyoLvmZJ43VQrkeOtExzQtbR7uKtg6AD9A8=:C+uMekh6ELDHie9CjYD7VtEWf0e/IXphmMt0DpCg0zs=';

--
-- User Configurations
--








-- Completed on 2025-01-21 16:14:40 CET

--
-- PostgreSQL database cluster dump complete
--

