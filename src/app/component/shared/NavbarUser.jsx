import { useSession } from "next-auth/react";

const NavbarUser = () => {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return null; // or a loader
  }

  if (!session) {
    return null; // or guest navbar
  }
  console.log(status)
  console.log(session.user.type);
  console.log(session.user.email);
  console.log(session.user.name);

  return <div>NavbarUser</div>;
};

export default NavbarUser;
