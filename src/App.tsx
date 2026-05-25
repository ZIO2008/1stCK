import { HashRouter, Routes, Route } from 'react-router-dom';
import { WorksProvider } from '@/context/WorksContext';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ScrollToTop from '@/components/ScrollToTop';
import BackToTop from '@/components/BackToTop';
import Home from '@/pages/Home';
import WorkDetail from '@/pages/WorkDetail';
import Works from '@/pages/Works';
import About from '@/pages/About';
import Admin from '@/pages/Admin';
import Video from '@/pages/Video';

export default function App() {
  return (
    <HashRouter>
      <WorksProvider>
        <ScrollToTop />
        <div className="flex flex-col min-h-screen">
          <Navbar />
          <main className="flex-1">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/work/:id" element={<WorkDetail />} />
              <Route path="/works" element={<Works />} />
              <Route path="/tags" element={<Works />} />
              <Route path="/about" element={<About />} />
              <Route path="/video" element={<Video />} />
              <Route path="/admin" element={<Admin />} />
            </Routes>
          </main>
          <Footer />
          <BackToTop />
        </div>
      </WorksProvider>
    </HashRouter>
  );
}
