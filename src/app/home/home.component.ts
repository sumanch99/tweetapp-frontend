import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { Tweet } from '../model/Tweets';
import { TweetService } from '../service/tweet.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  clicked!: boolean;
  registerButtonText!: any;
  registerData: any;
  loading = false;
  error = false;
  username: any;
  tweetId: number = 0;
  tweetItems: Tweet[] = [{
    commentsList: [
      {
        comment: "comment1",
        date: "2022-12-05T19:10:29.000+00:00",
        id: 12,
        tweetId: 9,
        username: "xyz"
      }
    ],
    date: Date,
    id: "any",
    likedUsers: [],
    tweets: "string",
    userName: "string"
  }];
  tweet!: string;
  comment!: String
  tweetCommentList: any;
  id!: number;

  constructor(private tweetService: TweetService) {

  }
  postAcomment() {
    let commentobj = {
      comment: this.comment
    }
    this.tweetService.postAComment(commentobj, this.username, this.id).pipe(first()).subscribe(res => {
      if (res.status == 200) {
        console.log(res);
        Swal.fire("Done", res.message, 'success');
        this.getAllTweets();
        this.onCloseHandled();
      }
      else {
        console.log(res)
        Swal.fire("Error", res.message);
      }
    })
  }

  likeATweet(id: any) {
    console.log(id)
    this.tweetService.likeATweet(this.username, id).pipe(first()).subscribe(res => {
      if (res.status == 200) {
        console.log(res);
        Swal.fire("Done", res.message, 'success');
        this.getAllTweets();
      }
      else {
        console.log(res)
        Swal.fire("Error", res.message);
      }
    })
  }

  tweetNow() {
    console.log("Posting .....")
    let tweetobj = {
      tweet: this.tweet
    }
    this.tweetService.postATweet(tweetobj, this.username).pipe(first()).subscribe(res => {
      if (res.status == 200) {
        console.log(res);
        Swal.fire("Done", res.message, 'success');
        this.getAllTweets();
      }
      else {
        console.log(res)
        Swal.fire("Error", res.message);
      }
    })
  }

  display = "none";
  ngOnInit(): void {
    this.getAllTweets()
    this.getusername()
  }

  getusername() {
    this.username = localStorage.getItem('username')
  }

  getAllTweets() {
    this.tweetService.getAllTweets().pipe(first()).subscribe(res => {
      if (res.status == 200) {
        // console.log(res);
        this.tweetItems = res.data;
      }
      else {
        console.log(res)
        Swal.fire("Error", res.message);
      }
    })
  }

  openModal(tweetId: number) {
    //this.tweetId = tweetId - 1
    let index = this.tweetItems.findIndex(object => {
      return object.id === tweetId;
    });

    this.id = tweetId
    this.tweetId = index
    this.tweetCommentList = this.tweetItems[index].commentsList
    console.log(this.tweetId)
    this.display = "block";
  }
  onCloseHandled() {
    this.display = "none";
  }

  submit(f: any) {
    this.clicked = true;
    console.log(f.value)
    this.registerButtonText = "Registering ...";
    this.registerData = f.value
    // this.authenticationService.register(this.registerData)
    //   .pipe(first())
    //   .subscribe(
    //     res=>{
    //       this.clicked = false;
    //       this.registerButtonText="Register";
    //       if(res.status==200){
    //         Swal.fire("Done",res.message, 'success');
    //       }
    //       else{
    //         Swal.fire("Done",res.message, 'error');
    //       }
    //       console.log(res)
    //     },
    //     error=>{
    //       this.clicked = false;
    //       this.registerButtonText="Register";
    //       console.log(error)
    //       Swal.fire("Done",error, 'error');
    //     }
    //   )
    //window.location.reload();
  }



}
