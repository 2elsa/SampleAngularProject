import { Pipe, PipeTransform } from "@angular/core";
import { CountryState, NamedModel } from "@services/flxwealthmanager.api.client";
import { Utils } from "@shared/utils";
@Pipe({ name: 'countryStateFormatter' })
export class CountryStateFormatterPipe implements PipeTransform {
    transform(value: { country?: NamedModel, state?: CountryState, city?: string }, ...args: any[]) {
        return Utils.formatCountryStateCity(value);
    }

}