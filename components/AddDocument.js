import Modal from "@material-tailwind/react/Modal";
import ModalBody from "@material-tailwind/react/ModalBody";
import ModalFooter from "@material-tailwind/react/ModalFooter";
import Button from "@material-tailwind/react/Button";
import Icon from "@material-tailwind/react/Icon";
import Image from "next/image";
import { useState } from "react";
import { useSession } from "next-auth/client";
import { db } from "../api/firebase";
import firebase from "firebase";

function AddDocument() {
  const [session] = useSession();

  const [modalOpen, setModalOpen] = useState(false);
  const [input, setInput] = useState();

  const modal = (
    <Modal size="sm" active={modalOpen} toggler={() => setModalOpen(false)}>
      <ModalBody className="">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          type="text"
          className="outline-none w-full"
          placeholder="Enter the document name..."
          onKeyDown={(e) => e.key === "Enter" && createDocument()}
        />
      </ModalBody>
      <ModalFooter>
        <Button
          color="blue"
          buttonType="link"
          onClick={() => {
            setModalOpen(false);
            setInput("");
          }}
          ripple="dark"
        >
          Cancel
        </Button>
        <Button color="blue" onClick={() => createDocument()} ripple="light">
          Create
        </Button>
      </ModalFooter>
    </Modal>
  );
  const createDocument = () => {
    if (!input) return;
    db.collection("usersDocs")
      .doc(session?.user?.email)
      .collection("docs")
      .add({
        fileName: input,
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      });
    setInput("");
    setModalOpen(false);
  };

  return (
    <>
      {modal}
      <section className="bg-[#f8f9fa] pb-10 px-10">
        <div className="max-w-3xl mx-auto">
          <div className="flex items-center justify-between py-6">
            <h2 className="text-gray-700 text-lg"> Start a new document</h2>
            <Button
              color="gray"
              buttonType="outline"
              iconOnly={true}
              ripple={"dark"}
              className="border-0"
            >
              <Icon name="more_vert" size="3xl" color={"gray"} />
            </Button>
          </div>
          <div>
            <div
              className="relative h-52 w-40 border-2 cursor-pointer hover:border-blue-700"
              onClick={() => {
                setModalOpen(true);
              }}
            >
              <Image src={"https://links.papareact.com/pju"} layout="fill" />
            </div>
            <p className="ml-2 mt-2 font-semibold text-sm text-gray-700">
              Blank
            </p>
          </div>
        </div>
      </section>
    </>
  );
}

export default AddDocument;
