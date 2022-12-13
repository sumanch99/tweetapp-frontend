import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { Tweet } from '../model/Tweets';
import { AuthService } from '../service/auth.service';
import { TweetService } from '../service/tweet.service';

@Component({
  selector: 'app-tweet-page',
  templateUrl: './tweet-page.component.html',
  styleUrls: ['./tweet-page.component.css']
})
export class TweetPageComponent implements OnInit {
  editTweetobj: any;
  userlist: any;
  tweetLikeList: any;
  displayEdit!: string;
  likeDisplay = "none";

  editATweet() {
    let t = {
      tweet: this.editTweetobj
    }
    this.tweetService.editTweet(t, this.username, this.id).pipe(first()).subscribe(res => {
      if (res.status == 201) {
        console.log(res);
        Swal.fire("Done", res.message, 'success');
        this.getAllTweets();
        this.onCloseHandled();
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

    console.log("this.tweetId:"+this.tweetId)
    console.log(this.tweetItems[this.tweetId].tweets)
    this.displayEdit = "block";
  }

  deleteTweet(tweetId: any) {
    Swal.fire({
      title: 'Do you want to save the changes?',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      customClass: {
        actions: 'my-actions',
        cancelButton: 'order-1 right-gap',
        confirmButton: 'order-2'
      }
    }).then((result) => {
      if (result.isConfirmed) {
        this.tweetService.deleteTweet(this.username, tweetId).pipe(first()).subscribe(res => {
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
        })
      } else if (result.isDenied) {
        Swal.fire('Changes are not saved', '', 'info')
      }
    })
    
  }

  clicked!: boolean;
  registerButtonText!: any;
  registerData: any;
  loading = false;
  error = false;
  user: string = '';
  username: any | "test";
  tweetId: number = 0;
  tweetItems: Tweet[] = [];
  tweet!: string;
  comment!: String
  tweetCommentList: any;
  id!: number;

  constructor(private tweetService: TweetService, private authService: AuthService) {
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

  getUsernames(user: any) {
    let uList: any[] = []
    this.authService.getAllUsersWithRegex(user).pipe(first()).subscribe(res => {
      if (res.status == 200) {
        console.log(res);
        let users = res.data;
        let i = 0;
        users.forEach((element: { username: any; }) => {
          console.log(element.username)
          uList[i] = element.username
          i++;
        });
        console.log(uList)
      }
      else {
        console.log(res)
        Swal.fire("Error", res.message);
      }
    })
    this.userlist = uList
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
        console.log(this.tweetItems);
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

  openLikeModal(tweetId: number) {
    //this.tweetId = tweetId - 1
    let index = this.tweetItems.findIndex(object => {
      return object.id === tweetId;
    });

    this.id = tweetId
    this.tweetId = index
    this.tweetLikeList = this.tweetItems[index].likedUsers
    console.log(this.tweetId)
    this.likeDisplay = "block";
  }

  onCloseLikeModalHandled() {
    this.likeDisplay = "none";
  }

}