import Icon from "@material-tailwind/react/Icon";
import Button from "@material-tailwind/react/Button";
import { useRouter } from "next/dist/client/router";
import { db } from "../api/firebase";
import { useCollectionOnce } from "react-firebase-hooks/firestore";
import { useSession, signOut } from "next-auth/client";

function DocHeader() {
  const router = useRouter();
  const { id } = router.query;
  const [session] = useSession();
  const [snapshot, loadingSnapshot] = useCollectionOnce(
    db
      .collection("usersDocs")
      .doc(session?.user?.email)
      .collection("docs")
      .doc(id)
  );
  if (!loadingSnapshot && !snapshot?.data()?.fileName) {
    router.replace("/");
  }

  return (
    <header className="flex justify-between items-center p-3 pb-1">
      <span onClick={() => router.push("/")} className="cursor-pointer">
        <Icon name="description" size="5xl" color="blue" />
      </span>
      <div className="flex-grow px-2">
        <h2 className=""> {snapshot?.data()?.fileName}</h2>
        <div className="flex items-center text-sm space-x-1 -ml-1 h-8 text-gray-600">
          <p className="option">File</p>
          <p className="option">Edit</p>
          <p className="option">View</p>
          <p className="option">Insert</p>
          <p className="option">Format</p>
          <p className="option">Tools</p>
        </div>
      </div>
      <Button
        color="lightBlue"
        buttonType="filled"
        size="regular"
        className="hidden md:inline-flex h-10"
        rounded={false}
        block={false}
        iconOnly={false}
        ripple="light"
      >
        <Icon name="people" size="md" />
        SHARE
      </Button>
      <img
        className="cursor-pointer rounded-full h-12 w-12 ml-3"
        src={session?.user?.image}
        alt=""
      />
    </header>
  );
}

export default DocHeader;
