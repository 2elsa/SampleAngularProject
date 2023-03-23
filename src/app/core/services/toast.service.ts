import { SafeHtml } from "@angular/platform-browser";
import { EventEmitter, Injectable } from "@angular/core";

@Injectable()
export class ToastService {
    onToast = new EventEmitter<{ message: string | SafeHtml }>();

    notify(message: string) {
        this.onToast.next({ message });
    }
}