import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'groupsFilter',
  standalone: true
})
export class GroupsFilterPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }

}
