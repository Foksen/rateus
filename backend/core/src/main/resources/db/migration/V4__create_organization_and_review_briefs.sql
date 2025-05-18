DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'briefstatus') THEN
        CREATE TYPE briefstatus AS ENUM ('NEW', 'APPROVED', 'REJECTED');
    END IF;
END$$;

CREATE TABLE IF NOT EXISTS public.organization_briefs
(
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    is_new BOOLEAN NOT NULL,
    organization_type_id INTEGER NOT NULL REFERENCES public.organization_types(id) ON UPDATE CASCADE ON DELETE CASCADE,
    organization_id UUID NOT NULL REFERENCES public.organizations(id) ON UPDATE CASCADE ON DELETE CASCADE,
    owner_id UUID NOT NULL REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE CASCADE,
    description VARCHAR(4096) NOT NULL,
    name VARCHAR(512) NOT NULL,
    photo_url VARCHAR(1024),
    website_url VARCHAR(1024),
    status briefstatus NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS public.review_briefs
(
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    is_new BOOLEAN NOT NULL,
    rating INTEGER NOT NULL CHECK (rating <= 5 AND rating >= 1),
    author_id UUID NOT NULL REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE CASCADE,
    organization_id UUID NOT NULL REFERENCES public.organizations(id) ON UPDATE CASCADE ON DELETE CASCADE,
    review_id UUID NOT NULL REFERENCES public.reviews(id) ON UPDATE CASCADE ON DELETE CASCADE,
    status briefstatus NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_organization_briefs_owner_id ON public.organization_briefs(owner_id);
CREATE INDEX idx_review_briefs_author_id ON public.review_briefs(author_id);