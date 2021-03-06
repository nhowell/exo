import { QueryClient, QueryClientProvider } from "react-query";
import { useGameStatus } from "./spacetraders-api/game";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <h1>SpaceTraders</h1>
      <GameStatus />
    </QueryClientProvider>
  );
}

function GameStatus() {
  const { isLoading, isError, data } = useGameStatus();

  return isLoading ? (
    <span>Loading...</span>
  ) : isError ? (
    <span>
      <strong>Error:</strong>
    </span>
  ) : (
    <span>
      <strong>Status:</strong> {data?.status}
    </span>
  );
}

export default App;
