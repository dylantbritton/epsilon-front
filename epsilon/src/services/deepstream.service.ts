import { Injectable } from '@angular/core';

declare var deepstream: any;

@Injectable()
export class DeepstreamService {

  private ds;
  public dsInstance;

  constructor() {
    this.ds = this.dsInstance = deepstream('18.217.18.190:6020');
  }

  login(credentials?, loginHandler?) {
    // {username: 'chris', password:'password'}
    this.ds.login(credentials, loginHandler);
  }

  getRecord(name) {
    return this.ds.record.getRecord(name);
  }

  getList(name) {
    return this.ds.record.getList(name);
  }
}
