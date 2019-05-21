import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IConfig } from '../config';
import { Observable } from 'rxjs';

@Injectable()
export class ConfigSubjectService {

    private url = '/assets/config/initConfig.json';

    constructor(private http: HttpClient) {}

    getInitConfig(): Observable<IConfig> {
        return this.http.get<IConfig>(this.url);
    }
}


