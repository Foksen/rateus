CREATE TABLE IF NOT EXISTS public.organization_types
(
    id SERIAL PRIMARY KEY,
    is_available boolean NOT NULL,
    name VARCHAR(255) NOT NULL UNIQUE
);

CREATE SEQUENCE IF NOT EXISTS organization_type_seq;

CREATE TABLE IF NOT EXISTS public.organizations
(
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    description VARCHAR(4096) NOT NULL,
    name VARCHAR(512) NOT NULL,
    once_moderated BOOLEAN NOT NULL,
    photo_url VARCHAR(1024),
    website_url VARCHAR(1024),
    organization_type_id INTEGER NOT NULL REFERENCES public.organization_types(id) ON UPDATE CASCADE ON DELETE CASCADE,
    owner_id UUID NOT NULL REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE CASCADE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS public.reviews
(
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    comment VARCHAR(2048) NOT NULL,
    once_moderated BOOLEAN NOT NULL,
    rating INTEGER NOT NULL CHECK (rating <= 5 AND rating >= 1),
    author_id UUID NOT NULL REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE CASCADE,
    organization_id UUID NOT NULL REFERENCES public.organizations(id) ON UPDATE CASCADE ON DELETE CASCADE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_organizations_owner_id ON public.organizations(owner_id);
CREATE INDEX IF NOT EXISTS idx_organizations_type_id ON public.organizations(organization_type_id);
CREATE INDEX IF NOT EXISTS idx_reviews_author_id ON public.reviews(author_id);
CREATE INDEX IF NOT EXISTS idx_reviews_organization_id ON public.reviews(organization_id);