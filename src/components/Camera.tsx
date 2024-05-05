import React from 'react';
import Webcam from 'react-webcam';

const Camera = () => {
  const webcamRef = React.useRef<Webcam>(null);

  return (
    <div>
      <Webcam
        audio={false}
        ref={webcamRef}
        style={{
          width: '100%',
          height: 'auto',
        }}
      />
      <button onClick={() => {
        if (!webcamRef.current) {
          return;
        }
        const imageSrc = webcamRef.current.getScreenshot();
        // 在这里可以处理图像数据，比如发送到服务器保存等操作
        console.log(imageSrc);
      }}>拍照</button>
    </div>
  );
};

export default Camera;