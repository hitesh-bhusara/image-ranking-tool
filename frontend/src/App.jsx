import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";

import ComparePage from "./pages/ComparePage";
import LeaderboardPage from "./pages/LeaderboardPage";

function App() {

  return (

    <BrowserRouter>

      <Routes>

        <Route
          path="/"
          element={<ComparePage />}
        />

        <Route
          path="/leaderboard"
          element={<LeaderboardPage />}
        />

      </Routes>

    </BrowserRouter>

  );
}

export default App;