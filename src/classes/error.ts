interface HttpErrorOptions {
    message: string;
    statusCode: number;
    name: string;
  }
 export default class HttpError extends Error {
    statusCode: number;
      constructor(options: HttpErrorOptions) {
          super(options.message);
      this.name = options.name;
      this.message = options.message;
      this.statusCode = options.statusCode;  
      this.stack = new Error().stack;
      }
  }