import { ErrorStatusResponse } from "../enums/errorlist";
import { errorMessageInvalidInfo } from "../enums/errormessage";
import { ErrorBase } from "./errorbase";

export class ErrorHandler {
    static invalidInfoError(message: keyof typeof errorMessageInvalidInfo): ErrorBase {
        let errorcode = errorMessageInvalidInfo[message];
        return new ErrorBase(message, errorcode, '', ErrorStatusResponse.badrequest);
    }
}