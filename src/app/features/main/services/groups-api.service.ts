import { Injectable } from '@angular/core';
import { ApiService } from '../../../core/services/api.service';
import { ProfileApiService } from '../../profile/services/profile-api.service';
import {
  CreateGroupResponse,
  CreateGroupType1Request,
  CreateGroupType2Request,
  CreateGroupType3Request, GroupResponse
} from '../../../../generated';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GroupsApiService {

  constructor(
    private api: ApiService,
    private profileService: ProfileApiService
  ) { }

  async createSameGroup(dto: CreateGroupType1Request): Promise<CreateGroupResponse | string> {
    try {
      const resp = await firstValueFrom(this.api.apiService.createGroupHandlerGroupCreateEqualPost(dto));
      console.log(resp);
      return resp;
    } catch (e: any) {
      console.log(e);
      return 'failed';
    }
  }

  async createHardGroup(dto: CreateGroupType3Request) {
    try {
      const resp = await firstValueFrom(this.api.apiService.createGroupHandlerGroupCreateSummaryPost(dto));
      console.log(resp);
      return resp;
    } catch (e: any) {
      console.log(e);
      return 'failed';
    }
  }

  async createDifferentGroup(dto: CreateGroupType2Request) {
    try {
      const resp = await firstValueFrom(this.api.apiService.createGroupHandlerGroupCreateCafePost(dto));
      console.log(resp);
      return resp;
    } catch (e: any) {
      console.log(e);
      return 'failed';
    }
  }

  async getAllGroups(): Promise<GroupResponse | string> {
    const profile = this.profileService.currentUser();
    if (profile === null) throw 'not Authorized';
    try {
      // const resp = await firstValueFrom(this.api.apiService.)
      return '';
    } catch (e: any) {
      console.log(e);
      return 'failed';
    }
  }
}
