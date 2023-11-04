import { UAParser } from "ua-parser-js";

export const getAgent = () => {
    const parser = new UAParser();
    const user_os = `${parser.getOS().name} ${parser.getOS().version}`;
    const user_browser = `${parser.getBrowser().name} ${parser.getBrowser().version}`;
    const user_agent = parser.getUA();

    return {
        user_os,
        user_browser,
        user_agent
    }
}