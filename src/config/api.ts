export const API_CONFIG = {
  BASE_URL: 'https://api.rawg.io/api',
  API_KEY: import.meta.env.VITE_RAWG_API_KEY || '',
  ENDPOINTS: {
    GAMES: '/games',
    GAME_DETAILS: (id: number) => `/games/${id}`,
    PLATFORMS: '/platforms',
    GENRES: '/genres',
  },
  DEFAULT_PAGE_SIZE: 20,
};

export const buildQueryString = (params: Record<string, unknown>): string => {
  const searchParams = new URLSearchParams();

  Object.entries(params).forEach(([key, value]) => {
    if (value !== null && value !== undefined && value !== '') {
      if (Array.isArray(value)) {
        if (value.length > 0) {
          searchParams.append(key, value.join(','));
        }
      } else {
        searchParams.append(key, String(value));
      }
    }
  });

  return searchParams.toString();
};
