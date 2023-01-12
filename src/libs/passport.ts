import { PassportReader } from '@gitcoinco/passport-sdk-reader'
import { PassportScorer } from '@gitcoinco/passport-sdk-scorer';

import { connectState } from "./connect"
import * as constant from "../constant"

//get passport infos
export const getPassport = async (address:string, chainId:number = 1) => {

  const resp = new Array();

  // const chainId = connectState.chainId;

  const passportReader = new PassportReader(constant.CeramicApiHost, String(chainId));

  const res = await passportReader.getPassport(address);

  if (res === false){
    return resp;
  }

  for(let i = res.stamps.length -1; i >= 0; i--){
    const item = res.stamps[i]; 

    try{
      const scorer = new PassportScorer([{
        provider: item.provider,
        issuer: item.credential.issuer,
        score: 0.5,
      }], constant.CeramicApiHost, String(chainId));

      const score = await scorer.getScore(address); 

      if(score <= 0){
        continue;
      }

      resp.push({
        name: item.provider,
        issuer: item.credential.issuer,
        proof: item.credential.proof,
        issuanceDate: item.credential.issuanceDate,
        expirationDate: item.credential.expirationDate,
        address: address,
        score: score,
      });
    }catch(e){
      continue;
    }
  }

  return resp;
}