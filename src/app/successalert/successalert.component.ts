import {Component} from "@angular/core";

@Component({
  selector: 'app-successalert',
  templateUrl: './successalert.component.html',
  styleUrls: ['./successalert.component.css']
})
export class SuccessAlertComponent {

  successAlert: string = 'This is my success alert';
  username: string = "Fill in your name here...";
  displayDetails: boolean = false;
  clickArray: Date[] = [];

  public clearInput() {
    this.username = "";
  }

  onToggleDisplayDetails() {
    this.displayDetails = !this.displayDetails;
    this.clickArray.push(new Date());
  }

}
