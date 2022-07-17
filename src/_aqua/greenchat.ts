/**
 *
 * This file is auto-generated. Do not edit manually: changes may be erased.
 * Generated by Aqua compiler: https://github.com/fluencelabs/aqua/.
 * If you find any bugs, please write an issue on GitHub: https://github.com/fluencelabs/aqua/issues
 * Aqua version: 0.7.2-314
 *
 */
import { Fluence, FluencePeer } from '@fluencelabs/fluence';
import {
    CallParams,
    callFunction,
    registerService,
} from '@fluencelabs/fluence/dist/internal/compilerSupport/v3';


// Services

export interface GreenChatDef {
    ping: (from: string, callParams: CallParams<'from'>) => string | Promise<string>;
    send: (from: string, address: string, msg: string, callParams: CallParams<'from' | 'address' | 'msg'>) => string[] | Promise<string[]>;
}
export function registerGreenChat(service: GreenChatDef): void;
export function registerGreenChat(serviceId: string, service: GreenChatDef): void;
export function registerGreenChat(peer: FluencePeer, service: GreenChatDef): void;
export function registerGreenChat(peer: FluencePeer, serviceId: string, service: GreenChatDef): void;
       

export function registerGreenChat(...args: any) {
    registerService(
        args,
        {
    "defaultServiceId" : "GreenChat",
    "functions" : {
        "tag" : "labeledProduct",
        "fields" : {
            "ping" : {
                "tag" : "arrow",
                "domain" : {
                    "tag" : "labeledProduct",
                    "fields" : {
                        "from" : {
                            "tag" : "scalar",
                            "name" : "string"
                        }
                    }
                },
                "codomain" : {
                    "tag" : "unlabeledProduct",
                    "items" : [
                        {
                            "tag" : "scalar",
                            "name" : "string"
                        }
                    ]
                }
            },
            "send" : {
                "tag" : "arrow",
                "domain" : {
                    "tag" : "labeledProduct",
                    "fields" : {
                        "from" : {
                            "tag" : "scalar",
                            "name" : "string"
                        },
                        "address" : {
                            "tag" : "scalar",
                            "name" : "string"
                        },
                        "msg" : {
                            "tag" : "scalar",
                            "name" : "string"
                        }
                    }
                },
                "codomain" : {
                    "tag" : "unlabeledProduct",
                    "items" : [
                        {
                            "tag" : "array",
                            "type" : {
                                "tag" : "scalar",
                                "name" : "string"
                            }
                        }
                    ]
                }
            }
        }
    }
}
    );
}
      
// Functions
 

export function ping(
    targetPeerId: string,
    targetRelayPeerId: string,
    config?: {ttl?: number}
): Promise<string>;

export function ping(
    peer: FluencePeer,
    targetPeerId: string,
    targetRelayPeerId: string,
    config?: {ttl?: number}
): Promise<string>;

export function ping(...args: any) {

    const script = `
                    (xor
                     (seq
                      (seq
                       (seq
                        (seq
                         (seq
                          (seq
                           (call %init_peer_id% ("getDataSrv" "-relay-") [] -relay-)
                           (call %init_peer_id% ("getDataSrv" "targetPeerId") [] targetPeerId)
                          )
                          (call %init_peer_id% ("getDataSrv" "targetRelayPeerId") [] targetRelayPeerId)
                         )
                         (call -relay- ("op" "noop") [])
                        )
                        (call targetRelayPeerId ("op" "noop") [])
                       )
                       (xor
                        (seq
                         (seq
                          (call targetPeerId ("GreenChat" "ping") [%init_peer_id%] res)
                          (call targetRelayPeerId ("op" "noop") [])
                         )
                         (call -relay- ("op" "noop") [])
                        )
                        (seq
                         (seq
                          (call targetRelayPeerId ("op" "noop") [])
                          (call -relay- ("op" "noop") [])
                         )
                         (call %init_peer_id% ("errorHandlingSrv" "error") [%last_error% 1])
                        )
                       )
                      )
                      (xor
                       (call %init_peer_id% ("callbackSrv" "response") [res])
                       (call %init_peer_id% ("errorHandlingSrv" "error") [%last_error% 2])
                      )
                     )
                     (call %init_peer_id% ("errorHandlingSrv" "error") [%last_error% 3])
                    )
    `
    return callFunction(
        args,
        {
    "functionName" : "ping",
    "arrow" : {
        "tag" : "arrow",
        "domain" : {
            "tag" : "labeledProduct",
            "fields" : {
                "targetPeerId" : {
                    "tag" : "scalar",
                    "name" : "string"
                },
                "targetRelayPeerId" : {
                    "tag" : "scalar",
                    "name" : "string"
                }
            }
        },
        "codomain" : {
            "tag" : "unlabeledProduct",
            "items" : [
                {
                    "tag" : "scalar",
                    "name" : "string"
                }
            ]
        }
    },
    "names" : {
        "relay" : "-relay-",
        "getDataSrv" : "getDataSrv",
        "callbackSrv" : "callbackSrv",
        "responseSrv" : "callbackSrv",
        "responseFnName" : "response",
        "errorHandlingSrv" : "errorHandlingSrv",
        "errorFnName" : "error"
    }
},
        script
    )
}

 

