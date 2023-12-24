import HttpResponse from "../protocols/http-response";

export const created = (data: any): HttpResponse<any> => {
    return {
        body: data,
        statusCode: 201
    }
}

export const ok = (data: any): HttpResponse<any> => {
    return {
        body: data,
        statusCode: 200
    }
}

export const badRequest = (message: string): HttpResponse<any> => {
    return {
        body: { message },
        statusCode: 400
    }
}

export const notAcceptable = (message: any): HttpResponse<any> => {
    return {
        body: { message },
        statusCode: 406
    }
}
