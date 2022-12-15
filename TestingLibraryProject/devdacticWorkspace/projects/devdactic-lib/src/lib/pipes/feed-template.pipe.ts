import { Pipe, PipeTransform } from '@angular/core';
import { FeedItem, TIMESTAMP } from '../FeedModal';

@Pipe({
  name: 'feedTemplate',
})
export class FeedTemplatePipe implements PipeTransform {
  appStrings = {
    minute: 'a minute',
    minutes: 'minutes',
    hours: 'hours',
    days: 'days'
  };
  transform(inputString: string, feedItem: FeedItem) {
    let variableName = '';
    let transformedText = '';
    const matchedVariableNames = inputString?.match('{{(.*)}}');
    if (!!matchedVariableNames) {
      variableName = matchedVariableNames[1];
    }
    if (!!variableName && feedItem?.hasOwnProperty(variableName) && !!feedItem[variableName]) {
      transformedText = this.transformDateToText(Date.parse(feedItem[variableName]));
    }
    return inputString?.replace(`{{${variableName}}}`, transformedText);
  }
  private transformDateToText(date: number): string {
    const compareTime = date - Date.now();
    if (compareTime > 0) {
      if (compareTime <= TIMESTAMP.oneMinute) {
        return this.appStrings.minute;
      }
      else if (compareTime < TIMESTAMP.oneHour) {
        const expiresInMinutes = compareTime / TIMESTAMP.oneMinute;
        return `${Math.floor(expiresInMinutes)} ${this.appStrings.minutes}`;
      }
      else if (compareTime < TIMESTAMP.twoDays) {
        const expiresInHours = compareTime / TIMESTAMP.oneHour;
        return `${Math.floor(expiresInHours)} ${this.appStrings.hours}`;
      }
      else {
        const expiresInDays = compareTime / TIMESTAMP.oneDay;
        return `${Math.floor(expiresInDays)} ${this.appStrings.days} `;
      }
    }
    else {
      return '';
    }
  }
}

