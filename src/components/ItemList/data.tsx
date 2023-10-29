const BEERS_PER_PAGE: number = 10;
const DEFAULT_PAGE: number = 1;
const ROOT_ENDPOINT: string = 'https://api.punkapi.com/v2/';
const INITIAL_ENDPOINT: string = `beers?page=${DEFAULT_PAGE}&per_page=${BEERS_PER_PAGE}`;
const BEER_NAME: string = '&beer_name=';
const EMPTY_ITEMS_ARRAY: IBeerDetails[] = [
  {
    id: 0,
    name: '',
    tagline: '',
    first_brewed: '',
    description: '',
    image_url: '',
    abv: 0,
    ibu: 0,
    target_fg: 0,
    target_og: 0,
    ebc: 0,
    srm: 0,
    ph: 0,
    attenuation_level: 0,
    volume: {},
    boil_volume: {},
    method: {},
    ingredients: {},
    food_pairing: [''],
    brewers_tips: '',
    contributed_by: '',
  },
];

export interface IBeerDetails {
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

export {
  BEERS_PER_PAGE,
  DEFAULT_PAGE,
  ROOT_ENDPOINT,
  INITIAL_ENDPOINT,
  EMPTY_ITEMS_ARRAY,
  BEER_NAME,
};
