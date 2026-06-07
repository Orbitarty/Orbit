# OrbitCity

A comprehensive platform for urban community hubs with Web3 integration.

## Project Structure

```
orbit/
├── backend/           # Node.js Express API server
├── mobile/            # React Native mobile app (Expo)
├── contracts/         # Ethereum smart contracts (Hardhat)
├── src/              # React web frontend
├── public/           # Static assets
└── package.json      # Root workspace configuration
```

## Architecture Overview

### Frontend (Web)
- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite
- **UI Library**: Radix UI + Tailwind CSS
- **State Management**: TanStack Query
- **Routing**: React Router
- **Maps**: React Leaflet

### Backend (API)
- **Runtime**: Node.js with Express
- **Database**: MongoDB with Mongoose
- **Authentication**: JWT + bcrypt
- **Security**: Helmet, CORS, compression
- **File Upload**: Multer + Cloudinary
- **Validation**: Joi

### Mobile App
- **Framework**: React Native (Expo 56)
- **Navigation**: React Navigation 7
- **Maps**: React Native Maps
- **Camera**: Expo Camera
- **Location**: Expo Location

### Smart Contracts
- **Framework**: Hardhat
- **Language**: Solidity
- **Libraries**: OpenZeppelin Contracts
- **Testing**: Chai + Mocha
- **Network**: Ethereum-compatible chains

## Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn
- MongoDB instance
- Ethereum wallet for contracts

### Installation

1. **Install all dependencies**:
```bash
npm install
```

2. **Install backend dependencies**:
```bash
cd backend && npm install
```

3. **Install mobile dependencies**:
```bash
cd mobile && npm install
```

4. **Install contract dependencies**:
```bash
cd contracts && npm install
```

### Development

1. **Start the web frontend**:
```bash
npm run dev
```

2. **Start the backend server**:
```bash
cd backend && npm run dev
```

3. **Start the mobile app**:
```bash
cd mobile && npm start
```

4. **Deploy contracts locally**:
```bash
cd contracts && npm run node
# In another terminal:
cd contracts && npm run deploy:local
```

### Testing

- **Web tests**: `npm test`
- **Backend tests**: `cd backend && npm test`
- **Mobile tests**: `cd mobile && npm test`
- **Contract tests**: `cd contracts && npm test`

## Security Updates

All packages have been updated to their latest secure versions. The following vulnerabilities were addressed:

- Updated React Router to fix XSS vulnerabilities
- Updated Vite and esbuild for security patches
- Fixed various ReDoS vulnerabilities in glob, minimatch, and picomatch
- Updated PostCSS to prevent XSS attacks
- Upgraded Vitest to resolve critical security issues

## Environment Variables

Create `.env` files in each directory as needed:

### Backend (.env)
```
MONGODB_URI=mongodb://localhost:27017/orbitcity
JWT_SECRET=your-secret-key
CLOUDINARY_URL=your-cloudinary-url
PORT=3001
```

### Contracts (.env)
```
PRIVATE_KEY=your-private-key
ALCHEMY_API_KEY=your-alchemy-key
ETHERSCAN_API_KEY=your-etherscan-key
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run tests and linting
5. Submit a pull request

## License

MIT License - see LICENSE file for details.