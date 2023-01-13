import * as Name from 'w3name';

import { stringToUint8 } from "./tools";

export const createNewName = async (value:any = '') => {
	const name = await Name.create();

	const revision = await Name.v0(name, value);

	await Name.publish(revision, name.key);
	
	return name;
}

export const updateName = async (name:any, value: any = '') => {
	if (name == null || name == undefined){
		return await createNewName(value);
	}

	if(typeof(name) == 'string'){
		name = await parseName(name);
	}

	const revision = await Name.resolve(name);

	//value not changed
	if(revision.value === value){
		return name;
	}

	const nextRevision = await Name.increment(revision, value);

	await Name.publish(nextRevision, name.key);

	return name;
}

export const parseName = async (key:string) => {
	try{
		return await Name.parse(key);
	}catch(e){
		return null;
	}
}

export const parseFrom = async (key:string) => {
	try{
		return await Name.from(stringToUint8(key));
	}catch(e){
		return null;
	}
}

export const resolveName = async (name:any) => {
	const revision = await Name.resolve(name);

	return revision.value;
}