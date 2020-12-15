export interface Entity {
  name: string;
  imageUrl: string;
  description: string;
  email: string;
  socialNetworks: SocialNetwork[];
}

export type NetworkType = 'blog' | 'twitter' | 'facebook' | 'instagram';

export interface SocialNetwork {
  isDefault: boolean;
  networkType: NetworkType;
  url: string;
  iconUrl: string;
  posts: SocialPost[];
}

export interface SocialPost {
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

