import { LAMPORTS_PER_SOL } from "@solana/web3.js";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (request: NextRequest) => {
  const searchParams = request.nextUrl.searchParams;
  const walletAddress = searchParams.get("address");

  if (!walletAddress) {
    return NextResponse.json(
      { error: "Wallet address is required" },
      { status: 400 }
    );
  }

  try {
    const rpcUrl =
      `https://${process.env.NEXT_PUBLIC_SOLANA_NETWORK}.helius-rpc.com/?api-key=${process.env.NEXT_PUBLIC_HELIUS_API_KEY}` ||
      "https://api.devnet.solana.com";

    if (!rpcUrl) {
      throw new Error("RPC URL is not set");
    }

    const response = await fetch(rpcUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        jsonrpc: "2.0",
        method: "getBalance",
        params: [walletAddress],
        id: 1,
      }),
    });
    const data = await response.json();

    return NextResponse.json({
      data: { balance: data.result.value / LAMPORTS_PER_SOL },
    });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: err }, { status: 500 });
  }
};
