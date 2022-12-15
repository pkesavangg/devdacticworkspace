import { Injectable } from '@angular/core';

import { Storage } from '@capacitor/storage';


@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() { }

  getValue(key: string): Promise<any> {
    return Storage.get({ key });
  }

  setValue(key: string, value: string): Promise<void> {
    return Storage.set({ key, value });
  }

  clearValue(key: string): Promise<void> {
    return Storage.remove({ key });
  }

  clearAll(): Promise<void> {
    return Storage.clear();
  }
}