export function send(
    targetPeerId: string,
    targetRelayPeerId: string,
    address: string,
    msg: string,
    config?: {ttl?: number}
): Promise<string[]>;

export function send(
    peer: FluencePeer,
    targetPeerId: string,
    targetRelayPeerId: string,
    address: string,
    msg: string,
    config?: {ttl?: number}
): Promise<string[]>;

export function send(...args: any) {

    const script = `
                    (xor
                     (seq
                      (seq
                       (seq
                        (seq
                         (seq
                          (seq
                           (seq
                            (seq
                             (call %init_peer_id% ("getDataSrv" "-relay-") [] -relay-)
                             (call %init_peer_id% ("getDataSrv" "targetPeerId") [] targetPeerId)
                            )
                            (call %init_peer_id% ("getDataSrv" "targetRelayPeerId") [] targetRelayPeerId)
                           )
                           (call %init_peer_id% ("getDataSrv" "address") [] address)
                          )
                          (call %init_peer_id% ("getDataSrv" "msg") [] msg)
                         )
                         (call -relay- ("op" "noop") [])
                        )
                        (call targetRelayPeerId ("op" "noop") [])
                       )
                       (xor
                        (seq
                         (seq
                          (call targetPeerId ("GreenChat" "send") [%init_peer_id% address msg] res)
                          (call targetRelayPeerId ("op" "noop") [])
                         )
                         (call -relay- ("op" "noop") [])
                        )
                        (seq
                         (seq
                          (call targetRelayPeerId ("op" "noop") [])
                          (call -relay- ("op" "noop") [])
                         )
                         (call %init_peer_id% ("errorHandlingSrv" "error") [%last_error% 1])
                        )
                       )
                      )
                      (xor
                       (call %init_peer_id% ("callbackSrv" "response") [res])
                       (call %init_peer_id% ("errorHandlingSrv" "error") [%last_error% 2])
                      )
                     )
                     (call %init_peer_id% ("errorHandlingSrv" "error") [%last_error% 3])
                    )
    `
    return callFunction(
        args,
        {
    "functionName" : "send",
    "arrow" : {
        "tag" : "arrow",
        "domain" : {
            "tag" : "labeledProduct",
            "fields" : {
                "targetPeerId" : {
                    "tag" : "scalar",
                    "name" : "string"
                },
                "targetRelayPeerId" : {
                    "tag" : "scalar",
                    "name" : "string"
                },
                "address" : {
                    "tag" : "scalar",
                    "name" : "string"
                },
                "msg" : {
                    "tag" : "scalar",
                    "name" : "string"
                }
            }
        },
        "codomain" : {
            "tag" : "unlabeledProduct",
            "items" : [
                {
                    "tag" : "array",
                    "type" : {
                        "tag" : "scalar",
                        "name" : "string"
                    }
                }
            ]
        }
    },
    "names" : {
        "relay" : "-relay-",
        "getDataSrv" : "getDataSrv",
        "callbackSrv" : "callbackSrv",
        "responseSrv" : "callbackSrv",
        "responseFnName" : "response",
        "errorHandlingSrv" : "errorHandlingSrv",
        "errorFnName" : "error"
    }
},
        script
    )
}
