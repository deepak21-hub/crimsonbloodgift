import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Intro } from "./pages/Intro";
import { VampirePath } from "./pages/VampirePath";
import { WolfPath } from "./pages/WolfPath";
import { Puzzle } from "./pages/Puzzle";
import { Gift } from "./pages/Gift";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Intro />} />
          <Route path="/vampire" element={<VampirePath />} />
          <Route path="/wolf" element={<WolfPath />} />
          <Route path="/puzzle" element={<Puzzle />} />
          <Route path="/gift" element={<Gift />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
