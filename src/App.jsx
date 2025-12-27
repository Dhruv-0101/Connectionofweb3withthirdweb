import WalletConnect from "./components/WalletConnect";
import CounterApp from "./components/CounterApp";

export default function App() {
  return (
    <div className="p-6 space-y-6">
      <WalletConnect />
      <CounterApp />
    </div>
  );
}
