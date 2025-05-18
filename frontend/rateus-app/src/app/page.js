import { OrganizationsContainer } from "@/components/organizations/organizations-container";
import { getServerSession } from "next-auth";
import { Fragment } from "react";
import { authOptions } from "./api/auth/nextauth/[...nextauth]/route";
import { Header } from "@/components/common/header/header";

export default async function OrganizationsPage() {
  const session = await getServerSession(authOptions);

  return (
    <Fragment>
      <Header session={session} />
      <main>
        <OrganizationsContainer />
      </main>
    </Fragment>
  );
}
