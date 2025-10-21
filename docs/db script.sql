--
-- PostgreSQL database dump
--

\restrict t84Q5PP0l3q4OCXqWzen3MOCUypwM5LQIm7bOrgUMYsEeEOn1fnTZle1ZdSTtgw

-- Dumped from database version 17.6
-- Dumped by pg_dump version 17.6

-- Started on 2025-10-21 19:24:11

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

--
-- TOC entry 4909 (class 1262 OID 5)
-- Name: postgres; Type: DATABASE; Schema: -; Owner: postgres
--

CREATE DATABASE postgres WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'English_United States.1252';


ALTER DATABASE postgres OWNER TO postgres;

\unrestrict t84Q5PP0l3q4OCXqWzen3MOCUypwM5LQIm7bOrgUMYsEeEOn1fnTZle1ZdSTtgw
\connect postgres
\restrict t84Q5PP0l3q4OCXqWzen3MOCUypwM5LQIm7bOrgUMYsEeEOn1fnTZle1ZdSTtgw

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

--
-- TOC entry 4910 (class 0 OID 0)
-- Dependencies: 4909
-- Name: DATABASE postgres; Type: COMMENT; Schema: -; Owner: postgres
--

COMMENT ON DATABASE postgres IS 'default administrative connection database';


SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 218 (class 1259 OID 16396)
-- Name: raffles; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.raffles (
    id uuid NOT NULL,
    title character varying NOT NULL,
    description text NOT NULL,
    status smallint NOT NULL,
    minbuy smallint NOT NULL,
    ticketslimit integer NOT NULL,
    ticketprice smallint NOT NULL,
    flyer character varying NOT NULL
);


ALTER TABLE public.raffles OWNER TO postgres;

--
-- TOC entry 219 (class 1259 OID 16403)
-- Name: tickets; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.tickets (
    id uuid NOT NULL,
    name character varying NOT NULL,
    identification integer NOT NULL,
    phone character varying NOT NULL,
    email character varying NOT NULL,
    numbers integer[] NOT NULL,
    receipt character varying NOT NULL,
    status smallint NOT NULL,
    dolarprice integer NOT NULL,
    reference character varying NOT NULL,
    raffleid uuid NOT NULL
);


ALTER TABLE public.tickets OWNER TO postgres;

--
-- TOC entry 217 (class 1259 OID 16389)
-- Name: users; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.users (
    email character varying NOT NULL,
    password character varying NOT NULL
);


ALTER TABLE public.users OWNER TO postgres;

--
-- TOC entry 4902 (class 0 OID 16396)
-- Dependencies: 218
-- Data for Name: raffles; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- TOC entry 4903 (class 0 OID 16403)
-- Dependencies: 219
-- Data for Name: tickets; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- TOC entry 4901 (class 0 OID 16389)
-- Dependencies: 217
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.users VALUES ('jesus@correo.com', '1BC6F6EE8687C45F444A4B6FB9AB7BB58772815DABCF43CED031C883CF9D3417');


--
-- TOC entry 4752 (class 2606 OID 16402)
-- Name: raffles raffles_pk; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.raffles
    ADD CONSTRAINT raffles_pk PRIMARY KEY (id);


--
-- TOC entry 4754 (class 2606 OID 16409)
-- Name: tickets tickets_pk; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tickets
    ADD CONSTRAINT tickets_pk PRIMARY KEY (id);


--
-- TOC entry 4750 (class 2606 OID 16395)
-- Name: users users_unique; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_unique UNIQUE (email);


--
-- TOC entry 4755 (class 2606 OID 16410)
-- Name: tickets tickets_raffles_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tickets
    ADD CONSTRAINT tickets_raffles_fk FOREIGN KEY (raffleid) REFERENCES public.raffles(id);


-- Completed on 2025-10-21 19:24:12

--
-- PostgreSQL database dump complete
--

\unrestrict t84Q5PP0l3q4OCXqWzen3MOCUypwM5LQIm7bOrgUMYsEeEOn1fnTZle1ZdSTtgw

