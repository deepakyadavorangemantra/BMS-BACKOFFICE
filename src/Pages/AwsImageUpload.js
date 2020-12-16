import React, { useRef } from "react";
import S3 from "react-aws-s3";

function AwsImageUpload() {
  const fileInput = useRef();
  const handleClick = (event) => {
    event.preventDefault();
    let file = fileInput.current.files[0];
    let newFileName = fileInput.current.files[0].name.replace(/\..+$/, "");
    const config = {
      // bucketName: process.env.REACT_APP_BUCKET_NAME,
      // dirName: process.env.REACT_APP_DIR_NAME /* optional */,
      // region: process.env.REACT_APP_REGION,
      // accessKeyId: process.env.REACT_APP_ACCESS_ID,
      // secretAccessKey: process.env.REACT_APP_ACCESS_KEY,

      bucketName: 'bmsbucketforimages',
      dirName: '/images/', /* optional */
      region: 'ap-south-1',
      accessKeyId: 'AKIAUXRQWUVJSBSLO47H',
      secretAccessKey: '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',
      s3Url: 'https://bmsbucketforimages.s3.ap-south-1.amazonaws.com', /* optional */
    };
    const ReactS3Client = new S3(config);
    debugger;
    ReactS3Client.uploadFile(file, newFileName).then((data) => {
      console.log(data);
      if (data.status === 204) {
        console.log("success");
      } else {
        console.log("fail");
      }
    });
  };
  return (
    <div style={{ marginTop:'50%', marginLeft:'50%'}}>
      <form className='upload-steps' onSubmit={handleClick}>
        <label>
          Upload file:
          <input style={{ display: 'block' }} type='file' ref={fileInput} />
        </label>
        <br />
        <button type='submit'>Upload</button>
      </form>
    </div>
  );
}

export default AwsImageUpload;
