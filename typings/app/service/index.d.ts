// This file is created by egg-ts-helper@1.25.6
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportShortid from '../../../app/service/Shortid';
import ExportTest from '../../../app/service/Test';

declare module 'egg' {
  interface IService {
    shortid: ExportShortid;
    test: ExportTest;
  }
}
