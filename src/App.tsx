import { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { CircularProgress } from '@mui/material';

const News = lazy(() => import('./pages/News'));

function App() {
  return (
    <Router>
      <Suspense fallback={<CircularProgress />}>
        <Routes>
          <Route path="/news" element={<News />} />
        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;
