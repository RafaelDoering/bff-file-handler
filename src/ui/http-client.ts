import { NextFunction as ExpressNextFunction, Request as ExpressRequest, Response as ExpressResponse } from "express";

import User from "../domain/user";

export interface Request extends ExpressRequest {
  user: User
  files: File[]
};
export interface Response extends ExpressResponse { };
export interface Next extends ExpressNextFunction { };
export interface File extends Express.Multer.File { };
