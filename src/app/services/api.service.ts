import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";
import { filter, map, tap } from "rxjs/operators";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class ApiService {
  public firstPage: string = "";
  public prevPage: string = "";
  public nextPage: string = "";
  public lastPage: string = "";
  apiURL: string = "http://127.0.0.1:5000";

  constructor(private http: HttpClient) {}

  public getArticles(
    url: string,
    filter = "",
    sortField = "publishedAt",
    sortOrder = "desc",
    pageNumber = 0,
    pageSize = 5
  ): Observable<any> {
    return this.http
      .get(
        `${this.apiURL}/news`,
        {
          params: new HttpParams()
            .set("url", url)
            .set("filter", filter)
            .set("sort", sortField)
            .set("sortOrder", sortOrder)
            .set("page", pageNumber.toString())
            .set("pageSize", pageSize.toString())
        }
      )
      .pipe(
        tap(res => {
          // const articlesJson: any[] = Array.of(res.json());
          // console.log(articlesJson);
          // return articlesJson;
          return res;
        })
      );
  }

  private parse_link_header(header) {
    if (header.length == 0) {
      return;
    }

    let parts = header.split(",");
    var links = {};
    parts.forEach(p => {
      let section = p.split(";");
      var url = section[0].replace(/<(.*)>/, "$1").trim();
      var name = section[1].replace(/rel="(.*)"/, "$1").trim();
      links[name] = url;
    });
    return links;
  }

  public retrieve_pagination_links(response) {
    const linkHeader = this.parse_link_header(response.headers.get("Link"));
    this.firstPage = linkHeader["first"];
    this.lastPage = linkHeader["last"];
    this.prevPage = linkHeader["prev"];
    this.nextPage = linkHeader["next"];
  }
}
