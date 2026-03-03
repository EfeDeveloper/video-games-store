export interface Category {
  id: number;
  label: string;
  slug?: string;
}

export interface Platform {
  id: number;
  label: string;
  slug?: string;
}

export interface PriceRange {
  min: number;
  max: number;
}

export interface Game {
  id: number;
  name: string;
  slug: string;
  background_image: string;
  rating: number;
  ratings_count: number;
  metacritic: number | null;
  playtime: number;
  released: string;
  genres: Genre[];
  platforms: GamePlatform[];
  short_screenshots?: Screenshot[];
  description_raw?: string;
  developers?: Developer[];
  publishers?: Publisher[];
  esrb_rating?: EsrbRating | null;
}

export interface Genre {
  id: number;
  name: string;
  slug: string;
}

export interface GamePlatform {
  platform: {
    id: number;
    name: string;
    slug: string;
  };
}

export interface Screenshot {
  id: number;
  image: string;
}

export interface Developer {
  id: number;
  name: string;
  slug: string;
}

export interface Publisher {
  id: number;
  name: string;
  slug: string;
}

export interface EsrbRating {
  id: number;
  name: string;
  slug: string;
}

export interface CartItem {
  game: Game;
  quantity: number;
  price: number;
}

export interface FilterState {
  searchQuery: string;
  selectedCategories: number[];
  selectedPlatforms: number[];
  priceRange: PriceRange;
  sortBy: SortOption;
}

export type SortOption =
  | 'relevance'
  | 'name'
  | '-name'
  | 'released'
  | '-released'
  | 'rating'
  | '-rating'
  | 'metacritic'
  | '-metacritic';

export interface GamesResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: Game[];
}
