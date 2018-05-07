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

import { Config } from '../models/config';
import { PreferenceDefinitionArray } from '../models/preference-definition-array';
import { PreferenceDefinition } from '../models/preference-definition';
import { OwnerTypeArray } from '../models/owner-type-array';
import { OwnerType } from '../models/owner-type';

/**
 * Preferences Definition Management
 */
@Injectable()
class ConfigurationService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * @return Success
   */
  getConfigResponse(): Observable<HttpResponse<Config>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/configuration`,
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
        let _body: Config = null;
        _body = _resp.body as Config;
        return _resp.clone({body: _body}) as HttpResponse<Config>;
      })
    );
  }

  /**
   * @return Success
   */
  getConfig(): Observable<Config> {
    return this.getConfigResponse().pipe(
      map(_r => _r.body)
    );
  }

  /**
   * @return Success
   */
  getDefinitionsResponse(): Observable<HttpResponse<PreferenceDefinitionArray>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/definition`,
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
        let _body: PreferenceDefinitionArray = null;

        return _resp.clone({body: _body}) as HttpResponse<PreferenceDefinitionArray>;
      })
    );
  }

  /**
   * @return Success
   */
  getDefinitions(): Observable<PreferenceDefinitionArray> {
    return this.getDefinitionsResponse().pipe(
      map(_r => _r.body)
    );
  }

  /**
   * @param body Preference Definition that needs to be added
   * @return Success
   */
  addDefinitionResponse(body: PreferenceDefinition): Observable<HttpResponse<PreferenceDefinition>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = body;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/definition`,
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
        let _body: PreferenceDefinition = null;
        _body = _resp.body as PreferenceDefinition;
        return _resp.clone({body: _body}) as HttpResponse<PreferenceDefinition>;
      })
    );
  }

  /**
   * @param body Preference Definition that needs to be added
   * @return Success
   */
  addDefinition(body: PreferenceDefinition): Observable<PreferenceDefinition> {
    return this.addDefinitionResponse(body).pipe(
      map(_r => _r.body)
    );
  }

  /**
   * Returns a single definition
   * @param id ID of definition to return
   * @return successful operation
   */
  getDefinitionResponse(id: string): Observable<HttpResponse<PreferenceDefinition>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/definition/${id}`,
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
        let _body: PreferenceDefinition = null;
        _body = _resp.body as PreferenceDefinition;
        return _resp.clone({body: _body}) as HttpResponse<PreferenceDefinition>;
      })
    );
  }

  /**
   * Returns a single definition
   * @param id ID of definition to return
   * @return successful operation
   */
  getDefinition(id: string): Observable<PreferenceDefinition> {
    return this.getDefinitionResponse(id).pipe(
      map(_r => _r.body)
    );
  }

  /**
   * @param params The `ConfigurationService.UpdateDefinitionParams` containing the following parameters:
   *
   * - `id`: ID of definition to return
   *
   * - `body`: Preference Definition needs to be updated
   *
   * @return Success
   */
  updateDefinitionResponse(params: ConfigurationService.UpdateDefinitionParams): Observable<HttpResponse<PreferenceDefinition>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    __body = params.body;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/definition/${params.id}`,
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
        let _body: PreferenceDefinition = null;
        _body = _resp.body as PreferenceDefinition;
        return _resp.clone({body: _body}) as HttpResponse<PreferenceDefinition>;
      })
    );
  }

  /**
   * @param params The `ConfigurationService.UpdateDefinitionParams` containing the following parameters:
   *
   * - `id`: ID of definition to return
   *
   * - `body`: Preference Definition needs to be updated
   *
   * @return Success
   */
  updateDefinition(params: ConfigurationService.UpdateDefinitionParams): Observable<PreferenceDefinition> {
    return this.updateDefinitionResponse(params).pipe(
      map(_r => _r.body)
    );
  }

  /**
   * @param id Definition id to delete
   */
  deleteDefinitionResponse(id: string): Observable<HttpResponse<void>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      'DELETE',
      this.rootUrl + `/definition/${id}`,
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
   * @param id Definition id to delete
   */
  deleteDefinition(id: string): Observable<void> {
    return this.deleteDefinitionResponse(id).pipe(
      map(_r => _r.body)
    );
  }

  /**
   * @return Success
   */
  getOwnerTypesResponse(): Observable<HttpResponse<OwnerTypeArray>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/type`,
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
        let _body: OwnerTypeArray = null;

        return _resp.clone({body: _body}) as HttpResponse<OwnerTypeArray>;
      })
    );
  }

  /**
   * @return Success
   */
  getOwnerTypes(): Observable<OwnerTypeArray> {
    return this.getOwnerTypesResponse().pipe(
      map(_r => _r.body)
    );
  }

  /**
   * @param body Type that needs to be added
   */
  addOwnerTypeResponse(body: OwnerType): Observable<HttpResponse<void>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = body;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/type`,
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
   * @param body Type that needs to be added
   */
  addOwnerType(body: OwnerType): Observable<void> {
    return this.addOwnerTypeResponse(body).pipe(
      map(_r => _r.body)
    );
  }

  /**
   * Returns a single owner type
   * @param id ID of type to return
   * @return successful operation
   */
  getTypeResponse(id: string): Observable<HttpResponse<OwnerType>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/type/${id}`,
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
        let _body: OwnerType = null;
        _body = _resp.body as OwnerType;
        return _resp.clone({body: _body}) as HttpResponse<OwnerType>;
      })
    );
  }

  /**
   * Returns a single owner type
   * @param id ID of type to return
   * @return successful operation
   */
  getType(id: string): Observable<OwnerType> {
    return this.getTypeResponse(id).pipe(
      map(_r => _r.body)
    );
  }

  /**
   * @param params The `ConfigurationService.UpdateOwnerTypeParams` containing the following parameters:
   *
   * - `id`: ID of type to return
   *
   * - `body`: Owner type needs to be updated
   *
   * @return success
   */
  updateOwnerTypeResponse(params: ConfigurationService.UpdateOwnerTypeParams): Observable<HttpResponse<OwnerType>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    __body = params.body;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/type/${params.id}`,
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
        let _body: OwnerType = null;
        _body = _resp.body as OwnerType;
        return _resp.clone({body: _body}) as HttpResponse<OwnerType>;
      })
    );
  }

  /**
   * @param params The `ConfigurationService.UpdateOwnerTypeParams` containing the following parameters:
   *
   * - `id`: ID of type to return
   *
   * - `body`: Owner type needs to be updated
   *
   * @return success
   */
  updateOwnerType(params: ConfigurationService.UpdateOwnerTypeParams): Observable<OwnerType> {
    return this.updateOwnerTypeResponse(params).pipe(
      map(_r => _r.body)
    );
  }

  /**
   * @param id Type id to delete
   */
  deleteTypeResponse(id: string): Observable<HttpResponse<void>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      'DELETE',
      this.rootUrl + `/type/${id}`,
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
  deleteType(id: string): Observable<void> {
    return this.deleteTypeResponse(id).pipe(
      map(_r => _r.body)
    );
  }
}

module ConfigurationService {

  /**
   * Parameters for updateDefinition
   */
  export interface UpdateDefinitionParams {

    /**
     * ID of definition to return
     */
    id: string;

    /**
     * Preference Definition needs to be updated
     */
    body: PreferenceDefinition;
  }

  /**
   * Parameters for updateOwnerType
   */
  export interface UpdateOwnerTypeParams {

    /**
     * ID of type to return
     */
    id: string;

    /**
     * Owner type needs to be updated
     */
    body: OwnerType;
  }
}

export { ConfigurationService }