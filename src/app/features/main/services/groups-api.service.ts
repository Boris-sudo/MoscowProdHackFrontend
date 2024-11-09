import { Injectable } from '@angular/core';
import { ApiService } from '../../../core/services/api.service';
import { ProfileApiService } from '../../profile/services/profile-api.service';
import {
  CreateGroupType1Request,
  CreateGroupType2Request,
  CreateGroupType3Request,
  GroupResponse,
  ProductListResponse,
  ProductResponse
} from '../../../../generated';
import { firstValueFrom } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GroupsApiService {

  constructor(
    private httpClient: HttpClient,
    private api: ApiService,
    private profileService: ProfileApiService
  ) { }

  async createSameGroup(dto: CreateGroupType1Request): Promise<GroupResponse> {
    try {
      const resp = await firstValueFrom(this.api.apiService.handlerGroupCreateEqualPost(dto));
      console.log(resp);
      return resp;
    } catch (e: any) {
      console.log(e);
      throw 'failed';
    }
  }

  async createHardGroup(dto: CreateGroupType3Request): Promise<GroupResponse> {
    try {
      const resp = await firstValueFrom(this.api.apiService.handlerGroupCreateSummaryPost(dto));
      console.log(resp);
      return resp;
    } catch (e: any) {
      console.log(e);
      throw 'failed';
    }
  }

  async createDifferentGroup(dto: CreateGroupType2Request): Promise<GroupResponse> {
    try {
      const resp = await firstValueFrom(this.api.apiService.handlerGroupCreateNonequalPost(dto));
      console.log(resp);
      return resp;
    } catch (e: any) {
      console.log(e);
      throw 'failed';
    }
  }

  async getAllGroups(): Promise<GroupResponse[]> {
    const profile = this.profileService.currentUser();
    if (profile === null) throw 'not Authorized';
    try {
      const resp =  await firstValueFrom(this.api.apiService.handlerGroupMyGet());
      return resp.groups;
    } catch (e: any) {
      console.log(e);
      throw 'failed';
    }
  }

  async getGroupById(id: number): Promise<GroupResponse> {
    const profile = this.profileService.currentUser();
    if (profile === null) throw 'not Authorized';
    try {
      return await firstValueFrom(this.api.apiService.handlerGroupGetGet(id));
    } catch (e: any) {
      console.log(e);
      throw 'failed';
    }
  }

  async getProductsFromQR(dto: FormData): Promise<ProductResponse[]> {
    try {
      const url = '/bill/scanqr';
      // @ts-ignore
      const res: ProductListResponse = await firstValueFrom(this.httpClient.post(environment.apiBaseUrl + url, dto));
      return res.products as ProductResponse[];
    } catch (e: any) {
      console.log(e);
      throw 'failed';
    }
  }
}
