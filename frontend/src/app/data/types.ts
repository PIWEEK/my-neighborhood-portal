export interface Entity {
  id: number,
  name: string;
  imageUrl: string;
  description: string;
  email: string;
  web: string;
  networks: SocialNetwork[];
  categories: Category[];
}

export interface Category {
  id: number,
  slug: string;
  name: string;
  selected?: boolean;
}

export type NetworkType = 'blog' | 'twitter' | 'facebook' | 'instagram';

export interface SocialNetwork {
  id: number,
  isDefault: boolean;
  networkType: NetworkType;
  url: string;
  iconUrl: string;
  posts: SocialPost[];
}

export interface SocialPost {
  id: number,
  url: string;
  date: Date;
  imageUrl: string;
  text: string;
}

export interface WallItem {
  entity: Entity;
  network: SocialNetwork;
  post: SocialPost;
}

