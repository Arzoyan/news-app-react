// src/App.tsx
import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { CircularProgress } from '@mui/material';

const News = lazy(() => import('./pages/News'));
// Other components/routes can be lazily loaded similarly

function App() {
  return (
    <Router>
      <Suspense fallback={<CircularProgress />}>
        <Switch>
          <Route path="/news" component={News} />
          {/* Other routes */}
        </Switch>
      </Suspense>
    </Router>
  );
}

export default App;
