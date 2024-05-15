import { COOKIES_KEY } from "@/utils";
import serverCookie from "@/utils/serverCookie";

export function userData() {
  const userInfo =
    serverCookie().getItem(COOKIES_KEY.USER_DATA)?.value || "{}";
  return JSON.parse(userInfo);
}

export interface IUser {
  first_name: string;
  last_name: string;
  username: string;
  email: string;
  is_active: boolean;
  client_id: string;
  phone: string;
  got_new_feature_alert: boolean;
  show_contact_us_client_portal: boolean;
  services: unknown;
  current_service: string;
  current_service_id: number;
}
