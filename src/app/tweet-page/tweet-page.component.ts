import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { Tweet } from '../model/Tweets';
import { TweetService } from '../service/tweet.service';

@Component({
  selector: 'app-tweet-page',
  templateUrl: './tweet-page.component.html',
  styleUrls: ['./tweet-page.component.css']
})
export class TweetPageComponent implements OnInit {
  editTweetobj: any;
  editATweet() {
    let t = {
      tweet: this.editTweetobj
    }
    this.tweetService.editTweet(t, this.username, this.id).pipe(first()).subscribe(res => {
      if (res.status == 200) {
        console.log(res);
        Swal.fire("Done", res.message, 'success');
        this.getAllTweets();
        this.onCloseHandledEdit();
      }
      else {
        console.log(res)
        Swal.fire("Error", res.message);
      }
    })
  }
  onCloseHandledEdit() {
    this.displayEdit = "none";
  }
  displayEdit!: string;

  editTweet(tweetId: any) {
    this.openEditModal(tweetId)
  }

  openEditModal(tweetId: number) {
    //this.tweetId = tweetId - 1
    let index = this.tweetItems.findIndex(object => {
      return object.id === tweetId;
    });

    this.id = tweetId
    this.tweetId = index

    console.log(this.tweetId)
    this.displayEdit = "block";
  }

  deleteTweet(tweetId: any) {

    this.tweetService.deleteTweet(this.username, tweetId).pipe(first()).subscribe(res => {
      Swal.fire({
        title: 'Do you want to save the changes?',
        showDenyButton: true,
        showCancelButton: true,
        confirmButtonText: 'Yes',
        denyButtonText: 'No',
        customClass: {
          actions: 'my-actions',
          cancelButton: 'order-1 right-gap',
          confirmButton: 'order-2',
          denyButton: 'order-3',
        }
      }).then((result) => {
        if (result.isConfirmed) {
          if (res.status == 200) {
            console.log(res);
            Swal.fire("Deleted", res.message, 'success');
            this.getAllTweets();
            this.onCloseHandled();
          }
          else {
            console.log(res)
            Swal.fire("Error", res.message);
          }
        } else if (result.isDenied) {
          Swal.fire('Changes are not saved', '', 'info')
        }
      })

    })
  }

  clicked!: boolean;
  registerButtonText!: any;
  registerData: any;
  loading = false;
  error = false;
  username: any | "test";
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
    this.getusername()
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
    this.tweetService.getAllTweetOfAUser(this.username).pipe(first()).subscribe(res => {
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

  // submit(f: any) {
  //   this.clicked = true;
  //   console.log(f.value)
  //   this.registerButtonText = "Registering ...";
  //   this.registerData = f.value
  //   // this.authenticationService.register(this.registerData)
  //   //   .pipe(first())
  //   //   .subscribe(
  //   //     res=>{
  //   //       this.clicked = false;
  //   //       this.registerButtonText="Register";
  //   //       if(res.status==200){
  //   //         Swal.fire("Done",res.message, 'success');
  //   //       }
  //   //       else{
  //   //         Swal.fire("Done",res.message, 'error');
  //   //       }
  //   //       console.log(res)
  //   //     },
  //   //     error=>{
  //   //       this.clicked = false;
  //   //       this.registerButtonText="Register";
  //   //       console.log(error)
  //   //       Swal.fire("Done",error, 'error');
  //   //     }
  //   //   )
  //   //window.location.reload();
  // }



}
