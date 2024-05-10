import React, { useContext, useEffect, useState } from "react";
import { useRef } from "react";
import Camera from "../../components/Camera";
import Microphone from "../../components/Microphone";
import styles from "./Data.module.scss";
import next from "../../icon/next.svg";
import camera from "../../icon/camera.svg";
import back from "../../icon/back.svg";
import {
  PageContext,
  ProgressContext,
  RecordContext,
} from "../../context/MyContext";
import backbtn from "../../icon/backbtn.svg";
import voice from "../../icon/voice.svg";
import compelete from "../../icon/compelete.svg";

export const DataPage = (props: { pagenum: number }) => {
  const [page, setPage] = useState<number>(props.pagenum);
  switch (page) {
    case 5:
      return (
        <Page7
          handlenext={() => {
            setPage(6);
          }}
        />
      );
    case 6:
      return (
        <Page8
          handlenext={() => {
            setPage(7);
          }}
        />
      );
    default:
      return null;
  }
};

interface CardProps {
  children: React.ReactNode; // 明确指定 children 的类型
  isanimation?: boolean;
}

function Card({ children, isanimation = false }: CardProps) {
  const [flipped, setFlipped] = useState(false);

  const toggleFlip = () => {
    setFlipped(true);
  };

  useEffect(() => {
    if (isanimation) {
      const timer = setTimeout(() => {
        toggleFlip();
      }, 500);
      return () => clearTimeout(timer);
    }
  });

  return (
    <div
      className={`${styles.card} ${flipped ? styles.flip : ""}`}
      // onClick={toggleFlip}
    >
      {children}
    </div>
  );
}
function Page1(props: { handlenext: () => void }) {
  return (
    <Card>
      <div className={styles.title}>
        今天的精彩瞬间
        <br />
        已经珍藏！
      </div>
      <div className={styles.cardtext}>
        接下来，
        <br />
        让我们一起
        <br /> 回味那些
        <br /> 温馨记忆吧。
      </div>
      <img
        className={styles.nextbtn}
        onClick={() => props.handlenext()}
        src={next}
        alt=""
      />
    </Card>
  );
}

function Page2(props: { handleback: () => void; handlenext: () => void }) {
  const recordcontext = useContext(RecordContext);
  return (
    <Card>
      <div className={styles.title}>
        这是你昨天
        <br />
        记录的照片
      </div>
      <img
        src={recordcontext[recordcontext.length - 1].img}
        alt=""
        className={styles.photo}
      />
      <img
        className={styles.nextbtn}
        src={next}
        alt=""
        onClick={() => props.handlenext()}
      />
    </Card>
  );
}

function Page3(props: { handlenext: () => void; handleback: () => void }) {
  const recordcontext = useContext(RecordContext);
  return (
    <Card>
      <img
        className={styles.smallphoto}
        src={recordcontext[recordcontext.length - 1].img}
        alt=""
      ></img>
      <div className={styles.cardtext}>
        {recordcontext[recordcontext.length - 1].descriptions[0].question}
      </div>
      <img
        className={styles.nextbtn}
        src={next}
        alt=""
        onClick={() => props.handlenext()}
      />
    </Card>
  );
}

function Page4(props: { handlenext: () => void }) {
  const recordcontext = useContext(RecordContext);
  const [value, setValue] = useState("");
  const handleInputChange = (e: any) => {
    setValue(e.target.value); // 更新 value 的状态
    console.log(e.target.value); // 可选：控制台输出当前的输入值
  };
  const handleVoiceInput = () => {
    //TODO 接麦克风和实时转写
  };
  const handleok = () => {
    recordcontext[recordcontext.length - 1].descriptions.push({
      question:
        recordcontext[recordcontext.length - 1].descriptions[0].question,
      answer: value,
    });
    props.handlenext();
  };
  return (
    <Card>
      <img
        className={styles.smallphoto}
        src={recordcontext[recordcontext.length - 1].img}
        alt=""
      ></img>
      <div className={styles.inputcard}>
        <textarea
          name=""
          id=""
          value={value} // 确保将 value 设置为 textarea 的值
          onChange={handleInputChange}
        ></textarea>
      </div>
      <div className={styles.btngroup}>
        <div className={styles.imgempty}></div>
        <img src={voice} alt="" onClick={handleVoiceInput} />
        <img className={styles.nextbtn} src={next} alt="" onClick={handleok} />
      </div>
    </Card>
  );
}

function Page5(props: { handlenext: () => void }) {
  const recordcontext = useContext(RecordContext);
  const [value, setValue] = useState("");
  const [question, setQuestion] = useState("");
  const handleInputChange = (e: any) => {
    setValue(e.target.value); // 更新 value 的状态
    console.log(e.target.value); // 可选：控制台输出当前的输入值
  };
  const handleVoiceInput = () => {
    //TODO 接麦克风和实时转写
  };
  const handleok = () => {
    recordcontext[recordcontext.length - 1].descriptions.push({
      question: question,
      answer: value,
    });
    props.handlenext();
  };
  return (
    <Card>
      <div className={styles.title} style={{ height: 174 }}>
        {question}
      </div>
      <div className={styles.inputcard}>
        <textarea
          name=""
          id=""
          value={value} // 确保将 value 设置为 textarea 的值
          onChange={handleInputChange}
        ></textarea>
      </div>
      <div className={styles.btngroup}>
        <div className={styles.imgempty}></div>
        <img src={voice} alt="" onClick={handleVoiceInput} />
        <img className={styles.nextbtn} src={next} alt="" onClick={handleok} />
      </div>
    </Card>
  );
}

function Page7(props: { handlenext: () => void }) {
  const recordcontext = useContext(RecordContext);
  return (
    <Card>
      <div className={styles.title}>
        看看你的
        <br />
        训练成果吧
      </div>
      <div className={styles.cardtext}>雷达图</div>
      <img
        className={styles.nextbtn}
        src={next}
        alt=""
        onClick={() => props.handlenext()}
      />
    </Card>
  );
}

function Page8(props: { handlenext: () => void }) {
  const recordcontext = useContext(RecordContext);
  const { pagenum, setPagenum } = useContext(PageContext);
  const { progress, setProgress } = useContext(ProgressContext);

  useEffect(() => {
    const timer = setTimeout(() => {
      // setPagenum(0);
      setProgress(100);
    }, 0);
    return () => clearTimeout(timer);
  });
  useEffect(() => {
    console.log(pagenum);
  }, [pagenum]);
  return (
    <>
      <NextCard></NextCard>
      <Card isanimation={true}>
        <div className={styles.title}>
          看看你的
          <br />
          训练成果吧
        </div>
        <div className={styles.cardtext}>雷达图</div>
        <img
          className={styles.nextbtn}
          src={next}
          alt=""
          // onClick={() => props.handlenext()}
        />
      </Card>
    </>
  );
}

function NextCard() {
  return (
    <div
      style={{
        width: 261,
        height: 513,
        borderRadius: 25,
        boxShadow: "3px 4px 4px 0px rgba(0, 0, 0, 0.25)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "space-evenly",
        position: "absolute",
        top: 60,
        zIndex: 1,
        border: "5px dashed rgba(109, 81, 49, 0.53)",
        color: "rgb(61, 48, 33)",
        fontFamily: "思源黑体 CN",
        fontSize: 25,
        fontWeight: 700,
      }}
    >
      现在还没有任务
      <br />
      哦，过一会再来
      <br />吧
    </div>
  );
}
