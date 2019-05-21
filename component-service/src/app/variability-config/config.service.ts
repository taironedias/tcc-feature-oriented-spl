import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IConfig } from './iconfig';

@Injectable()
export class ConfigService {

    private url = '/assets/config/initConfig.json';

    constructor(private http: HttpClient) {}

    getInitConfig(): Observable<IConfig> {
        return this.http.get<IConfig>(this.url);
    }
}


