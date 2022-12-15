import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { FeedSetting } from '../FeedModal';
import { LibraryFeedService } from '../libraryFeedService.service';

@Component({
  selector: 'dev-feed-setting',
  templateUrl: './feed-setting.component.html',
  styleUrls: ['./feed-setting.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FeedSettingComponent implements OnInit {

  togglePopup = true;
  toggleBadges = true;

  constructor(private feedService: LibraryFeedService, private modalController: ModalController, private oCD: ChangeDetectorRef) { }

  async ngOnInit() {

    const feedInfo: FeedSetting = await this.feedService.getStoredFeedNotificationSetting();

    this.togglePopup = feedInfo.showPopupMessage;
    this.toggleBadges = feedInfo.showNotificationBadge;
    this.oCD.detectChanges()
    console.log(this.togglePopup, this.toggleBadges);
  }


  async close() {
    const topModel = await this.modalController.getTop();
    if (topModel) {
      topModel.dismiss();
    }
  }
  togglePopupValue(value: any) {
    this.togglePopup = value.detail.checked;
    this.storeToggleValue();
  }
  toggleNotificationBadgeValue(value: any) {
    this.toggleBadges = value.detail.checked;
    this.storeToggleValue();
  }
  async storeToggleValue() {
    const toggle: FeedSetting = {
      showPopupMessage: this.togglePopup,
      showNotificationBadge: this.toggleBadges
    };
    await this.feedService.storeFeedNotificationSetting(toggle);
  }

}
