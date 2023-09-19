'use client';
import UAParser from "ua-parser-js";
import { UserLogInterface } from "../../_definition";

export const dataPreparation = (
    userLog: UserLogInterface
) => {
    const duration = userLog.duration;
    const durationInSecond = parseInt((parseInt(duration!) / 1000).toFixed());
    const parser = new UAParser();
    const user_os = `${parser.getOS().name} ${parser.getOS().version}`;
    const user_browser = `${parser.getBrowser().name} ${parser.getBrowser().version}`;
    const user_agent = parser.getUA();

    return {
        start_date: userLog.start || Date.now().toString(),
        finish_date: userLog.end || Date.now().toString(),
        duration: durationInSecond,
        user_os,
        user_browser,
        user_agent
    };
};
