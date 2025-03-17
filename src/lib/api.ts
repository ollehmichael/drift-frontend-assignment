"use server";

import {
  DRIFT_PROGRAM_ID,
  DriftClient,
  DriftClientConfig,
  loadKeypair,
  PublicKey,
  Wallet,
} from "@drift-labs/sdk";
import { Connection } from "@solana/web3.js";

const CLUSTER = "devnet";

export const setupClients = async () => {
  const rpcUrl =
    `https://${process.env.NEXT_PUBLIC_SOLANA_NETWORK}.helius-rpc.com/?api-key=${process.env.NEXT_PUBLIC_HELIUS_API_KEY}` ||
    "https://api.devnet.solana.com";

  if (!rpcUrl) {
    throw new Error("RPC URL is not set");
  }

  const connection = new Connection(rpcUrl);

  const keyPairFile = process.env.NEXT_PUBLIC_KEYPAIR_VALUE || "";

  const wallet = new Wallet(loadKeypair(keyPairFile));

  const vaultDriftClientConfig: DriftClientConfig = {
    connection: connection,
    wallet: wallet,
    programID: new PublicKey(DRIFT_PROGRAM_ID),
    env: CLUSTER,
  };

  const driftClient = new DriftClient(vaultDriftClientConfig);

  return {
    driftClient,
    connection,
  };
};
