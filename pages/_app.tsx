import { AppProps } from "next/app";
import { useEffect, useState } from "react";
import Link from "next/link";
import { Auth, Hub } from "aws-amplify";
import "tailwindcss/tailwind.css";
import "../configureAmplify";
import "../styles/global.css";

function MyApp({ Component, pageProps }: AppProps) {
  const [signedInUser, setSignedInUser] = useState(false);

  useEffect(() => {
    authListener();
  }, []);

  async function authListener() {
    Hub.listen("auth", (data) => {
      if (data.payload.event === "signIn") {
        return setSignedInUser(true);
      }

      if (data.payload.event === "signOut") {
        return setSignedInUser(false);
      }
    });

    try {
      await Auth.currentAuthenticatedUser();
      setSignedInUser(true);
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <div>
      <nav className="p-6 border-b border-gray-300">
        <Link href="/">
          <span className="mr-6 cursor-pointer">Home</span>
        </Link>
        <Link href="/create-post">
          <span className="mr-6 cursor-pointer">Create Post</span>
        </Link>
        <Link href="/profile">
          <span className="mr-6 cursor-pointer">Profile</span>
        </Link>
        {signedInUser && (
          <Link href="/my-posts">
            <span className="mr-5 cursor-pointer">My Posts</span>
          </Link>
        )}
      </nav>

      <div className="py-8 px-16">
        <Component {...pageProps} />
      </div>
    </div>
  );
}

export default MyApp;
