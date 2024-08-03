export class LastFmAlbum {
  constructor(
    public title: string,
    public imageUrl: string,
    public releaseDate: string,
    public tracks: [],
    public url: string,
  ) {
    this.title = title;
    this.imageUrl = imageUrl;
    this.releaseDate = releaseDate;
    this.tracks = tracks;
    this.url = url;
  }
}