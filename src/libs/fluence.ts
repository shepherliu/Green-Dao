import { Fluence } from '@fluencelabs/fluence';
import { krasnodar } from '@fluencelabs/fluence-network-environment';
import { ref } from "vue"

import { connectState } from "./connect"

import { ping, send, registerGreenChat } from '../_aqua/greenchat';

const relayNodes = [krasnodar[4], krasnodar[5], krasnodar[6]];

export const connectFluence = async () => {

	for(const i in relayNodes){
		const relayPeerId = relayNodes[i];

		try{
			await Fluence.start({ connectTo: relayPeerId.multiaddr });

			connectState.fluenceRelayId = relayPeerId.peerId;

			registerGreenChat({
				ping: (from:string) => {
					return from;
				},
				send: (from:string, address:string, msg:string) => {

					const info = {
						from: address.toLowerCase(),
						to: connectState.userAddr.value.toLowerCase(),
						msg: msg,
						timestamp: (new Date()).getTime(),
						peer: true,
					};

					//push message to cache
					connectState.fluenceChatMessages.value.push(info);

					connectState.fluenceChatNewMessages.value.push(info);

					return [from, address, msg];
				},
			});

			break;
		}catch(e){
			continue;
		}
	}

    return Fluence.getStatus().peerId!;
}

export const checkOnline = async (peerId:string) => {
	try{
		await ping(peerId, connectState.fluenceRelayId);
		return true;
	}catch(e){
		return false;
	}
}

export const sendMessage = async (peerId:string, address:string, msg:string) => {
	try{
		await send(peerId, connectState.fluenceRelayId, address, msg);

		return true;
	}catch(e){
		return false;
	}
}