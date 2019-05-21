import { InjectionToken } from '@angular/core';
import { IAcessoStrategy } from './iacesso';

export const AccessStrategyToken = new InjectionToken<IAcessoStrategy[]>('iacesso');
