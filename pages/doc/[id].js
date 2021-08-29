import TextEditor from "../../components/TextEditor";
import Icon from "@material-tailwind/react/Icon";
import Button from "@material-tailwind/react/Button";
import { useRouter } from "next/dist/client/router";
import { db } from "../../api/firebase";
import { useCollectionOnce } from "react-firebase-hooks/firestore";
import { useSession, getSession, signOut } from "next-auth/client";
import Login from "../../components/Login";
import DocHeader from "../../components/DocHeader";

function Doc() {
  const session = useSession();
  if (!session) return <Login />;
  return (
    <div>
      <DocHeader />
      <TextEditor />
    </div>
  );
}

export default Doc;

export async function getServerSideProps(context) {
  const session = await getSession(context);
  return { props: { session } };
}
