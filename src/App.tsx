import { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Content from './components/Content';
import { GameDetailModal } from './components/GameDetailModal';
import { SidebarDrawer } from './components/SidebarDrawer';

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <BrowserRouter>
      <div className="min-h-screen">
        <a href="#main-content" className="skip-to-main">
          Skip to main content
        </a>
        <Header />
        <main id="main-content" className="app-main" role="main">
          <Sidebar />
          <Content onOpenFilters={() => setIsSidebarOpen(true)} />
        </main>
        <Routes>
          <Route path="/game/:id" element={<GameDetailModal />} />
        </Routes>
        <SidebarDrawer
          isOpen={isSidebarOpen}
          onClose={() => setIsSidebarOpen(false)}
        />
      </div>
    </BrowserRouter>
  );
}

export default App;
