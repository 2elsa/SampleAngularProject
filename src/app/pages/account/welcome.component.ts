import { Component, OnInit } from "@angular/core";
import { ImageSources } from "@shared/resource.utils";

@Component({
    selector: 'app-welcome',
    template: `
            <img src="{{imageSources.welcomeLogo}}" />
                <h1>Welcome!</h1>
                <p>Complete your profile demographics today</p>
                <ul>
                    <li>
                        <a [routerLink]="['signin']" class="button">Sign In</a>
                    </li>
                    <li *ngIf="showBecomeAMember">
                        <a [routerLink]="['/membership/signup']" class="button">Become a Member</a>
                    </li>
                </ul>
    
    `,
    styles: [
        `
         p{
            text-align: left;
            margin-left: 100px;
            padding-bottom: 15px;
         }   
        `
    ]
})
export class WelcomeComponent {
    imageSources = ImageSources;
    showBecomeAMember: boolean = false;
}