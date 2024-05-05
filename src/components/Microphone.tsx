import React from 'react';
import { ReactMic, ReactMicStopEvent } from 'react-mic';

const Microphone = () => {
  const [isRecording, setIsRecording] = React.useState(false);

  const onStop = (recordedBlob:ReactMicStopEvent) => {
    // 在这里可以处理录音数据，比如发送到服务器保存等操作
    console.log(recordedBlob);
  };

  return (
    <div>
      <ReactMic
        record={isRecording}
        onStop={onStop}
        visualSetting="sinewave"
        // style={{
        //   width: '100%',
        //   height: 'auto',
        // }}
      />
      <button onClick={() => setIsRecording(!isRecording)}>
        {isRecording ? '停止录音' : '开始录音'}
      </button>
    </div>
  );
};

export default Microphone;