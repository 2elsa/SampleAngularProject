import { Pipe } from "@angular/core";
import { PipeTransform } from "@angular/core";
import { DomSanitizer, SafeHtml } from "@angular/platform-browser";

@Pipe({ name: 'parseHtml' })
export class ParseHtmlPipe implements PipeTransform {
    constructor(private readonly sanitizer: DomSanitizer) { }

    transform(htmlText?: string | SafeHtml): SafeHtml {
        if (typeof htmlText === 'string') {

            return htmlText && this.sanitizer.bypassSecurityTrustHtml(htmlText) || '';
        }
        return htmlText as SafeHtml || '';
    }
}