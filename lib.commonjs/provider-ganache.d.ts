import { JsonRpcApiProvider } from "ethers";
import ganache from "ganache";
import type { BigNumberish, BytesLike, Numeric, JsonRpcError, JsonRpcPayload, JsonRpcResult } from "ethers";
import type { EthereumProvider } from "ganache";
export interface AccountState {
    balance?: BigNumberish;
    code?: BytesLike;
    nonce?: Numeric;
}
export type GanacheConfig = Parameters<typeof ganache.provider>[0];
export declare class GanacheProvider extends JsonRpcApiProvider {
    readonly ganache: EthereumProvider;
    constructor(providerOrOptions?: EthereumProvider | GanacheConfig);
    _send(payload: JsonRpcPayload | Array<JsonRpcPayload>): Promise<Array<JsonRpcResult | JsonRpcError>>;
    snapshot(): Promise<() => Promise<void>>;
    setAccount(_address: string, state: AccountState): Promise<void>;
    setStorageAt(_address: string, _slot: BigNumberish, value: string): Promise<void>;
    mine(): Promise<void>;
}
//# sourceMappingURL=provider-ganache.d.ts.map