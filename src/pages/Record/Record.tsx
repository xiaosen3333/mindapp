import React, { useContext, useEffect, useState } from "react";
import { useRef } from "react";
import Camera from "../../components/Camera";
import Microphone from "../../components/Microphone";
import styles from "./Record.module.scss";
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
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import AiTool from "../../server/AiTool";
interface IProps {
  datas?: any[];
}
//user：true代表用户信息，反之ai
interface messageInfo {
  text: string;
  user: boolean;
}
export const RecordPage = (props: { pagenum: number }) => {
  const [page, setPage] = useState<number>(props.pagenum);
  switch (page) {
    case 0:
      return (
        <Page1
          handlenext={() => {
            setPage(1);
          }}
        />
      );
    case 1:
      return (
        <Page2
          handleback={() => {
            setPage(0);
            console.log("0");
          }}
          handlenext={() => {
            setPage(2);
          }}
        />
      );
    case 2:
      return (
        <Page3
          handlenext={() => {
            setPage(3);
          }}
          handleback={() => {
            setPage(1);
          }}
        />
      );
    case 3:
      return (
        <Page4
          handlenext={() => {
            setPage(4);
          }}
        />
      );
    case 4:
      return (
        <Page5
          handlenext={() => {
            setPage(5);
          }}
        />
      );
    case 5:
      return (
        <Page6
          handlenext={() => {
            setPage(6);
          }}
        />
      );
    case 6:
      return (
        <Page7
          handlenext={() => {
            setPage(7);
          }}
        />
      );
    case 7:
      return (
        <Page8
          handlenext={() => {
            setPage(0);
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
        记录下你今天
        <br />
        最喜欢的一道菜
      </div>
      <div className={styles.camera}>
        <img src={camera} alt="" onClick={() => props.handlenext()} />
      </div>
      <img className={styles.nextbtn} src={next} alt="" />
    </Card>
  );
}

function Page2(props: { handleback: () => void; handlenext: () => void }) {
  return (
    <div className={styles.Page2}>
      <img
        className={styles.backbtn}
        src={back}
        alt=""
        onClick={() => props.handleback()}
      ></img>
      <Camera next={props.handlenext}></Camera>
    </div>
  );
}

function Page3(props: { handlenext: () => void; handleback: () => void }) {
  const recordcontext = useContext(RecordContext);
  return (
    <Card>
      <div className={styles.title}>拍摄完成！</div>
      <img
        src={recordcontext[recordcontext.length - 1].img}
        alt=""
        className={styles.photo}
      />
      <div className={styles.foot}>
        <div className={styles.footbtn}>
          <img
            className={styles.backbtn}
            src={backbtn}
            alt=""
            onClick={() => props.handleback()}
          />
          <img
            className={styles.nextbtn}
            src={next}
            alt=""
            onClick={() => props.handlenext()}
          />
        </div>
        <div className={styles.footbtn}>
          <span>重拍</span>
          <span>继续</span>
        </div>
      </div>
    </Card>
  );
}

function Page4(props: { handlenext: () => void }) {
  const recordcontext = useContext(RecordContext);
  return (
    <Card>
      <img
        className={styles.smallphoto}
        src={recordcontext[recordcontext.length - 1].img}
        alt=""
      ></img>
      <div className={styles.cardtext}>
        使用语音或键盘
        <br />
        描述下<br></br>这张照片吧！
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

function Page5(props: { handlenext: () => void }) {
  const recordcontext = useContext(RecordContext);
  const [tempValue, setTempValue] = useState("");
  const [value, setValue] = useState("");
  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition,
  } = useSpeechRecognition();
  const handleInputChange = (e: any) => {
    setValue(e.target.value); // 更新 value 的状态
  };
  const [question, setQuestion] = useState<string>("");
  // const [result, setResult] = useState<string>('');
  let result = "";
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [messageList, setMessageList] = useState<messageInfo[]>([]);
  const ref = useRef<any>(null);
  const messageContainerRef = useRef<any>(null);
  const loadingRef = useRef<any>(null);
  const submit = () => {
    setQuestion("");
    console.log(messageList);
    if (!messageList.length) {
      setMessageList([
        {
          user: true,
          text: question,
        },
      ]);
      console.log(messageList);
    } else {
      setMessageList([
        ...messageList,
        {
          user: true,
          text: question,
        },
      ]);
      console.log(messageList);
    }
    if (ref.current) {
      console.log("yes");
      ref.current.submitHoodle("你好");
    }
  };
  const respondHoodle = (respond: string) => {
    result = respond;
    loadingRef.current.innerText = result;
    console.log("respond", result);
    // loadingRef.current
  };
  const overRespond = (v: boolean) => {
    if (!v) {
      setMessageList((prevList) => [
        ...prevList,
        { user: false, text: result },
      ]);
      console.log(messageList);
    }
    setIsLoading(v);
  };

  if (!browserSupportsSpeechRecognition) {
    console.log("!");
    return <span>Browser doesn't support speech recognition.</span>;
  }
  async function handleok() {
    recordcontext[recordcontext.length - 1].descriptions.push({
      question: recordcontext[recordcontext.length - 1].event,
      answer: value,
    });
    await setQuestion(value);
    submit();
    //TODO 调用语言模型，传入问题和答案，继续提问，跳入下一页面

    // props.handlenext();
  }
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
        <img
          src={voice}
          alt=""
          onContextMenu={(e) => {
            e.preventDefault();
          }}
          onTouchStart={(e) => {
            SpeechRecognition.startListening();
            console.log("!");
          }}
          onTouchEnd={() => {
            SpeechRecognition.stopListening();
            setValue(value + transcript);
            console.log("!!");
          }}
        />
        <img className={styles.nextbtn} src={next} alt="" onClick={handleok} />
      </div>
      <AiTool
        loadHoodle={overRespond}
        respondHoodle={respondHoodle}
        ref={ref}
      />
    </Card>
  );
}

function Page6(props: { handlenext: () => void }) {
  const recordcontext = useContext(RecordContext);
  const [value, setValue] = useState("");
  const [question, setQuestion] = useState("");
  const handleInputChange = (e: any) => {
    setValue(e.target.value); // 更新 value 的状态
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
        {recordcontext[recordcontext.length - 1].conslusion}
      </div>
      <div className={styles.cardtext}>
        <img src={compelete} alt="" />
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

function Page8(props: { handlenext: () => void }) {
  const recordcontext = useContext(RecordContext);
  const { pagenum, setPagenum } = useContext(PageContext);
  const { progress, setProgress } = useContext(ProgressContext);
  useEffect(() => {
    const timer = setTimeout(() => {
      setPagenum(1);
      setProgress(25);
    }, 1100);
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
          {recordcontext[recordcontext.length - 1].conslusion}
        </div>
        <div className={styles.cardtext}>
          <img src={compelete} alt="" />
        </div>
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
        background: "rgb(74, 163, 120)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "space-evenly",
        position: "absolute",
        top: 60,
        zIndex: 1,
      }}
    ></div>
  );
}
