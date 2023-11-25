(() => {
  const uploadBtnDom = document.querySelector('button.upload-btn');
  const uploadFileDom = document.getElementById('imagefile');
  const uploadURL = 'http://study.yuanjin.tech/api/upload';

  uploadBtnDom.addEventListener('click', async () => {
    const fileList = [...uploadFileDom.files];

    if (fileList.length > 0) {
      // 存在文件
      /**
       * File中属性：
       * name
       * size
       * type
       * lastModified
       */
      // 支持多文件上传
      const result = await Promise.allSettled(
        fileList.map((file) => {
          // 创建请求体
          const formData = new FormData();
          formData.append('imagefile', file);
          const config = {
            method: 'POST',
            body: formData,
          };

          return fetch(uploadURL, config);
        })
      );

      const data = await Promise.all(
        result
          .filter((item) => item.status === 'fulfilled')
          .map((item) => item.value.json())
      );

      console.log(data);
    } else {
      // 不存在文件
    }
  });
})();
