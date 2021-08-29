import Head from "next/head";
import Header from "../components/Header";
import Login from "../components/Login";
import { useSession, getSession } from "next-auth/client";
import AddDocument from "../components/AddDocument";
import UserDocument from "../components/UserDocument";
export default function Home() {
  const [session] = useSession();
  if (!session) return <Login />;
  return (
    <div>
      <Head>
        <title>Google Docs Clone</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <AddDocument />
      <UserDocument />
    
    </div>
  );
}

export async function getServerSideProps(context) {
  const session = await getSession(context);
  return { props: { session } };
}
