const BEERS_PER_PAGE: number = 10;
const DEFAULT_PAGE: number = 1;
const ROOT_ENDPOINT: string = 'https://api.punkapi.com/v2/';
const INITIAL_ENDPOINT: string = `beers?page=${DEFAULT_PAGE}&per_page=${BEERS_PER_PAGE}`;

interface IBeerDetails {
  id: number;
  name: string;
  tagline: string;
  first_brewed: string;
  description: string;
  image_url: string;
  abv: number;
  ibu: number;
  target_fg: number;
  target_og: number;
  ebc: number;
  srm: number;
  ph: number;
  attenuation_level: number;
  volume: object;
  boil_volume: object;
  method: object;
  ingredients: object;
  food_pairing: string[];
  brewers_tips: string;
  contributed_by: string;
}

export { BEERS_PER_PAGE, DEFAULT_PAGE, ROOT_ENDPOINT, INITIAL_ENDPOINT };
export type { IBeerDetails };
