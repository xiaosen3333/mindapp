import React from "react";
import { ReactMic, ReactMicStopEvent } from "react-mic";

const Microphone = () => {
  const [isRecording, setIsRecording] = React.useState(false);

  const onStop = (recordedBlob: ReactMicStopEvent) => {
    // 在这里可以处理录音数据，比如发送到服务器保存等操作

    console.log(recordedBlob);
    const reader = new FileReader();
    reader.onload = (event) => {
      if (event.target && typeof event.target.result === "string") {
        const base64Data = event.target.result;
        console.log(base64Data); // 这里是 Base64 编码的录音数据
        // 您现在可以使用 base64Data 进行进一步的操作，例如显示在网页上或发送到服务器
      }
    };
    reader.readAsDataURL(recordedBlob.blob);
  };

  return (
    <div>
      <ReactMic
        record={isRecording}
        onStop={onStop}
        visualSetting="sinewave"
        mimeType="audio/wav"
        // style={{
        //   width: '100%',
        //   height: 'auto',
        // }}
      />
      <button onClick={() => setIsRecording(!isRecording)}>
        {isRecording ? "停止录音" : "开始录音"}
      </button>
    </div>
  );
};

export default Microphone;
