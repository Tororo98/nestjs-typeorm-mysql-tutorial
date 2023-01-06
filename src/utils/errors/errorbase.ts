export class ErrorBase {
    constructor(
        public message: string,
        public codeerror: number, 
        public internalmessage?: string,
        public statusresponse?: number
    ) {}
}