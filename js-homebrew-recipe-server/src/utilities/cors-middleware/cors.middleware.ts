import { ServerResponse } from 'http';
// add a Access-Control-Allow-Origin header to the response to allow cors
export function cors(_, reply: ServerResponse, next) {
    reply.setHeader('Access-Control-Allow-Origin', '*');
    next();
}