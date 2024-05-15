import { redirect } from "next/navigation";

import { db } from "@/lib/db";
import { userData } from "./user-data";

export const initialProfile = async () => {
  const user = userData();

  if (!user?.email) return redirect("/sign-in");

  const profile = await db.profile.findUnique({
    where: {
      userId: user.email
    }
  });

  if (profile) return profile;

  const name = user.first_name
    ? `${user.first_name}${user.last_name ? " " + user.last_name : ""}`
    : user.username;

  const newProfile = await db.profile.create({
    data: {
      userId: user.email,
      name,
      imageUrl: "", //user.imageUrl,
      email: user.email
    }
  });

  return newProfile;
};
