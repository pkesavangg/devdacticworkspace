import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { LibraryFeedService } from '../libraryFeedService.service';
import { ASSETS_URL, FeedActionType, FeedItem, FeedVariable } from '../FeedModal';
import { Browser } from '@capacitor/browser';

@Component({
  selector: 'dev-feed-modal-component',
  templateUrl: './feed-modal-component.component.html',
  styleUrls: ['./feed-modal-component.component.scss']
})
export class FeedModalComponentComponent implements OnInit {


  @Input() feedItem: FeedItem;
  feedBackgroundImage: string;
  assetsUrl = ASSETS_URL;
  readonly feedVariable = FeedVariable;
  constructor(
    private modalController: ModalController,
    private feedService: LibraryFeedService
  ) {
  }
  ngOnInit() {
    this.feedBackgroundImage = `url(${this.feedItem.titleImage})`;
    console.log(this.feedItem);
  }


  async close() {
    const modal = await this.modalController.getTop();
    if (modal) {
      modal.dismiss();
    }
  }
  async openFeedTargetLink() {
    const values = {
      feedItem: this.feedItem,
      actionType: FeedActionType.click,
    }
    this.feedService.sendUpdateFeed.next(values);
    if (!!this.feedItem.linkTarget) {
      await Browser.open({ url: this.feedItem.linkTarget });
    }
  }
}
