import Icon from "@material-tailwind/react/Icon";
import DocumentRow from "./DocumentRow";
import { db } from "../api/firebase";
import { useCollectionOnce } from "react-firebase-hooks/firestore";
import { useSession } from "next-auth/client";
function UserDocument() {
  const [session] = useSession();
  const [snapshot] = useCollectionOnce(
    db
      .collection("usersDocs")
      .doc(session.user.email)
      .collection("docs")
      .orderBy("timestamp", "desc")
  );

  return (
    <section className="bg-white px-10 md:px-0">
      <div className="max-w-3xl mx-auto py-8 flex items-center justify-between pb-5 text-sm text-gray-700">
        <h2 className="font-md flex-grow">My Documents</h2>
        <p className="mr-12"> Date Created</p>
        <Icon name="folder" size="3xl" color={"gray"} />
      </div>
      {snapshot?.docs?.map((doc) => {
        // console.log(doc);
        return (
          <DocumentRow
            key={doc.id}
            fileName={doc.data().fileName}
            id={doc.id}
            date={doc.data().timestamp}
          />
        );
      })}
    </section>
  );
}

export default UserDocument;
