import { appError, getAdminErrorMessage } from "bsiuilib";
import { getUrl, reqInfo, buildUsageDataInput } from "../../base/utils/tfUtils";
import store from "../../tf_index";
export async function getUsageData(pageid, data, mode) {
    let url = getUrl("recentUsage");
    let usageDataInput = buildUsageDataInput(pageid, store, data, mode);
    let tt = JSON.stringify(usageDataInput);
    const response = await fetch(url, reqInfo(tt));
    const json = await response.json();
    return json;
}
export default getUsageData;