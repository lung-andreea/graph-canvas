import dynamic from "next/dynamic";

const Home = dynamic(() => import("../components/Home/Home"), {
  ssr: false,
});

const IndexPage: React.FC = () => {
  return <Home />;
};

export default IndexPage;
