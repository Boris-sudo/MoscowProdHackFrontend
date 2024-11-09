import { Component } from '@angular/core';
import { CreateGroupType1Request, GroupResponse } from '../../../../../generated';
import { GroupsApiService } from '../../services/groups-api.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-group',
  standalone: true,
  imports: [],
  templateUrl: './group.component.html',
  styleUrl: './group.component.css'
})
export default class GroupComponent {
  group!: GroupResponse;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private groupService: GroupsApiService
  ) {
    this.route.params.subscribe(params => {
      const groupId = params['groupId'];
      this.groupService.getGroupById(groupId)
        .then(resp => this.group = resp)
        .catch(error => { console.log(error); this.router.navigate(['/home/groups'])});
    });
  }
}
