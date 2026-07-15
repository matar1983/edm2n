import "@/App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "sonner";
import Layout from "@/components/Layout";
import Home from "@/pages/Home";
import FinanceCalculator from "@/pages/FinanceCalculator";
import AgeCalculator from "@/pages/AgeCalculator";
import PercentCalculator from "@/pages/PercentCalculator";
import DateConverter from "@/pages/DateConverter";
import HijriPage from "@/pages/HijriPage";
import AiSites from "@/pages/AiSites";
import WhatsappSender from "@/pages/WhatsappSender";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/finance" element={<FinanceCalculator />} />
            <Route path="/age" element={<AgeCalculator />} />
            <Route path="/percent" element={<PercentCalculator />} />
            <Route path="/date-convert" element={<DateConverter />} />
            <Route path="/hijri" element={<HijriPage />} />
            <Route path="/ai" element={<AiSites />} />
            <Route path="/whatsapp" element={<WhatsappSender />} />
          </Routes>
        </Layout>
      </BrowserRouter>
      <Toaster position="top-center" richColors dir="rtl" />
    </div>
  );
}

export default App;
