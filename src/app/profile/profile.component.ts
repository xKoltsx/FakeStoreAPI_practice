import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  constructor(private http: HttpClient) {}
  user: any = [];
  username: String = "";

  name: any = {
    firstName: "",
    lastName: ""
  };
  email: string = "";
  phone: string = "";
  city: String = "";
  isEditing: boolean = false;

  setUser() {
    this.username = this.user.username;
    if (this.user.name && this.user.name.firstname && this.user.name.lastname) {
      this.name.firstName = this.UpFirstLetter(this.user.name.firstname);
      this.name.lastName = this.UpFirstLetter(this.user.name.lastname);
    }
    this.email = this.user.email;
    this.phone = this.user.phone;
    if (this.user.address && this.user.address.city) {
      this.city = this.UpFirstLetter(this.user.address.city);
    }
  }

  UpFirstLetter(value: string): string {
    return value.charAt(0).toUpperCase() + value.slice(1);
  }




  ngOnInit() {
    this.getUser();
  }

  getUser() {
    const token = localStorage.getItem('token');

    if (token) {
      const decodedToken = this.decodeToken(token);
      const userId = decodedToken.sub;
      console.log("user id = " + userId);

      this.http.get<Object[]>('https://fakestoreapi.com/users/' + userId).subscribe(
        (data) => {
          this.user = data;
          console.log(this.user);
          this.setUser();
        },
        (error) => {
          console.log(error);
        }
      );
    } else {
      console.log('Error.');
    }
  }

  decodeToken(token: string) {
    const tokenParts = token.split('.');
    if (tokenParts.length === 3) {
      const payload = JSON.parse(atob(tokenParts[1]));
      return payload;
    }
    return null;
  }



  editProfile() {
    this.isEditing = true;
  }

  confirmProfile() {
    const userId = this.user.id;
    const updatedUser = {
      name: {
        firstname: this.name.firstName.toLowerCase(),
        lastname: this.name.lastName.toLowerCase()
      },
      email: this.email,
      phone: this.phone,
      address: {
        city: this.city.toLowerCase()
      }
    };

    this.http.put('https://fakestoreapi.com/users/' + userId, updatedUser).subscribe(
      (data) => {
        console.log('Profile updated successfully:', data);
        this.isEditing = false;
      },
      (error) => {
        console.log('Error updating profile:', error);
      }
    );
  }
}
