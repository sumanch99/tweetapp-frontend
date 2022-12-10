import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { baseUrl, environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TweetService {

  constructor(private http: HttpClient) { }

  getAllTweets(): Observable<any> {
    return this.http.get<any>(`${environment.getAllTweet}`);
  }

  postATweet(tweetobj: any, username: string): Observable<any> {
    return this.http.post<any>(`${environment.postATweet}${username}/add`, tweetobj);
  }

  postAComment(commentobj: any, username: string, tweetId: number): Observable<any> {
    return this.http.post<any>(`${environment.postATweet}${username}/reply/${tweetId}`, commentobj);
  }
  likeATweet(username: string, tweetId: number): Observable<any> {
    return this.http.put<any>(`${environment.postATweet}${username}/like/${tweetId}`, null);
  }
  getAllTweetOfAUser(usrname: any): Observable<any> {
    return this.http.get<any>(`${environment.getAllTweetOfUser}${usrname}`);
  }
  deleteTweet(username: string, tweetId: number): Observable<any> {
    return this.http.delete<any>(`${environment.deleteTweet}${username}/delete/${tweetId}`);
  }
  editTweet(tweetobj: any, username: string, tweetId: number): Observable<any> {
    return this.http.put<any>(`${environment.postATweet}${username}/update/${tweetId}`, tweetobj);
  }
}
