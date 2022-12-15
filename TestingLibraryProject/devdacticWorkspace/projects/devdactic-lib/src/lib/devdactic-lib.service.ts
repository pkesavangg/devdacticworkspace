import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { LibConfigService, LibConfig } from './devdactic-lib.module';
import { FeedActionType, FeedItem } from './FeedModal';

@Injectable({
  providedIn: 'root'
})
export class DevdacticLibService {
  baseUrl = this.config.apiUrl;
  feedsUpdatedSubject: BehaviorSubject<FeedItem[]> = new BehaviorSubject<FeedItem[]>([]);
  sendUpdateFeed: BehaviorSubject<any> = new BehaviorSubject<any>({});
  refreshTrigger: BehaviorSubject<Boolean> = new BehaviorSubject<Boolean>(false);
  private readonly apiUrl: string = '/feed';
  private readonly tag = 'FeedService';
  private readonly feedInfoKey = 'feedInfo';
  private readonly feedLastTriggeredAtKey: string = 'feedLastTriggeredAt';
  accountId: any

  constructor(@Inject(LibConfigService) private config: LibConfig, private http: HttpClient) {
    console.log('My config: ', config);
  }

  getUnreadFeedCount() {
    const unreadFeeds = this.feedsUpdatedSubject.value.filter(feed => feed.isUnread === true);
    return unreadFeeds.length;
  }

  get feedInfoOfflineKey(): string {
    return this.feedInfoKey + '_' + this.accountId;
  }
  get feedLastTriggeredAt(): string {
    return this.feedLastTriggeredAtKey + '_' + this.accountId;
  }

}


