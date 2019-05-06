import { Injectable, InjectionToken } from '@angular/core';
import { Http } from '@angular/http';

export const ACCESS_BASE = new InjectionToken<string>('ACCESS_BASE');
export const LEVEL_BASE = new InjectionToken<string>('LEVEL_BASE');

export function ConfigFactory(configService: ConfigService, file: string, property: string) {
    return configService.loadJSON(file)[property];
}

@Injectable()
export class ConfigService {
    public config: any;

    constructor(private http: Http) {}

    loadJSON(filePath) {
        const json = this.loadTextFileAjaxSync(filePath, 'application/json');
        return JSON.parse(json);
    }

    loadTextFileAjaxSync(filePath, mineType) {
        const xmlHttp = new XMLHttpRequest();
        xmlHttp.open('GET', filePath, false);
        if (mineType !== null) {
            if (xmlHttp.overrideMimeType) {
                xmlHttp.overrideMimeType(mineType);
            }
        }
        xmlHttp.send();
        if (xmlHttp.status === 200) {
            return xmlHttp.responseText;
        } else {
            return null;
        }
    }
}