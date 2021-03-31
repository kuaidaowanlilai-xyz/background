const comjs = {}

comjs.baseUrl = baseUrl//请求地址

// blob 转 base64
comjs.blobToBase64 = function (blob) {
  return new Promise((resolve, reject) => {
    const fileReader = new FileReader();
    fileReader.onload = (e) => {
      resolve(e.target.result);
    };
    // readAsDataURL
    fileReader.readAsDataURL(blob);
    fileReader.onerror = () => {
      reject(new Error('blobToBase64 error'));
    };
  });
}

// // blob 转 url
// function () {
//   const blob = new Blob([res.data], {type: res.headers['content-type']})
//   const blobUrl = window.URL.createObjectURL(blob)
// }



export default comjs
