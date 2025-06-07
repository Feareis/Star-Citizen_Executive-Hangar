import { AlertTriangle } from "lucide-react";
import { AlertCard } from "@components/card/AlertCard";

const Home = () => {
  return (
    <section>
      <AlertCard
        variant="warning"
        icon={<AlertTriangle size={20} />}
        title="Something went wrong"
        listItems={["Check your internet connection", "Try again later"]}
      />
      <h2 className="text-3xl font-semibold mb-4">Home Page</h2>
      <p className="text-gray-300">This is the home page content.</p>
    </section>
  );
};

export default Home;
