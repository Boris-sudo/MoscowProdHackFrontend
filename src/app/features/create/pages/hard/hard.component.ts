import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProfileApiService } from '../../../profile/services/profile-api.service';
import { CreateGroupType3Request } from '../../../../../generated';
import { Router } from '@angular/router';
import { GroupsApiService } from '../../../main/services/groups-api.service';

@Component({
  selector: 'app-hard',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    FormsModule
  ],
  templateUrl: './hard.component.html',
  styleUrl: './hard.component.css'
})
export default class HardComponent {
  group: CreateGroupType3Request = { title: '' }
  profile;

  constructor(
    private router: Router,
    private profileService: ProfileApiService,
    private groupService: GroupsApiService
  ) {
    this.profile = this.profileService.currentUser;
  }

  create() {
    this.groupService.createHardGroup(this.group).then(resp => {
      console.log(resp);
      const groupId = resp.id;
      this.router.navigate([`/home/group/${groupId}`])
    }).catch(error => { console.log(error); })
  }
}
