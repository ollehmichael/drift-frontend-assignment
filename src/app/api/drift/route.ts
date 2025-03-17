import {
  DRIFT_PROGRAM_ID,
  DriftClient,
  DriftClientConfig,
  loadKeypair,
  Wallet,
} from "@drift-labs/sdk";
import { Connection, PublicKey } from "@solana/web3.js";
import { NextResponse } from "next/server";

const CLUSTER = "devnet";

async function setupClients() {
  const rpcUrl =
    `https://${process.env.NEXT_PUBLIC_SOLANA_NETWORK}.helius-rpc.com/?api-key=${process.env.NEXT_PUBLIC_HELIUS_API_KEY}` ||
    "https://api.devnet.solana.com";

  if (!rpcUrl) {
    throw new Error("RPC URL is not set");
  }

  const connection = new Connection(rpcUrl, "confirmed");

  const keyPairFile = process.env.NEXT_PUBLIC_KEYPAIR_VALUE || "";

  const wallet = new Wallet(loadKeypair(keyPairFile));

  const config: DriftClientConfig = {
    connection: connection,
    wallet: wallet,
    programID: new PublicKey(DRIFT_PROGRAM_ID),
    env: CLUSTER,
  };

  const driftClient = new DriftClient(config);

  return {
    driftClient,
    connection,
  };
}

export async function GET() {
  try {
    const { driftClient } = await setupClients();

    await driftClient.subscribe();

    const users = driftClient.getUsers();

    const next = driftClient.getUserStats();

    // Transform the user data to a serializable format if needed
    console.log("ATTENTION", users, next);
    // const userData = {
    //   id: user?.getUserAccountPublicKey()?.toString(),
    // };

    return NextResponse.json({
      success: true,
    });
  } catch (error) {
    console.error("Error fetching Drift data:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Failed to fetch Drift data",
      },
      { status: 500 }
    );
  }
}
