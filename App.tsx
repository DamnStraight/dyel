import "reflect-metadata";
import { Provider } from "@App/provider";
import RootNavigation from "@App/navigation";

export default function App() {
  return (
      <Provider>
        <RootNavigation />
      </Provider>
  );
}
