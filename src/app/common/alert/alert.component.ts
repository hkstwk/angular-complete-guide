
import {Component, Input, Output, EventEmitter} from "@angular/core";

@Component({
  selector : 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css']
})
export class AlertComponent {

 @Input()  message : string;
 @Output() closeAlert = new EventEmitter<void>();

 onCloseAlert(){
   this.closeAlert.emit();
 }
}
