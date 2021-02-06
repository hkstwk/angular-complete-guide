import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "reverse",
})
export class ReversePipe implements PipeTransform {
  transform(value: any): any {
    const reverseCharArray: string[] = [];
    for (let i = value.length - 1; i >= 0; i--) {
      reverseCharArray.push(value.charAt(i));
    }
    return reverseCharArray.join("");
  }
}
