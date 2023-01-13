import mime from "mime-types"

//return a clean buffer
const clean = (length: number) => {
	const buffer = new Uint8Array(length);
	for (let i = 0; i < length; i += 1) {
		buffer[i] = 0;
	}
	return buffer;
}

//string to uint8
export const stringToUint8 = (input: string, offset = 0) => {
	let i, length = 0;

	const buffer = new Uint8Array(input.length);
	for (let i = 0; i < length; i += 1) {
		buffer[i] = 0;
	}

	offset = offset || 0;
	for (i = 0, length = input.length; i < length; i += 1) {
		buffer[offset] = input.charCodeAt(i);
		offset += 1;
	}

	return buffer;
}

//uint8 to string
export const uint8ToString = (input: Uint8Array) => {
	let data = '';

	for(let i = 0; i < input.length; i++){
		data += String.fromCharCode(input[i]);
	}

	return data;
}

//copy string to clipboard
export const clickToCopy = (content:string) => {
	const textarea = document.createElement('textarea');

	textarea.readOnly = true;
	textarea.style.position = 'absolute';
	textarea.style.left = '-9999px';

	textarea.value = content;

	document.body.appendChild(textarea);

	textarea.select();

	const result = document.execCommand('Copy');

	document.body.removeChild(textarea);

	return result;
}

//short content string
export const shortString = (content:string) => {
  if(content.length <= 17){
    return content;
  }

  const length = content.length;

  return content.substr(0,8)+"..."+content.substr(length-6,length);
}

//get file type
export const fileType = (name: string) => {
	const mimeType = mime.contentType(mime.lookup(name) || "application/octet-stream");

	return mimeType as string;
}

//get file size for human
export const fileSize = (size: number) => {
	if (size < 1024) {
		return size.toFixed(2) + ' B';
	} else {
		size /= 1024;
	}

	if (size < 1024) {
		return size.toFixed(2) + 'KB';
	} else {
		size /= 1024;
	}

	if (size < 1024) {
		return size.toFixed(2) + 'MB';
	} else {
		size /= 1024;
	}

	return size.toFixed(2) + 'GB'
}

//sleep a little while
export const sleep = async (time:number) => {
  return new Promise((resolve) => setTimeout(resolve, time));
}

//get url paramter
export const getUrlParamter = (name:string) => {
	const reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
  const r = (window as any).location.search.substr(1).match(reg);
  if (r != null) {
    return unescape(r[2]);
  }
  return '';
}

//set url patamter
export const setUrlParamter = (name:string, value:string) => {
  const oldUrl = (window as any).location.href.toString();
  const re = new RegExp(name + '=[^&]*', 'gi');
  const paramter = name + '=' + value;
  let newUrl = oldUrl.replace(re, paramter);

  if(newUrl.indexOf(name + '=') === -1 ){
    if(newUrl.indexOf('?') === -1){
      newUrl = newUrl + '?' + paramter;
    }else{
      newUrl = newUrl + '&' + paramter;
    }
  }

  (window as any).history.pushState(null, null, newUrl);
}

class UploadFile extends Blob {
  name:string = '';
  webkitRelativePath:string='';
}

//make file object
export const makeFileObject = (filename:string, content:string, fileType:string = 'text/plain', webkitRelativePath:string = '') => {
  
  const file = new UploadFile([content], { type: fileType });
  file.name = filename;
  file.webkitRelativePath = webkitRelativePath;

  const rawFile = {
    ...file,
    raw:file,
  };

  return rawFile;
}