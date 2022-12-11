import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
import { Tweet } from '../model/Tweets';
import { AuthService } from '../service/auth.service';
import { TweetService } from '../service/tweet.service';

@Component({
  selector: 'app-userdetails',
  templateUrl: './userdetails.component.html',
  styleUrls: ['./userdetails.component.css']
})
export class UserdetailsComponent implements OnInit {
  userlist: any;
  clicked!: boolean;
  registerButtonText!: any;
  selectedUser!: String;
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

  constructor(private tweetService: TweetService, private authService: AuthService, private route: ActivatedRoute) {
    this.getusername()
  }
  postAcomment() {
    let commentobj = {
      comment: this.comment
    }
    this.tweetService.postAComment(commentobj, this.username, this.id).pipe().subscribe(res => {
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
    this.tweetService.likeATweet(this.username, id).pipe().subscribe(res => {
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
    this.authService.getAllUsersWithRegex(user).pipe().subscribe(res => {
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

  display = "none";
  
  ngOnInit(): void {
    
    this.route.queryParams
      .subscribe(params => {
        console.log(params);
        this.selectedUser =  params.username;
        
      }
    );
    this.getAllTweets()
    this.getusername()
  }

  getusername() {
    this.username = localStorage.getItem('username')
  }

  getAllTweets() {
    this.tweetService.getAllTweetOfAUser(this.selectedUser).pipe().subscribe(res => {
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

}
