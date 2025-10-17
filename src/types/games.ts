export interface Game {
  id: string;
  name: string | {
    en?: string;
    'zh-cn'?: string;
    th?: string;
    vi?: string;
  };
  category: string;
  platform: string[];
  size: string;
  provider: string;
  rating: number;
  players: string;
  status: string;
  image?: string;
  icon?: string;
  images?: {
    main?: string;
    icon?: string;
    local_main?: string;
    local_icon?: string;
  };
  description: string | {
    en?: string;
    'zh-cn'?: string;
    th?: string;
    vi?: string;
  };
  features: string[];
  launchUrl: string;
  links?: {
    main?: string;
    demo?: string;
  };
  imageMetadata?: {
    id: string;
    language: string;
    source: string;
    format: string;
  };
  language?: string;
}

export interface GamesData {
  games: Game[];
}
