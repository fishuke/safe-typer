/// <reference types="chrome"/>
import { Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  isTypingHidden;
  isLoaded;

  async getData(): Promise<void> {
    await chrome.storage.sync.get(['hideTyping'], async result => {
      this.isTypingHidden = result.hideTyping;
      this.isLoaded = true;
    });
  }

  toggleHideTypingState(): void {
    chrome.storage.sync.set({hideTyping: !this.isTypingHidden});
  }

  ngOnInit(): void {
    this.getData();
    setTimeout(() => {
      this.getData();
    }, 100);
  }

}
