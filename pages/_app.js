import React, { useMemo } from "react";
// WalletAdapterNetwork: all available networks
import { WalletAdapterNetwork } from "@solana/wallet-adapter-base";
// WalletModalProvider: prompt user to select their wallet
import { WalletModalProvider } from "@solana/wallet-adapter-react-ui";
// ConnectionProvider: allows us to talk to nodes on the Solana blockchain via RPC
// WalletProvider: an interface to connect different wallets
import { ConnectionProvider, WalletProvider } from "@solana/wallet-adapter-react";
import {
  GlowWalletAdapter,
  PhantomWalletAdapter,
  SlopeWalletAdapter,
  SolflareWalletAdapter,
  TorusWalletAdapter
} from "@solana/wallet-adapter-wallets";
import { clusterApiUrl, Connection } from "@solana/web3.js";

import "@solana/wallet-adapter-react-ui/styles.css";
import "../styles/globals.css";
import "../styles/App.css";

const App = ({ Component, pageProps }) => {

  // choices: [Devnet, Testnet, Mainnet]
  // generate an RPC endpoint based on the network provided
  const network = WalletAdapterNetwork.Devnet;
  const endpoint = useMemo(() => clusterApiUrl(network), [network]);

  // @solana/wallet-adapter-wallets includes all the adapters but supports tree shaking and lazy loading --
  // Only the wallets you configure here will be compiled into your application, and only the dependencies
  // of wallets that your users connect to will be loaded
  const wallets = useMemo(
    () => [
      new PhantomWalletAdapter(),
      new GlowWalletAdapter(),
      new SlopeWalletAdapter(),
      new SolflareWalletAdapter({ network }),
      new TorusWalletAdapter(),
    ],
    [network]
  );

  return (
    <ConnectionProvider endpoint={endpoint}>
      <WalletProvider wallets={wallets} autoConnect>
        <WalletModalProvider>
          <Component {...pageProps}/>
        </WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  );
};

export default App;