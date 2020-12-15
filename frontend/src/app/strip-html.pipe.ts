import { Pipe, PipeTransform } from '@angular/core';
import * as striptags from 'striptags';

/*
 * Strips HTML tags.
 * Takes an input parameter HTML.
 * Usage:
 *   content | striphtml
 * Example:
 *   <p [innerHTML]="content | striphtml"></p>
*/
@Pipe({
    name: 'striphtml'
})
export class StripHtmlPipe implements PipeTransform {
  transform(value: string): string {
    if ((value === undefined) || (value === null) || (value === '')) {
      return '';
    } else {
      let newValue = value;

      newValue = newValue.replace(/&nbsp;/g, ' ');
      newValue = striptags(newValue);
      newValue = (newValue.length > 500)
                  ? newValue.slice(0, 500).concat("...")
                  : newValue;

      return newValue;
    }
  }
}
