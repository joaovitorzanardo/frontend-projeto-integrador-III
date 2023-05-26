export class ErrorException extends Error {
    public readonly message: string = '';

    constructor(message: string){
        super();
    }
}