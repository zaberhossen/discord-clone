import { COOKIES_KEY } from "@/utils";
import serverCookie from "@/utils/serverCookie";

export function userData() {
  const userInfo =
    serverCookie().getItem(COOKIES_KEY.USER_DATA)?.value || "{}";
  return JSON.parse(userInfo);
}
