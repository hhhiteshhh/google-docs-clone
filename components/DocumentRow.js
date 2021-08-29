import Icon from "@material-tailwind/react/Icon";
import Button from "@material-tailwind/react/Button";
import { useRouter } from "next/dist/client/router";
function DocumentRow({ id, fileName, date }) {
  const router = useRouter();
  return (
    <div
      className="max-w-3xl mx-auto p-4 flex items-center rounded-lg hover:bg-gray-100 text-sm cursor-pointer hover:shadow-sm"
      onClick={() => router.push(`/doc/${id}`)}
    >
      <Icon name="article" size="3xl" color="blue" />
      <p className="flex-grow pl-5 w-10 pr-10 truncate">{fileName}</p>
      <p className="pr-5 text-sm">{date?.toDate().toLocaleDateString()}</p>
      <Button
        color="gray"
        buttonType="outline"
        iconOnly={true}
        rounded={true}
        ripple={"dark"}
        className="border-0"
      >
        <Icon name="more_vert" size="3xl" color={"gray"} />
      </Button>
    </div>
  );
}

export default DocumentRow;
