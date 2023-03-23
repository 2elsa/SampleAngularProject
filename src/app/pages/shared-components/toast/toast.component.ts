import { Component, OnDestroy, OnInit } from '@angular/core';

@Component({
  selector: 'app-toast',
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.scss']
})
export class ToastComponent implements OnInit, OnDestroy {

  ngOnInit(): void {
  }

  ngOnDestroy() {
    console.log('destroying toast component...');
  }

}
