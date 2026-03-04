import { API_CONFIG, buildQueryString } from '@/config/api';
import { Game, GamesResponse, PlatformsResponse, GenresResponse } from '@/types';

interface FetchGamesParams {
  page?: number;
  page_size?: number;
  search?: string;
  genres?: string;
  platforms?: string;
  ordering?: string;
}

export const fetchGames = async (
  params: FetchGamesParams = {}
): Promise<GamesResponse> => {
  const queryParams = {
    key: API_CONFIG.API_KEY,
    page_size: params.page_size || API_CONFIG.DEFAULT_PAGE_SIZE,
    ...params,
  };

  const queryString = buildQueryString(queryParams);
  const url = `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.GAMES}?${queryString}`;

  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`API Error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching games:', error);
    throw error;
  }
};

export const fetchGameDetails = async (id: number): Promise<Game> => {
  const queryString = buildQueryString({ key: API_CONFIG.API_KEY });
  const url = `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.GAME_DETAILS(id)}?${queryString}`;

  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`API Error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error(`Error fetching game details for ID ${id}:`, error);
    throw error;
  }
};

export const fetchGameScreenshots = async (id: number) => {
  const queryString = buildQueryString({ key: API_CONFIG.API_KEY });
  const url = `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.GAME_SCREENSHOTS(id)}?${queryString}`;

  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`API Error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error(`Error fetching screenshots for game ID ${id}:`, error);
    throw error;
  }
};

export const searchGames = async (query: string): Promise<GamesResponse> => {
  return fetchGames({ search: query });
};

export const fetchPlatforms = async (): Promise<PlatformsResponse> => {
  const queryString = buildQueryString({ key: API_CONFIG.API_KEY });
  const url = `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.PLATFORMS}?${queryString}`;

  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`API Error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching platforms:', error);
    throw error;
  }
};

export const fetchGenres = async (): Promise<GenresResponse> => {
  const queryString = buildQueryString({ key: API_CONFIG.API_KEY });
  const url = `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.GENRES}?${queryString}`;

  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`API Error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching genres:', error);
    throw error;
  }
};
