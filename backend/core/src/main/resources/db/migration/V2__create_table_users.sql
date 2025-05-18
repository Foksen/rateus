CREATE EXTENSION IF NOT EXISTS "pgcrypto";

DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'userprovider') THEN
        CREATE TYPE userprovider AS ENUM ('EMAIL', 'YANDEX');
    END IF;
    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'userrole') THEN
        CREATE TYPE userrole AS ENUM ('USER', 'OWNER', 'MODERATOR', 'ADMIN');
    END IF;
END$$;

CREATE TABLE IF NOT EXISTS public.users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    user_provider userprovider NOT NULL,
    user_role userrole NOT NULL,
    is_blocked BOOLEAN NOT NULL DEFAULT false,
    name VARCHAR(255) NOT NULL,
    surname VARCHAR(255) NOT NULL,
    avatar_url VARCHAR(1024),
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);