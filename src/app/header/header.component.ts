import {Component, OnInit, OnDestroy} from "@angular/core";
import {DataStorageService} from "../services/data-storage.service";
import {AuthService} from "../auth/auth.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {

  private userSubscription : Subscription;
  isLoggedIn: boolean = false;

  constructor(private dsService : DataStorageService, private authService: AuthService){};

  ngOnInit(): void {
    this.userSubscription = this.authService.user.subscribe(
      (user) => {
        this.isLoggedIn = !!user;
      }
    )
  }

  onLogout(){
    this.authService.logout();
  }

  onSaveData(){
    this.dsService.storeRecipes();
  }

  onFetchData(){
    this.dsService.fetchRecipes().subscribe();
  }

  ngOnDestroy(): void {
    this.userSubscription.unsubscribe();
  }
}
