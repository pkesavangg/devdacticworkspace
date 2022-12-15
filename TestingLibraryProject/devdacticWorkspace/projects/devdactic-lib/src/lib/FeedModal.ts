export type FeedTrigger = 'login';

export interface FeedItem {
  elementId: string;
  isUnread: boolean;
  messageTypeText: string;
  titleText: string;
  subtitleModalText: string;
  subtitleFeedText: string;
  titleImage: string;
  linkTarget?: string;
  linkText?: string;
  trigger?: FeedTrigger;
  expiresAt?: string;
}
export const TIMESTAMP = {
  oneDay: 24 * 60 * 60 * 1000,
  twoDays: 48 * 60 * 60 * 1000,
  oneHour: 60 * 60 * 1000,
  oneMinute: 60 * 1000,
  oneWeek: 7 * 24 * 60 * 60 * 1000
};
export enum FeedVariable {
  expiresAt = 'expiresAt'
}
export enum FeedActionType {
  trigger = 'trigger',
  read = 'read',
  click = 'click'
};
export interface FeedSetting {
  showPopupMessage: boolean;
  showNotificationBadge: boolean;
}
export const ASSETS_URL = {
  icon: {
    close: 'assets/img/close.svg',
    gg: 'assets/logos/gg_Black_Logo.svg',
    settings: 'assets/img/Settings-blue.svg',
  }
};
export const FEED_MODAL_TITLE_WORD_COUNT = 3;
export const NON_BREAKING_SPACE = '&nbsp;';
