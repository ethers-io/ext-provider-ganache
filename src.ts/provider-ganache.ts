
import {
    assertArgument,
    getAddress, getBigInt, getNumber, hexlify, isHexString,
    JsonRpcApiProvider,
    Network
} from "ethers";

import ganache from "ganache";


import type {
    BigNumberish, BytesLike, Numeric,
    JsonRpcError, JsonRpcPayload, JsonRpcResult
} from "ethers";

import type { EthereumProvider } from "ganache";


export interface AccountState {
    balance?: BigNumberish;
    code?: BytesLike;
    nonce?: Numeric;
}


export type GanacheConfig = Parameters<typeof ganache.provider>[0];


export class GanacheProvider extends JsonRpcApiProvider {
    readonly ganache: EthereumProvider;

    constructor(providerOrOptions?: EthereumProvider | GanacheConfig) {
        let provider: EthereumProvider;
        if (providerOrOptions == null || typeof((<any>providerOrOptions).getOptions) !== "function") {
            provider = ganache.provider(<any>providerOrOptions);
        } else {
            provider = <EthereumProvider>providerOrOptions;
        }

        const network = new Network("testnet", provider.getOptions().chain.chainId);
        super(network, {
            staticNetwork: network,
            batchMaxCount: 1,
            batchStallTime: 0,
            cacheTimeout: -1
        });

        this.ganache = provider;
    }

    async _send(payload: JsonRpcPayload | Array<JsonRpcPayload>): Promise<Array<JsonRpcResult | JsonRpcError>> {
        assertArgument(!Array.isArray(payload), "batch requests unsupported", "UNSUPPORTED_OPERATION", {
            operation: "_send", info: { payload }
        });

        const result = await this.ganache.request(<any>payload)
        return [ { id: payload.id, result } ];
    }

    async snapshot(): Promise<() => Promise<void>> {
       const id = await this.send("evm_snapshot", [ ]);
       return async () => {
           return await this.send("evm_revert", [ id ]);
       };
    }

    async setAccount(_address: string, state: AccountState): Promise<void> {
        const address = getAddress(_address);

        const ops: Array<{ m: string, ps: Array<any> }> = [ ];

        if (state.balance != null) {
            const balance = getBigInt(state.balance, "state.balance");
            ops.push({ m: "evm_setAccountBalance", ps: [ address, balance ] });
        }

        if (state.code != null) {
            const code = hexlify(state.code);
            ops.push({ m: "evm_setAccountCode", ps: [ address, code ] });
        }

        if (state.nonce != null) {
            const nonce = getNumber(state.nonce, "state.nonce");
            ops.push({ m: "evm_setAccountNonce", ps: [ address, nonce ] });
        }

        if (ops.length === 0) { return; }

        await Promise.all(ops.map(({ m, ps }) => this.send(m, ps)));
    }

    async setStorageAt(_address: string, _slot: BigNumberish, value: string): Promise<void> {
        const address = getAddress(_address);
        const slot = getBigInt(_slot, "slot");
        assertArgument(isHexString(value, 32), "value must be 32 bytes", "value", value);
        await this.send("evm_setAccountStorageAt", [ address, slot, value]);
    }

    async mine(): Promise<void> {
        await this.send("evm_mine", [ ]);
    }

}
