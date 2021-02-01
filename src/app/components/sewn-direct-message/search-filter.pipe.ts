import { ThreadListItem } from '../../../models/message';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'searchFilter'
})
export class SearchFilterPipe implements PipeTransform {

  transform(value: ThreadListItem[], searchKeyword: string): ThreadListItem[] {
    const keyword = searchKeyword.trim();
    if (keyword === '') {
      return value;
    } else {
      const lowerCaseKeyword = keyword.toLowerCase();
      return value.filter(thread => {
        const threadName = (thread?.computed_targetedUser?.computed_fullname || '').toLowerCase();
        return threadName.includes(lowerCaseKeyword);
      });
    }
  }

}
