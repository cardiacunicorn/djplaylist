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
  images: object[];
}

export interface Track {
  id: string;
  basic: object;
  advanced: object;
}

export interface Owner {
  id: string;
  display_name: string;
  uri: string;
  href: string;
  type: string;
}
