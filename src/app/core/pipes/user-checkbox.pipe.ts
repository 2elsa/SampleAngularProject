import { Pipe, PipeTransform } from "@angular/core";
import { NamedModel } from "@services/flxwealthmanager.api.client";

@Pipe({name: 'user-checkbox'})
export class UserCheckboxPipe implements PipeTransform {
    transform(value: NamedModel[], matchingPropertyName: string, ...args: any[]) {
        
        
    }

}