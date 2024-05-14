import React from "react";
import { redirect } from "next/navigation";

import { initialProfile } from "@/lib/initial-profile";
import { db } from "@/lib/db";
import { InitialModal } from "@/components/modals/initial-modal";

interface searchParams {
  redirectUrl?: string;
}

export default async function SetupPage({
  searchParams
}: {
  searchParams: searchParams;
}) {
  const redirectUrl = searchParams?.redirectUrl?.replace(
    /^.*\/\/[^\/]+/,
    ""
  );

  const profile = await initialProfile();

  const server = await db.server.findFirst({
    where: {
      members: {
        some: {
          profileId: profile.id
        }
      }
    }
  });

  if (redirectUrl) return redirect(`${redirectUrl}`);

  if (server) return redirect(`/servers/${server.id}`);

  return <InitialModal />;
}
