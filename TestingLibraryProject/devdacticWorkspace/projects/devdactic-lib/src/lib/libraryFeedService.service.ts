import { Injectable } from '@angular/core';
import { ModalController, ModalOptions } from '@ionic/angular';
import { BehaviorSubject } from 'rxjs';
import { FeedModalComponentComponent } from './feed-modal-component/feed-modal-component.component';
import { FeedActionType, FeedItem, FeedSetting, TIMESTAMP } from './FeedModal';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class LibraryFeedService {
  feedsUpdatedSubject: BehaviorSubject<FeedItem[]> = new BehaviorSubject<FeedItem[]>([]);
  sendUpdateFeed: BehaviorSubject<any> = new BehaviorSubject<any>({});
  refreshTrigger: BehaviorSubject<Boolean> = new BehaviorSubject<Boolean>(false);
  feedNotificationChangedSubject: BehaviorSubject<void> = new BehaviorSubject(null);
  private readonly feedInfoKey = 'feedInfo';
  private readonly feedLastTriggeredAtKey: string = 'feedLastTriggeredAt';

  accountId;
  constructor(private kvStorageService: StorageService, private modalController: ModalController) {

  }
  accountIdInfo(accountId: String) {
    this.accountId = accountId;
  }

  get feedInfoOfflineKey(): string {
    return this.feedInfoKey + '_' + this.accountId;
  }
  get feedLastTriggeredAt(): string {
    return this.feedLastTriggeredAtKey + '_' + this.accountId;
  }

  getUnreadFeedCount() {
    const unreadFeeds = this.feedsUpdatedSubject.value.filter(feed => feed.isUnread === true);
    return unreadFeeds.length;
  }
  async checkStoredFeedNotification() {
    const getFeedData = await this.getStoredFeedNotificationSetting();
    if (getFeedData === null) {
      const feedSetting: FeedSetting = {
        showPopupMessage: true,
        showNotificationBadge: true
      };
      await this.storeFeedNotificationSetting(feedSetting);
    }
  }

  async storeFeedNotificationSetting(feedSetting: any) {
    const feedValue = JSON.stringify(feedSetting);
    await this.kvStorageService.setValue(this.feedInfoOfflineKey, feedValue);
    this.feedNotificationChangedSubject.next();
  }

  async getStoredFeedNotificationSetting() {
    const feedInfoObject = await this.kvStorageService.getValue(this.feedInfoOfflineKey);
    if (feedInfoObject?.value) {
      return JSON.parse(feedInfoObject.value);
    }
    return null;
  }

  async showFeedModalPopup(feedItem, triggerTime) {
    await this.kvStorageService.setValue(this.feedLastTriggeredAt, triggerTime.toString());
    const values = {
      feedItem: feedItem,
      actionType: FeedActionType.trigger,
    }
    this.sendUpdateFeed.next(values);

    this.alertModal(FeedModalComponentComponent, {
      feedItem
    }, true, true, 'feed-alert');
  }
  async showFeedModal(feedItem: FeedItem) {
    const currentTime = new Date().getTime();
    const feedLastTriggeredAt = await this.kvStorageService.getValue(this.feedLastTriggeredAt);
    if (!!feedLastTriggeredAt?.value) {
      const feedModalTriggerCoolDownTime = Number(feedLastTriggeredAt.value) + TIMESTAMP.oneWeek;
      if (feedModalTriggerCoolDownTime < currentTime) {
        await this.showFeedModalPopup(feedItem, currentTime);
        return true;
      }
      return false;
    }
    else {
      await this.showFeedModalPopup(feedItem, currentTime);
      return true;
    }
  }
  async checkFeedModalTrigger(): Promise<boolean> {
    const feedSetting: FeedSetting = await this.getStoredFeedNotificationSetting();
    if (feedSetting?.showPopupMessage) {
      const feedItem = this.feedsUpdatedSubject.value.find((feed) => feed.trigger === 'login');

      if (feedItem) {
        return await this.showFeedModal(feedItem);
      }
    }
    return false;
  }



  async alertModal(component: any, componentProps: { [key: string]: any } = null,
    backdropDismiss: boolean = true, swipeToClose: boolean = true, cssClass: string = 'alert-modal') {
    const modalOption = {
      component,
      componentProps,
      cssClass,
      swipeToClose,
      backdropDismiss
    };
    return this.showModal(modalOption);
  }
  async showModal(modalOptions: ModalOptions) {
    const modal = await this.modalController.create(
      {
        cssClass: '',
        backdropDismiss: true,
        swipeToClose: true,
        ...modalOptions
      }
    );
    await modal.present();
    return modal;
  }

}

