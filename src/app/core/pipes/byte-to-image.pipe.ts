import { Pipe, PipeTransform } from "@angular/core";
import { Observable, Observer } from "rxjs";

@Pipe({
    name: 'byte2imageAsync'
})
export class ByteToImagePipe implements PipeTransform {
    transform(value: Blob, ...args: any[]) {
        return new Observable<string | ArrayBuffer>((observer: Observer<string|ArrayBuffer>) => {
            const reader = new FileReader();
            reader.onload = e => observer.next(e.target?.result!!)
            reader.readAsDataURL(value)
        });
    }
}