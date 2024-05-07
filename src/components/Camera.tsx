import React from "react";
import Webcam from "react-webcam";
import styles from "./Camera.module.scss";
import paizhao from "../icon/paizhao.svg";
import swith from "../icon/switch.svg";
import photo from "../icon/photo.svg";
import { RecordContext } from "../context/MyContext";
const Camera = (props: { next: () => void }) => {
  const webcamRef = React.useRef<Webcam>(null);
  const recordcontext = React.useContext(RecordContext);
  const handlepaizhao = () => {
    if (!webcamRef.current) {
      return;
    }
    const imageSrc = webcamRef.current.getScreenshot();
    // 在这里可以处理图像数据，比如发送到服务器保存等操作
    recordcontext[recordcontext.length - 1].img = imageSrc as string;
    console.log(imageSrc);
    props.next();
  };
  return (
    <div className={styles.camera}>
      <div className={styles.title}></div>
      <Webcam
        audio={false}
        ref={webcamRef}
        style={{
          marginTop: 120,
          width: "auto",
          height: 287,
        }}
      />
      <div className={styles.textgroup}>
        <p>人像</p>
        <span>拍照</span>
        <p>录像</p>
      </div>
      <div className={styles.btngroup}>
        <img className={styles.switch} src={swith} alt=""></img>
        <img
          src={paizhao}
          alt=""
          className={styles.paizhao}
          onClick={() => {
            handlepaizhao();
          }}
        ></img>
        <img className={styles.switch} src={photo} alt=""></img>
      </div>
    </div>
  );
};

export default Camera;
