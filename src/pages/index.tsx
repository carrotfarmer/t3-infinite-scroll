import { signIn, signOut, useSession } from "next-auth/react";
import Head from "next/head";
import Link from "next/link";
import { CreatePost } from "~/components/post/CreatePost";
import { Button } from "~/components/ui/button";
import { api } from "~/utils/api";

export default function Home() {
  const { data: sessionData } = useSession();

  return (
    <>
      <Head>
        <title>infinite scroll example</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <div className="flex justify-center pt-5">
          {sessionData ? (
            <div>
              <Button onClick={() => void signOut()} variant="outline">
                sign out
              </Button>
            </div>
          ) : (
            <Button onClick={() => void signIn()} variant="outline">
              sign in
            </Button>
          )}
        </div>

        {sessionData && (
          <>
          <p className="flex justify-center leading-7 [&:not(:first-child)]:mt-6">
            Signed in User: <span className="pl-1 font-bold">{sessionData?.user.name}</span>
          </p>

          <div className="flex justify-center pt-5 w-full">
          <CreatePost />
          </div>
          </>
        )}
      </main>
    </>
  );
}
