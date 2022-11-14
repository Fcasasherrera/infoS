export const isEmpty = (obj: any) => {
  return JSON.stringify(obj) === '{}';
};
export const validateRequest = (
  obj: any,
  type: string,
  forceDisabled: boolean,
  file?: any,
) => {
  if (forceDisabled === true) return true;
  switch (type) {
    case '1':
      return (
        obj.type === null ||
        obj.startDate === '' ||
        obj.endDate === '' ||
        obj.comments === ''
      );
    case '2':
      return (
        obj.type === null ||
        obj.startDate === '' ||
        obj.endDate === '' ||
        obj.comments === '' ||
        isEmpty(file)
      );
    case '3':
      return obj.type === null || obj.comments === '';

    default:
      break;
  }
  return JSON.stringify(obj) === '{}';
};
export const validateForms = (obj: any) => {
  const keys = Object.keys(obj);
  const objReturn = {flagEmpty: false, propery: ''};
  for (let i = 0; i < keys.length; i++) {
    const element = obj[keys[i]];
    // console.log(keys[i]);

    if (element === '' || element === null) {
      objReturn.flagEmpty = true;
      objReturn.propery = keys[i];
    }
  }
  return objReturn;
};

export const validateIsEmpty = (obj: any, exceptions?: Array<string>) => {
  const keys = Object.keys(obj);
  let countEmpty = 0;
  for (let i = 0; i < keys.length; i++) {
    const element = obj[keys[i]];
    if (exceptions) {
      if (!exceptions.includes(keys[i])) {
        if (element !== '' && element !== null && element !== false) {
          countEmpty++;
          break;
        }
      }
    } else {
      if (element !== '' && element !== null && element !== false) {
        countEmpty++;
        break;
      }
    }
  }
  return countEmpty === 0;
};

export const createUrlParamsByObject = (obj: any) => {
  const urlParams: any = new URLSearchParams();
  const keys = Object.keys(obj);
  keys.map(key => {
    urlParams.append(key, obj[key]);
  });
  return urlParams;
};

export const getTypeRequest = (key: string) => {
  switch (key) {
    case 'requestDetail.requesType.holiday':
      return '1';
    case 'requestDetail.requesType.disability':
      return '2';
    case 'requestDetail.requesType.other':
      return '3';
    default:
      return '1,2,3';
  }
};
export const bytesToMegaBytes = (bytes: number) => bytes / 1024 ** 2;
