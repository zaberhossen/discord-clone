import { db } from "@/lib/db";
import { userData } from "./user-data";

export const currentProfile = async () => {
  const user = userData();

  const userId = user.email;

  if (!userId) return null;
  const profile = await db.profile.findUnique({
    where: { userId }
  });

  return profile;
};
