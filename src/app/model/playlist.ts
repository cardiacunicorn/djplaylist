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

export interface Owner {
  id: string;
  display_name: string;
  uri: string;
  href: string;
  type: string;
}

export interface Track {
  id: string;
  basic: TrackBasicObject;
  advanced: TrackAdvancedObject;
}

export interface TrackBasicObject {
  id: string;
  name: string;
  duration_ms: number;
  popularity: number;
  preview_url: string;
  uri: string;
  href: string;
  artists: Artist[];
  album: Album;
}

export interface TrackAdvancedObject {
  id: string;
  acousticness: number;
  danceability: number;
  tempo: number;
  valence: number;
  speechiness: number;
  liveness: number;
  time_signature: number;
  loudness: number;
  key: number;
  energy: number;
  analysis_url: string;
  instrumentalness: number;
}

export interface Artist {
  id: string;
  name: string;
  uri: string;
  href: string;
}

export interface Album {
  id: string;
  name: string;
  href: string;
  uri: string;
  release_date: string;
}
