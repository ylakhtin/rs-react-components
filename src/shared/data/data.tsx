const SEARCH_DEFAULT: string = 'searchString';
const MAX_AMOUNT: number = 325; // Reviewer, keep in mind that there is no API endpoint to get the total number of beer types.
// That is why I hardcoded it here. You can check the API documentation here - https://punkapi.com/documentation/v2
const ENTER_MESSAGE = 'Please, set a page number and hit "Enter"';
const ROOT_ENDPOINT: string = 'https://api.punkapi.com/v2/';
const BEERS: string = 'beers?';
const PAGE_NUMBER: string = 'page=';
const PER_PAGE: string = '&per_page=';
const BEER_NAME: string = '&beer_name=';
const SINGLE_BEER: string = 'https://api.punkapi.com/v2/beers/';
const DEFAULT_PAGE_NUMBER = 1;
const DEFAULT_ITEMS_PER_PAGE = 4;
const ITEMS_PER_PAGE = 10;
const SEARCH_PLACEHOLDER_TEXT = 'Input search string here...';
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

export interface IGeneralContext {
  mainString: string;
  setMainString: React.Dispatch<React.SetStateAction<string>>;
  beerList: IBeerDetails[];
  setBeerList: React.Dispatch<React.SetStateAction<IBeerDetails[]>>;
}

export {
  EMPTY_ITEMS_ARRAY,
  ROOT_ENDPOINT,
  BEERS,
  PAGE_NUMBER,
  PER_PAGE,
  BEER_NAME,
  SINGLE_BEER,
  ENTER_MESSAGE,
  SEARCH_DEFAULT,
  MAX_AMOUNT,
  DEFAULT_PAGE_NUMBER,
  DEFAULT_ITEMS_PER_PAGE,
  ITEMS_PER_PAGE,
  SEARCH_PLACEHOLDER_TEXT,
};
