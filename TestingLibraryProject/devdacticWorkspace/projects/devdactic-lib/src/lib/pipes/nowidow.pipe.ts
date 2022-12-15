import { Pipe, PipeTransform } from '@angular/core';
import { FEED_MODAL_TITLE_WORD_COUNT, NON_BREAKING_SPACE } from '../FeedModal';

@Pipe({
  name: 'nowidow'
})
export class NowidowPipe implements PipeTransform {

  transform(value: string): string {
    const textArray = value.split(' ');
    const textLength = (value.length) / 2;
    const lastTwoWordsCombinedLength = textArray.slice(textArray.length - 2).join(' ').length;
    if (textArray.length > FEED_MODAL_TITLE_WORD_COUNT && lastTwoWordsCombinedLength < textLength) {
      textArray[textArray.length - 2] += NON_BREAKING_SPACE + textArray[textArray.length - 1];
      textArray.pop();
      return textArray.join(' ');
    }
    return value;
  }

}
