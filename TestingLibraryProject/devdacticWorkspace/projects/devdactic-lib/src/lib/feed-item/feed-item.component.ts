import { Component, Input, OnInit } from '@angular/core';
import { FeedActionType, FeedItem } from '../FeedModal';
import { LibraryFeedService } from '../libraryFeedService.service';
import { Browser } from '@capacitor/browser';

@Component({
  selector: 'dev-feed-item',
  templateUrl: './feed-item.component.html',
  styleUrls: ['./feed-item.component.css']
})
export class FeedItemComponent implements OnInit {
  @Input() feedItem: FeedItem;
  backgroundImage: string;

  constructor(private feedService: LibraryFeedService) { }

  ngOnInit(): void {
    console.log(this.feedItem?.titleImage);
    this.backgroundImage = `url(${this.feedItem?.titleImage})`;
  }
  async openFeedLink(feedItem: FeedItem) {
    const values = {
      feedItem: feedItem,
      actionType: FeedActionType.click,
    }
    this.feedService.sendUpdateFeed.next(values);
    if (!!feedItem?.linkTarget) {
      await Browser.open({ url: feedItem.linkTarget });
    }
  }
}
