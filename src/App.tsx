import { QueryClient, QueryClientProvider, useQuery } from "react-query";

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
  const { status, data, error } = useGameStatus();

  return status === "loading" ? (
    <span>Loading...</span>
  ) : status === "error" ? (
    <span>
      <strong>Error:</strong> {error?.status}
    </span>
  ) : (
    <span>
      <strong>Status:</strong> {data?.status}
    </span>
  );
}

interface IGameStatusResponse {
  status: string;
}

function useGameStatus() {
  return useQuery<IGameStatusResponse, IGameStatusResponse>(
    "game-status",
    async () => {
      const response = await fetch("https://api.spacetraders.io/game/status");
      return await response.json();
    }
  );
}

export default App;
