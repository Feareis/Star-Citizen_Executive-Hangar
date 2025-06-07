import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "@components/Layout";
import Home from "@pages/Home";
import Map from "@pages/Map";
import ShipReward from "@pages/ShipReward";

const App = () => {
  return (
    // Main router wrapper
    <BrowserRouter>
      {/* Global layout applied to all routes */}
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/map" element={<Map />} />
          <Route path="/ship-reward" element={<ShipReward />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
};

export default App;
