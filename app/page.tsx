import HomeLayout from "./components/HomeLayout";

export default async function Home() {
  const baseURL = process.env.NEXTAUTH_URL;
  const data = await fetch(`${baseURL}/api/getproduct`);
  const products = await data.json();
  console.log(products);
  return (
    <div className="">
      <HomeLayout />
    </div>
  );
}
