import { environment } from "src/environments/environment";

export const getURL = () => {
    const API_BASEURL = environment.API_BASEURL;
    const API_PORT = environment.API_PORT;
    const API_VERSION = environment.API_VERSION;
    return `${API_BASEURL}:${API_PORT}/${API_VERSION}`;
}