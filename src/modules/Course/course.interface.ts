import { ObjectId } from 'mongoose';

export interface IVideo {
  _id: any;
  title: string;
  url: string;
}

export interface IModule {
  _id: ObjectId; 
  moduleName: string;
  videos: IVideo[];
}

export interface ICourse {
  title: string;
  description: string;
  modules: IModule[];
}
