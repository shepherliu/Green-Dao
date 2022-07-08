import { PassportReader } from '@gitcoinco/passport-sdk-reader'
import { PassportScorer } from '@gitcoinco/passport-sdk-scorer';

import { connectState } from "./connect"
import * as constant from "../constant"

//get passport infos
export const getPassport = async (address:str) => {

	const resp = [];

	const chainId = connectState.chainId;

	const passportReader = new PassportReader(constant.CeramicApiHost, chainId);

	const res = await passportReader.getPassport(address);

	if (res === false){
		return resp;
	}

	for(let i = res.stamps.length -1; i >= 0; i--){
	    const item = res.stamps[i]; 

      	resp.push({
	        name: item.provider,
	        issuer: item.credential.issuer,
	        proof: item.credential.proof,
	        issuanceDate: item.credential.issuanceDate,
	        expirationDate: item.credential.expirationDate,
	        address: address,
	        score: 0,
      	});
  	}

  	return resp;
}

//get scores
export const getScore = async (name:str, address:str, issuer:str, score:number = 0.5) => {

	const chainId = connectState.chainId;

	const scorer = new PassportScorer([{
          provider: name,
          issuer: issuer,
          score: score,
       	}], constant.CeramicApiHost, chainId);

	return await scorer.getScore(address);
}