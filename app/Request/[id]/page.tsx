import { GetDeteils } from "@/app/actions/GetDeteils";
import Modal from "@/app/components/Modal";

const RequestModal = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const { id } = await params;
  console.log(id);
  const data = await GetDeteils(id);

  return (
    <div>
      <Modal courseDetails={data} courseId={id} />
    </div>
  );
};

export default RequestModal;
