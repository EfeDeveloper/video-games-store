<p align="center">
  <a href="" rel="noopener">
 <img width=200px height=200px src="./public/index.svg" alt="Project logo"></a>
</p>

<h3 align="center">video-games-store</h3>

<div align="center">

[![Status](https://img.shields.io/badge/status-active-success.svg)]()
[![GitHub Issues](https://img.shields.io/github/issues/EfeDeveloper/video-games-store.svg)](https://github.com/EfeDeveloper/video-games-store/issues)
[![GitHub Pull Requests](https://img.shields.io/github/issues-pr/EfeDeveloper/video-games-store.svg)](https://github.com/EfeDeveloper/video-games-store/pulls)
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](/LICENSE)

</div>

## 📝 Table of Contents

- [About](#about)
- [Getting Started](#getting_started)
- [Built Using](#built_using)
- [Contributing](../CONTRIBUTING.md)
- [Authors](#authors)
- [Acknowledgments](#acknowledgement)

## 🧐 About <a name = "about"></a>

Modern video game store built with React, TypeScript, Vite & Tailwind CSS. Features real game data from RAWG API, shopping cart, wishlist, advanced filtering, and a responsive design.

## ✨ Features

- 🎮 **Real Game Database**: Integration with RAWG API (500k+ games)
- 🛒 **Shopping Cart**: Add/remove games with persistent storage
- ❤️ **Wishlist**: Save favorite games for later
- 🔍 **Advanced Search**: Filter by categories, platforms, price, and more
- 📱 **Responsive Design**: Beautiful UI on all devices
- ⚡ **Fast Performance**: Built with Vite and optimized rendering
- 🎨 **Modern UI**: Smooth animations and transitions
- 💾 **Persistent State**: Cart and wishlist saved in localStorage
- 🔧 **TypeScript**: Full type safety throughout the application

## 🏁 Getting Started <a name = "getting_started"></a>

> Clone the project by adding the following command line on a terminal

```
git clone https://github.com/EfeDeveloper/video-games-store.git
```

### Prerequisites

- [Node.js](https://nodejs.org/es/download/) (version 20 or higher)
- [RAWG API Key](https://rawg.io/apidocs) (free tier: 20,000 requests/month)

### Installing

1. **Clone the repository**

```bash
git clone https://github.com/EfeDeveloper/video-games-store.git
cd video-games-store
```

2. **Install dependencies**

```bash
npm install
```

3. **Configure API Key**
   - Visit [RAWG API](https://rawg.io/apidocs) and create a free account
   - Get your API key
   - Copy `.env.example` to `.env`:

```bash
cp .env.example .env
```

- Open `.env` and add your API key:

```
VITE_RAWG_API_KEY=your_api_key_here
```

4. **Run the development server**

```bash
npm run dev
```

5. **Open your browser** at `http://localhost:5173`

### Available Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Run ESLint
npm run lint:fix     # Fix ESLint errors
npm run format       # Format code with Prettier
npm run type-check   # Check TypeScript errors
```

## 📁 Project Structure

```
src/
├── components/        # React components
│   ├── ProductCard.tsx
│   ├── ProductGrid.tsx
│   ├── CartDrawer.tsx
│   └── ...
├── store/            # Zustand stores
│   ├── useCartStore.ts
│   ├── useWishlistStore.ts
│   └── useFilterStore.ts
├── hooks/            # Custom React hooks
│   ├── useGames.ts
│   └── useFetch.ts
├── services/         # API services
│   └── gamesApi.ts
├── config/           # Configuration files
│   └── api.ts
├── types/            # TypeScript type definitions
│   └── index.ts
├── common/           # Constants and utilities
│   └── constants/
└── ...
```

## ⛏️ Built Using <a name = "built_using"></a>

### Core Technologies

- [React 18](https://react.dev/) - UI Library
- [TypeScript](https://www.typescriptlang.org/) - Type Safety
- [Vite](https://vitejs.dev/) - Build Tool & Dev Server
- [Tailwind CSS](https://tailwindcss.com/) - CSS Framework

### State Management & Data

- [Zustand](https://zustand-demo.pmnd.rs/) - State Management
- [RAWG API](https://rawg.io/apidocs) - Game Database

### UI & Animations

- [React Icons](https://react-icons.github.io/react-icons/) - Icon Library
- [Framer Motion](https://www.framer.com/motion/) - Animations
- [React Router](https://reactrouter.com/) - Routing
- [React Hot Toast](https://react-hot-toast.com/) - Notifications

### Code Quality

- [ESLint](https://eslint.org/) - Linting
- [Prettier](https://prettier.io/) - Code Formatting
- [TypeScript ESLint](https://typescript-eslint.io/) - TS Linting


## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## ✍️ Authors <a name = "authors"></a>

- [@EfeDeveloper](https://github.com/EfeDeveloper) - Development & implementation

See also the list of [contributors](https://github.com/EfeDeveloper/video-games-store/contributors) who participated in this project.

## 🎉 Acknowledgements <a name = "acknowledgement"></a>

- Hat tip to anyone whose code was used
- Inspiration
- References
