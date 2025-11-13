import { GetTeachersessionreq } from "@/app/actions/GetTeachersessionreq";
import SessionRequestList from "@/app/components/SessionRequestList";

export default async function Page() {
  // Data fetching remains on the server
  const data = await GetTeachersessionreq();
  const requests = Array.isArray(data) ? data : [];

  // Pass the fetched data to the client component for interactivity
  return <SessionRequestList initialRequests={requests} />;
}
