export class Article {
    _id: number;
    name: string;
    id: string;
    author: string;
    title: string;
    description: string;
    url: string;
    urlToImage: string;
    publishedAt: string;
    content: string;

    constructor(data) {
      this._id = data._id;
      this.name = data.sourceName;
      this.id = data.sourceId;
      this.publishedAt = data.publishedAt;
      this.author = data.author;
      this.title = data.title;
      this.description = data.description;
    }
}
