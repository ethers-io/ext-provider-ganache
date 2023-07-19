import { JsonRpcApiProvider } from "ethers";
import type { BigNumberish, BytesLike, Numeric, JsonRpcError, JsonRpcPayload, JsonRpcResult, PerformActionRequest } from "ethers";
export interface AccountState {
    balance?: BigNumberish;
    code?: BytesLike;
    nonce?: Numeric;
}
export declare class GanacheProvider extends JsonRpcApiProvider {
    #private;
    constructor();
    _perform(req: PerformActionRequest): Promise<any>;
    _send(payload: JsonRpcPayload | Array<JsonRpcPayload>): Promise<Array<JsonRpcResult | JsonRpcError>>;
    snapshot(): Promise<() => Promise<void>>;
    setAccount(_address: string, state: AccountState): Promise<void>;
    setStorageAt(_address: string, _slot: BigNumberish, value: string): Promise<void>;
    mine(): Promise<void>;
}
//# sourceMappingURL=provider-ganache.d.ts.map