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
import CarFuel from "@/pages/CarFuel";
import CurrencyConverter from "@/pages/CurrencyConverter";
import TravelCost from "@/pages/TravelCost";
import EndOfService from "@/pages/EndOfService";
import ZakatCalc from "@/pages/ZakatCalc";
import Inheritance from "@/pages/Inheritance";
import TimeCalc from "@/pages/TimeCalc";
import UnitConverter from "@/pages/UnitConverter";
import NumberConverter from "@/pages/NumberConverter";
import FileConverter from "@/pages/FileConverter";
import WeightedAverage from "@/pages/WeightedAverage";
import GoldPrices from "@/pages/GoldPrices";
import FileTools from "@/pages/FileTools";
import Qibla from "@/pages/Qibla";
import Tasbih from "@/pages/Tasbih";
import Investment from "@/pages/Investment";
import NetSalary from "@/pages/NetSalary";
import QrGenerator from "@/pages/QrGenerator";
import PasswordGenerator from "@/pages/PasswordGenerator";
import TextTools from "@/pages/TextTools";
import BillSplit from "@/pages/BillSplit";
import Pomodoro from "@/pages/Pomodoro";
import Countdown from "@/pages/Countdown";
import GpaCalc from "@/pages/GpaCalc";
import ColorPalette from "@/pages/ColorPalette";
import PlanetAge from "@/pages/PlanetAge";
import SocialLinks from "@/pages/SocialLinks";
import Lottery from "@/pages/Lottery";
import Calories from "@/pages/Calories";

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
              <Route path="/car-fuel" element={<CarFuel />} />
              <Route path="/currency" element={<CurrencyConverter />} />
              <Route path="/travel" element={<TravelCost />} />
              <Route path="/eos" element={<EndOfService />} />
              <Route path="/zakat" element={<ZakatCalc />} />
              <Route path="/inheritance" element={<Inheritance />} />
              <Route path="/time-calc" element={<TimeCalc />} />
              <Route path="/units" element={<UnitConverter />} />
              <Route path="/numbers" element={<NumberConverter />} />
              <Route path="/file-convert" element={<FileConverter />} />
              <Route path="/weighted-avg" element={<WeightedAverage />} />
              <Route path="/gold" element={<GoldPrices />} />
              <Route path="/file-tools" element={<FileTools />} />
              <Route path="/qibla" element={<Qibla />} />
              <Route path="/tasbih" element={<Tasbih />} />
              <Route path="/investment" element={<Investment />} />
              <Route path="/net-salary" element={<NetSalary />} />
              <Route path="/qr" element={<QrGenerator />} />
              <Route path="/password" element={<PasswordGenerator />} />
              <Route path="/text-tools" element={<TextTools />} />
              <Route path="/bill-split" element={<BillSplit />} />
              <Route path="/pomodoro" element={<Pomodoro />} />
              <Route path="/countdown" element={<Countdown />} />
              <Route path="/gpa" element={<GpaCalc />} />
              <Route path="/colors" element={<ColorPalette />} />
              <Route path="/planet-age" element={<PlanetAge />} />
              <Route path="/social" element={<SocialLinks />} />
              <Route path="/lottery" element={<Lottery />} />
              <Route path="/calories" element={<Calories />} />
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
