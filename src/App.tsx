import { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { ModeProvider } from './context/ModeContext';
import { Layout } from './components/layout/Layout';
import { Home } from './pages/Home';
import { StatusCodes } from './pages/StatusCodes';
import { StatusCodeDetail } from './pages/StatusCodeDetail';
import { Compare } from './pages/Compare';
import { Playground } from './pages/Playground';
import { Quiz } from './pages/Quiz';
import { About } from './pages/About';
import { NotFound } from './pages/NotFound';

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

function App() {
  return (
    <ModeProvider>
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="status-codes" element={<StatusCodes />} />
            <Route path="status-codes/:code" element={<StatusCodeDetail />} />
            <Route path="compare" element={<Compare />} />
            <Route path="playground" element={<Playground />} />
            <Route path="quiz" element={<Quiz />} />
            <Route path="about" element={<About />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ModeProvider>
  );
}

export default App;
