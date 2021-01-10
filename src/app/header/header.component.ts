import {Component} from "@angular/core";
import {DataStorageService} from "../services/data-storage.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  constructor(private dsService : DataStorageService){};

  onSaveData(){
    this.dsService.storeRecipes();
  }

  onFetchData(){
    this.dsService.fetchRecipes().subscribe();
  }
}
