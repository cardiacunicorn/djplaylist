import { Owner } from './owner';

export interface Playlist {
  id: number;
  name: string;
  owner: string;
  tracks: string;
}

export interface SpotifyPlaylist {
  id: string;
  name: string;
  description: string;
  public: boolean;
  collaborative: boolean;
  uri: string;
  href: string;
  type: string;
  owner: Owner;
  tracks: object;
  // images: object[];
}
