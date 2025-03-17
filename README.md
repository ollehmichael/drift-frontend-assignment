# Drift Protocol Frontend

A decentralized trading platform built on Solana using the Drift Protocol. This Next.js application provides a modern interface for managing orders, positions, and subaccounts on the Solana blockchain.

## Features

- 🔐 Secure wallet integration with multiple Solana wallet providers
- 📊 Real-time order management and position tracking
- 👥 Subaccount management for organized trading
- 💼 Portfolio overview and statistics
- 🌗 Dark mode support
- 🎨 Modern UI built with shadcn/ui components

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Project Structure

- `/app` - Next.js app router pages and layouts
- `/components` - Reusable UI components
  - `/dashboard` - Dashboard-related components
  - `/layout` - Layout components (header, sidebar)
  - `/orders` - Order management components
  - `/positions` - Position tracking components
  - `/subaccounts` - Subaccount management components
  - `/ui` - Base UI components
  - `/wallet` - Wallet integration components
- `/providers` - React context providers
- `/lib` - Utility functions and shared logic

## Technologies Used

- [Next.js](https://nextjs.org/) - React framework
- [Solana Web3.js](https://solana-labs.github.io/solana-web3.js/) - Solana blockchain integration
- [Wallet Adapter](https://github.com/solana-labs/wallet-adapter) - Solana wallet integration
- [shadcn/ui](https://ui.shadcn.com) - UI component library
- [Tailwind CSS](https://tailwindcss.com) - Styling
- [Radix UI](https://www.radix-ui.com) - Headless UI components

## Learn More

To learn more about the technologies used in this project:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API
- [Solana Documentation](https://docs.solana.com) - learn about Solana blockchain development
- [Drift Protocol Documentation](https://drift-labs.github.io/protocol-v2/) - learn about the Drift Protocol
