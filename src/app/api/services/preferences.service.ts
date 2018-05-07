/* tslint:disable */
import { Injectable } from '@angular/core';
import {
  HttpClient, HttpRequest, HttpResponse,
  HttpHeaders, HttpParams } from '@angular/common/http';
import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators/map';
import { filter } from 'rxjs/operators/filter';

import { PreferenceOwner } from '../models/preference-owner';
import { Profile } from '../models/profile';
import { ProfileVersions } from '../models/profile-versions';

/**
 * Preference Management including instnaces of types and profiles
 */
@Injectable()
class PreferencesService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Returns a single owner
   * @param id ID of type to return
   * @return successful operation
   */
  getOwnerResponse(id: string): Observable<HttpResponse<PreferenceOwner>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/owner/${id}`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      filter(_r => _r instanceof HttpResponse),
      map(_r => {
        let _resp = _r as HttpResponse<any>;
        let _body: PreferenceOwner = null;
        _body = _resp.body as PreferenceOwner;
        return _resp.clone({body: _body}) as HttpResponse<PreferenceOwner>;
      })
    );
  }

  /**
   * Returns a single owner
   * @param id ID of type to return
   * @return successful operation
   */
  getOwner(id: string): Observable<PreferenceOwner> {
    return this.getOwnerResponse(id).pipe(
      map(_r => _r.body)
    );
  }

  /**
   * @param params The `PreferencesService.UpdateOwnerParams` containing the following parameters:
   *
   * - `id`: ID of type to return
   *
   * - `body`: Owner needs to be updated
   */
  updateOwnerResponse(params: PreferencesService.UpdateOwnerParams): Observable<HttpResponse<void>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    __body = params.body;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/owner/${params.id}`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'text'
      });

    return this.http.request<any>(req).pipe(
      filter(_r => _r instanceof HttpResponse),
      map(_r => {
        let _resp = _r as HttpResponse<any>;
        let _body: void = null;

        return _resp.clone({body: _body}) as HttpResponse<void>;
      })
    );
  }

  /**
   * @param params The `PreferencesService.UpdateOwnerParams` containing the following parameters:
   *
   * - `id`: ID of type to return
   *
   * - `body`: Owner needs to be updated
   */
  updateOwner(params: PreferencesService.UpdateOwnerParams): Observable<void> {
    return this.updateOwnerResponse(params).pipe(
      map(_r => _r.body)
    );
  }

  /**
   * @param id Type id to delete
   */
  deleteOwnerResponse(id: string): Observable<HttpResponse<void>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      'DELETE',
      this.rootUrl + `/owner/${id}`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'text'
      });

    return this.http.request<any>(req).pipe(
      filter(_r => _r instanceof HttpResponse),
      map(_r => {
        let _resp = _r as HttpResponse<any>;
        let _body: void = null;

        return _resp.clone({body: _body}) as HttpResponse<void>;
      })
    );
  }

  /**
   * @param id Type id to delete
   */
  deleteOwner(id: string): Observable<void> {
    return this.deleteOwnerResponse(id).pipe(
      map(_r => _r.body)
    );
  }

  /**
   * Returns a single owner
   * @param id ID of type to return
   * @return successful operation
   */
  getProfilesResponse(id: Array<string>): Observable<HttpResponse<Array<Profile>>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    (id || []).forEach((val, index) => {if (val != null) __params = __params.append('id', val.toString())});
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/profiles`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      filter(_r => _r instanceof HttpResponse),
      map(_r => {
        let _resp = _r as HttpResponse<any>;
        let _body: Array<Profile> = null;
        _body = _resp.body as Array<Profile>;
        return _resp.clone({body: _body}) as HttpResponse<Array<Profile>>;
      })
    );
  }

  /**
   * Returns a single owner
   * @param id ID of type to return
   * @return successful operation
   */
  getProfiles(id: Array<string>): Observable<Array<Profile>> {
    return this.getProfilesResponse(id).pipe(
      map(_r => _r.body)
    );
  }

  /**
   * Returns a single owner
   * @param params The `PreferencesService.GetProfileParams` containing the following parameters:
   *
   * - `id`: ID of type to return
   *
   * - `version`: ID of type to return
   *
   * @return successful operation
   */
  getProfileResponse(params: PreferencesService.GetProfileParams): Observable<HttpResponse<Profile>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    if (params.version != null) __params = __params.set('version', params.version.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/profile/${params.id}`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      filter(_r => _r instanceof HttpResponse),
      map(_r => {
        let _resp = _r as HttpResponse<any>;
        let _body: Profile = null;
        _body = _resp.body as Profile;
        return _resp.clone({body: _body}) as HttpResponse<Profile>;
      })
    );
  }

  /**
   * Returns a single owner
   * @param params The `PreferencesService.GetProfileParams` containing the following parameters:
   *
   * - `id`: ID of type to return
   *
   * - `version`: ID of type to return
   *
   * @return successful operation
   */
  getProfile(params: PreferencesService.GetProfileParams): Observable<Profile> {
    return this.getProfileResponse(params).pipe(
      map(_r => _r.body)
    );
  }

  /**
   * @param params The `PreferencesService.UpdateProfileParams` containing the following parameters:
   *
   * - `id`: ID of type to return
   *
   * - `body`: Owner needs to be updated
   */
  updateProfileResponse(params: PreferencesService.UpdateProfileParams): Observable<HttpResponse<void>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    __body = params.body;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/profile/${params.id}`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'text'
      });

    return this.http.request<any>(req).pipe(
      filter(_r => _r instanceof HttpResponse),
      map(_r => {
        let _resp = _r as HttpResponse<any>;
        let _body: void = null;

        return _resp.clone({body: _body}) as HttpResponse<void>;
      })
    );
  }

  /**
   * @param params The `PreferencesService.UpdateProfileParams` containing the following parameters:
   *
   * - `id`: ID of type to return
   *
   * - `body`: Owner needs to be updated
   */
  updateProfile(params: PreferencesService.UpdateProfileParams): Observable<void> {
    return this.updateProfileResponse(params).pipe(
      map(_r => _r.body)
    );
  }

  /**
   * @param id Type id to delete
   */
  deleteProfileResponse(id: string): Observable<HttpResponse<void>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      'DELETE',
      this.rootUrl + `/profile/${id}`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'text'
      });

    return this.http.request<any>(req).pipe(
      filter(_r => _r instanceof HttpResponse),
      map(_r => {
        let _resp = _r as HttpResponse<any>;
        let _body: void = null;

        return _resp.clone({body: _body}) as HttpResponse<void>;
      })
    );
  }

  /**
   * @param id Type id to delete
   */
  deleteProfile(id: string): Observable<void> {
    return this.deleteProfileResponse(id).pipe(
      map(_r => _r.body)
    );
  }

  /**
   * Returns a list of all profile versions
   * @param id ID of type to return
   * @return successful operation
   */
  getProfileVersionsResponse(id: string): Observable<HttpResponse<ProfileVersions>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/profile/${id}/version`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      filter(_r => _r instanceof HttpResponse),
      map(_r => {
        let _resp = _r as HttpResponse<any>;
        let _body: ProfileVersions = null;
        _body = _resp.body as ProfileVersions;
        return _resp.clone({body: _body}) as HttpResponse<ProfileVersions>;
      })
    );
  }

  /**
   * Returns a list of all profile versions
   * @param id ID of type to return
   * @return successful operation
   */
  getProfileVersions(id: string): Observable<ProfileVersions> {
    return this.getProfileVersionsResponse(id).pipe(
      map(_r => _r.body)
    );
  }

  /**
   * Returns a single owner
   * @return successful operation
   */
  getMyActiveProfileResponse(): Observable<HttpResponse<Profile>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/my`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      filter(_r => _r instanceof HttpResponse),
      map(_r => {
        let _resp = _r as HttpResponse<any>;
        let _body: Profile = null;
        _body = _resp.body as Profile;
        return _resp.clone({body: _body}) as HttpResponse<Profile>;
      })
    );
  }

  /**
   * Returns a single owner
   * @return successful operation
   */
  getMyActiveProfile(): Observable<Profile> {
    return this.getMyActiveProfileResponse().pipe(
      map(_r => _r.body)
    );
  }
}

module PreferencesService {

  /**
   * Parameters for updateOwner
   */
  export interface UpdateOwnerParams {

    /**
     * ID of type to return
     */
    id: string;

    /**
     * Owner needs to be updated
     */
    body: PreferenceOwner;
  }

  /**
   * Parameters for getProfile
   */
  export interface GetProfileParams {

    /**
     * ID of type to return
     */
    id: string;

    /**
     * ID of type to return
     */
    version?: number;
  }

  /**
   * Parameters for updateProfile
   */
  export interface UpdateProfileParams {

    /**
     * ID of type to return
     */
    id: string;

    /**
     * Owner needs to be updated
     */
    body: Profile;
  }
}

export { PreferencesService }