import { cookies } from "next/headers";
import { COOKIES_KEY, JSONparse } from ".";

export default function serverCookie() {
  const cookieStore = cookies();
  return {
    getItem: cookieStore.get,
    setItem: cookieStore.set,
    removeItem: cookieStore.delete,
    getAll: cookieStore.getAll,
    delete: cookieStore.delete
    // accessToken: cookieStore.get(COOKIES_KEY.ACCESS_TOKEN)?.value
    //   ? JSONparse(cookieStore.get(COOKIES_KEY.ACCESS_TOKEN).value)
    //   : null,
    // expiresAt: cookieStore.get(COOKIES_KEY.REFRESH_EXPIRED) &&  cookieStore.get(COOKIES_KEY.REFRESH_EXPIRED)?.value &&
    //   ? JSONparse(cookieStore.get(COOKIES_KEY.REFRESH_EXPIRED).value)
    //   : null
  };
}
