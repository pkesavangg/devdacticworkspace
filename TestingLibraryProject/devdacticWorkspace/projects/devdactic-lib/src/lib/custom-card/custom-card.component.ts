import { Component, OnInit, } from '@angular/core';
import { IonRouterOutlet, ModalController } from '@ionic/angular';
import { FeedSettingComponent } from '../feed-setting/feed-setting.component';
import { FeedActionType, FeedItem } from '../FeedModal';
import { LibraryFeedService } from '../libraryFeedService.service';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
@Component({
  selector: 'dev-custom-card',
  templateUrl: './custom-card.component.html',
  styleUrls: ['./custom-card.component.css']
})
export class CustomCardComponent implements OnInit {
  feeds: FeedItem[] = [];
  private unSubscribe = new Subject();
  constructor(private feedService: LibraryFeedService, private modalController: ModalController,
    private routerOutlet: IonRouterOutlet,) { }


  ngOnInit(): void {
    //this.networkStatus = await Network.getStatus();
    this.feedService.feedsUpdatedSubject.pipe(takeUntil(this.unSubscribe)).subscribe((data: FeedItem[]) => {
      this.feeds = data;
      this.updateFeedsReadStatus();
    });
  }




  updateFeedsReadStatus() {
    const unreadFeeds = this.feeds.filter(feed => feed.isUnread === true);
    for (const unReadItems of unreadFeeds) {
      const values = {
        feedItem: unReadItems,
        actionType: FeedActionType.read,
      }
      this.feedService.sendUpdateFeed.next(values);
    }
  }
  async openFeedSettings() {
    const modal = await this.modalController.create({
      component: FeedSettingComponent,
      cssClass: 'weightless-page',
      swipeToClose: true,
      backdropDismiss: false,
      presentingElement: this.routerOutlet.nativeEl,
    });
    return await modal.present();
  }



}
