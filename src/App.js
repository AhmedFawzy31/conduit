import Home from "./pages/Home";
import { RouterProvider } from "react-router-dom";
import { QueryClientProvider } from "@tanstack/react-query";
import router from "./router";
import { queryClient } from "./QueryClient";
function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router}>
        <Home></Home>
      </RouterProvider>
    </QueryClientProvider>
  );
}

export default App;
export { queryClient };
