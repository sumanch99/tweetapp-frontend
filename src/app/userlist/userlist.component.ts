import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { Tweet } from '../model/Tweets';
import { User } from '../model/User';
import { AuthService } from '../service/auth.service';
import { TweetService } from '../service/tweet.service';

@Component({
  selector: 'app-userlist',
  templateUrl: './userlist.component.html',
  styleUrls: ['./userlist.component.css']
})
export class UserlistComponent implements OnInit {

  error = false;
  username: any;
  user: string = '';
  users:User[]=[];
  userlist: any;

  constructor(private tweetService: TweetService,private authService:AuthService) {

  }

  display = "none";
  ngOnInit(): void {
    
    this.getAllUsers()
    
  }

  getusername() {
    this.username = localStorage.getItem('username')
  }

  getAllUsers(){
    this.authService.getAllUsers().pipe().subscribe(res=>{
      if(res.status==200){
        console.log(res)
        this.users=res.data
      }
    })
  }

  getUsernames(user: string) {
    let uList: any[] = []
    if(user.length==0){
      this.authService.getAllUsers().pipe().subscribe(res=>{
        if(res.status==200){
          console.log(res)
          this.users=res.data
        }
      })
    }else{
      this.authService.getAllUsersWithRegex(user).pipe().subscribe(res => {
        if (res.status == 200) {
          this.users=res.data
        }
        else {
          console.log(res)
          Swal.fire("Error", res.message);
        }
      })
    }
    
    
  }

  

}
