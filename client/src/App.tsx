import { BrowserRouter as Router } from 'react-router-dom';
import AppRoutes from './routes/AppRoutes';
import Navbar from './components/Navbar';
import { ThemeProvider } from './context/ThemeContext';
import Footer from './components/Footer';

const App = () => {
  return (
    <ThemeProvider>
      <Router>
        <Navbar />
        <main className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-white">
          <AppRoutes />
        </main>
        <Footer />
      </Router>
    </ThemeProvider>
  );
};

export default App;
