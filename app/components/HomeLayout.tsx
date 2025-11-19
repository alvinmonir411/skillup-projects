import Banner from "./Banner";
import Fetured from "./Fetured";
import StaticFAQ from "./StaticFAQ";

const HomeLayout = async () => {
  return (
    <div>
      <Banner />
      <Fetured />
      <StaticFAQ />
    </div>
  );
};

export default HomeLayout;
