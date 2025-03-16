import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { WalletVerification } from "@/components/wallet/wallet-verification";

export default function WalletVerificationPage() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">
            Wallet Connection
          </h1>
          <p className="text-muted-foreground">
            Connect your wallet and view data for any Solana address.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <WalletVerification />

          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Instructions</h2>
            <ol className="list-decimal list-inside space-y-2">
              <li>
                Connect your wallet using the button above or in the header
              </li>
              <li>
                Once connected, you&apos;ll see your wallet address and
                connection status
              </li>
              <li>
                To view data for a specific address, enter it in the input field
                and click &quot;View&quot;
              </li>
              <li>
                The default address is set to:{" "}
                <code className="bg-muted px-1 py-0.5 rounded font-mono text-xs">
                  4KFhG4roRexhFqttE3KZmHrwQrxThRyg5aLcs2WRXk1F
                </code>
              </li>
            </ol>

            <div className="mt-6 rounded-md border p-4 bg-muted/50">
              <h3 className="font-semibold mb-2">Coming in Next Steps</h3>
              <ul className="list-disc list-inside space-y-1 text-sm">
                <li>Drift API integration</li>
                <li>Viewing subaccounts, balances, and positions</li>
                <li>Testing wallet connection with Drift Protocol</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
