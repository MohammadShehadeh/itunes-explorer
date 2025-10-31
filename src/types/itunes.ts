export interface ITunesPodcastSearchResponse {
  resultCount: number;
  results: ITunesPodcastResult[];
}

export interface ITunesPodcastResult {
  wrapperType: string;
  kind: string;
  collectionId: number;
  trackId: number;
  artistId: number;
  artistName: string;
  collectionName: string;
  trackName: string;
  collectionCensoredName: string;
  trackCensoredName: string;
  artistViewUrl: string;
  collectionViewUrl: string;
  trackViewUrl: string;
  feedUrl: string;
  artworkUrl30: string;
  artworkUrl60: string;
  artworkUrl100: string;
  artworkUrl600: string;
  collectionPrice: number;
  collectionHdPrice?: number;
  trackPrice: number;
  releaseDate: string;
  collectionExplicitness: string;
  trackExplicitness: string;
  trackCount: number;
  trackTimeMillis?: number;
  country: string;
  currency: string;
  primaryGenreName: string;
  genres: string[];
  genreIds: string[];
  contentAdvisoryRating?: string;
}
