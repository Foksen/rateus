import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { Header } from "@/components/common/header/header";
import { OrganizationSlugContainer } from "@/components/organizations/slug/organization-slug-container";
import { getServerSession } from "next-auth";
import { Fragment } from "react";

export default async function OrganizationsSlugPage({ params }) {
  const session = await getServerSession(authOptions);
  const { slug } = await params;

  return (
    <Fragment>
      <Header session={session} />
      <main>
        <OrganizationSlugContainer session={session} organizationId={slug} />
      </main>
    </Fragment>
  );
}
