import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { EditorState } from "draft-js";
import { db } from "../api/firebase";
import { useRouter } from "next/dist/client/router";
import { useSession } from "next-auth/client";
import { convertFromRaw, convertToRaw } from "draft-js";
import { useDocumentOnce } from "react-firebase-hooks/firestore";
const Editor = dynamic(
  () => import("react-draft-wysiwyg").then((module) => module.Editor),
  { ssr: false }
);
function TextEditor() {
  const router = useRouter();
  const { id } = router.query;
  const [session] = useSession();
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const onEditorStateChange = (editorState) => {
    setEditorState(editorState);
    db.collection("usersDocs")
      .doc(session?.user.email)
      .collection("docs")
      .doc(id)
      .set(
        {
          editorState: convertToRaw(editorState.getCurrentContent()),
        },
        { merge: true }
      );
  };
  const [snapshot] = useDocumentOnce(
    db
      .collection("usersDocs")
      .doc(session?.user?.email)
      .collection("docs")
      .doc(id)
  );
  useEffect(() => {
    if (snapshot?.data()?.editorState) {
      setEditorState(
        EditorState.createWithContent(
          convertFromRaw(snapshot?.data()?.editorState)
        )
      );
    }
  }, [snapshot]);
  return (
    <div className="bg-[#f8f9fa] min-h-screen pb-16">
      <Editor
        editorState={editorState}
        onEditorStateChange={onEditorStateChange}
        toolbarClassName="flex sticky top-0 z-50 !justify-center mx-auto"
        editorClassName="mt-6 bg-white shadow-lg min-h-screen max-w-4xl mx-auto mb-12 border p-12"
      />
    </div>
  );
}

export default TextEditor;
