import { JsonRpcApiProvider } from "ethers";
import type { JsonRpcError, JsonRpcPayload, JsonRpcResult } from "ethers";
export declare class TestProvider extends JsonRpcApiProvider {
    #private;
    constructor();
    _send(payload: JsonRpcPayload | Array<JsonRpcPayload>): Promise<Array<JsonRpcResult | JsonRpcError>>;
}
//# sourceMappingURL=provider-test.d.ts.map