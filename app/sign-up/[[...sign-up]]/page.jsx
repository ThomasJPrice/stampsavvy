import { SignUp } from "@clerk/nextjs";

export default function Page({ searchParams }) {
  console.log(searchParams);

  return <SignUp forceRedirectUrl={searchParams.forceRedirectUrl} />;
}