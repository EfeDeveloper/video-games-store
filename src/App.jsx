import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Content from './components/Content';

function App() {
  return (
    <div className="min-h-screen">
      <Header />
      <main className="app-main">
        <Sidebar />
        <Content />
      </main>
    </div>
  );
}

export default App;
