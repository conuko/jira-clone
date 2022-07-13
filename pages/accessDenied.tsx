import { signIn } from "next-auth/react";
import Link from "next/link";

const AccessDenied = () => {
  return (
    <div>
      <h1>Access Denied</h1>
      <p>
        <Link
          href="/api/auth/signin"
          onClick={(e) => {
            e.preventDefault();
            signIn();
          }}
        >
          You must be signed in to view this page
        </Link>
      </p>
    </div>
  );
};

export default AccessDenied;
