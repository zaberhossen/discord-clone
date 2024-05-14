import { currentUser, redirectToSignIn } from "@clerk/nextjs";
import { redirect } from "next/navigation";

import { db } from "@/lib/db";
import { COOKIES_KEY } from "@/utils";
import serverCookie from "@/utils/serverCookie";
import { userData } from "./user-data";

export const initialProfile = async () => {
  // const user = await currentUser();

  const user = userData();
  console.log(user?.first_name, user.email, "user--->");
  if (!user) return redirect("/sign-in");

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

  console.log(newProfile, "newProfile--->");

  return newProfile;
};
