import { Application } from "express";

export interface IApp {
  app: Application;
  port: number;
  listen(): void;
}

export interface IAppConfig {
  port: number;
  _middlewares: any[];
  controllers: any[];
  services: any[];
}
