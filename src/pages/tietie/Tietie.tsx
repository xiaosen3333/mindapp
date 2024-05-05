import React, { useEffect } from "react";
import { useRef } from "react";
import Camera from "../../components/Camera";
import Microphone from "../../components/Microphone";
/*
    这里介绍新的方法:H5新媒体接口 navigator.mediaDevices.getUserMedia()
    这个方法会提示用户是否允许媒体输入,(媒体输入主要包括相机,视频采集设备,屏幕共享服务,麦克风,A/D转换器等)
    返回的是一个Promise对象。
    如果用户同意使用权限,则会将 MediaStream对象作为resolve()的参数传给then()
    如果用户拒绝使用权限,或者请求的媒体资源不可用,则会将 PermissionDeniedError作为reject()的参数传给catch()
    */

// 获取当前帧
//  var captureImage = function() {
//     var canvas = document.createElement("canvas");
//     canvas.width = video.videoWidth * scale;
//     canvas.height = video.videoHeight * scale;
//     canvas.getContext('2d')
//         .drawImage(video, 0, 0, canvas.width, canvas.height);
//     var img = document.createElement("img");
//     img.src = canvas.toDataURL('image/png');
//     $output.prepend(img);
// };

export let Tietie = () => {

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <Camera></Camera>
      <Microphone></Microphone>
    </div>
  );
};
