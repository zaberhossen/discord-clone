import SignIn from "@/components/auth/SignIn";

interface searchParams {
  redirectUrl?: string;
}

export default function Page({
  searchParams
}: {
  searchParams: searchParams;
}) {
  return <SignIn searchParams={searchParams} />;
}
