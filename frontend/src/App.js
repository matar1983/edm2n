import "@/App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "sonner";
import { ThemeProvider } from "@/contexts/ThemeContext";
import Layout from "@/components/Layout";
import Home from "@/pages/Home";
import FinanceCalculator from "@/pages/FinanceCalculator";
import AgeCalculator from "@/pages/AgeCalculator";
import PercentCalculator from "@/pages/PercentCalculator";
import DateConverter from "@/pages/DateConverter";
import HijriPage from "@/pages/HijriPage";
import AiSites from "@/pages/AiSites";
import WhatsappSender from "@/pages/WhatsappSender";
import BmiCalculator from "@/pages/BmiCalculator";
import TaxCalculator from "@/pages/TaxCalculator";
import MortgageCalculator from "@/pages/MortgageCalculator";
import ContactMe from "@/pages/ContactMe";

function App() {
  return (
    <div className="App">
      <ThemeProvider>
        <BrowserRouter>
          <Layout>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/finance" element={<FinanceCalculator />} />
              <Route path="/mortgage" element={<MortgageCalculator />} />
              <Route path="/age" element={<AgeCalculator />} />
              <Route path="/bmi" element={<BmiCalculator />} />
              <Route path="/percent" element={<PercentCalculator />} />
              <Route path="/tax" element={<TaxCalculator />} />
              <Route path="/date-convert" element={<DateConverter />} />
              <Route path="/hijri" element={<HijriPage />} />
              <Route path="/ai" element={<AiSites />} />
              <Route path="/whatsapp" element={<WhatsappSender />} />
              <Route path="/contact" element={<ContactMe />} />
            </Routes>
          </Layout>
        </BrowserRouter>
        <Toaster position="top-center" richColors dir="rtl" />
      </ThemeProvider>
    </div>
  );
}

export default App;
