import { NextFunction as ExpressNextFunction, Request as ExpressRequest, Response as ExpressResponse } from "express";
import {
  ReasonPhrases,
  StatusCodes,
} from 'http-status-codes';

import User from "../domain/user";

export interface Request extends ExpressRequest {
  user: User
  files: File[]
};
export interface Response extends ExpressResponse { };
export interface Next extends ExpressNextFunction { };
export interface File extends Express.Multer.File { };
export const StatusCodeReason = ReasonPhrases;
export const StatusCode = StatusCodes;
