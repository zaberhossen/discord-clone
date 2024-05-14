import { getAuth } from "@clerk/nextjs/server";
import { NextApiRequest } from "next";

import { db } from "@/lib/db";
// import { userData } from "./user-data";
// import serverCookie from "@/utils/serverCookie";
// import { COOKIES_KEY } from "@/utils";

export const currentProfilePages = async (req: NextApiRequest) => {
  // const userInfo =
  //   serverCookie().getItem(COOKIES_KEY.USER_DATA)?.value || "{}";
  // const user = JSON.parse(userInfo);
  const user = JSON.parse(req?.cookies?.user || "");

  const userId = user?.email;

  if (!userId) return null;

  const profile = await db.profile.findUnique({
    where: { userId }
  });

  return profile;
};
