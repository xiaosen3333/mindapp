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
import AiTool2 from "../../server/AiTool2";
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
  const recordcontext = useContext(RecordContext);
  const [randomTitle, setRandomTitle] = useState("");
  useEffect(() => {
    // 提供的字符串数组
    const titles = [
      "记录下你今天最喜欢的一道菜",
      "记录今天做的一件家务",
      "记录今天看到的美景",
      "与今天交流中带给你快乐的人合照",
      "与今天一起散步的伙伴合照吧",
      "记录一下今天让你快乐的事物吧",
    ];

    // 从数组中随机选择一个标题
    setRandomTitle(titles[Math.floor(Math.random() * titles.length)]);
    recordcontext[recordcontext.length - 1].event = randomTitle;
  });
  return (
    <Card>
      <div className={styles.title}>{randomTitle}</div>
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
  const { transcript, browserSupportsSpeechRecognition } =
    useSpeechRecognition();
  const handleInputChange = (e: any) => {
    setValue(e.target.value); // 更新 value 的状态
  };
  let result = "";
  const ref = useRef<any>(null);
  const submit = () => {
    if (ref.current) {
      console.log("yes");
      ref.current.submitHoodle(value);
    }
  };
  const respondHoodle = (respond: string) => {
    result = respond.trim();
    // loadingRef.current.innerText = result;
    const questions: string[] = result.split("\n");
    // 创建一个正则表达式，用来匹配数字序号和问号

    // 遍历数组中的每个字符串，去除开头的两个字符和结尾的一个字符
    const cleanedQuestions: string[] = questions.map((question) => {
      return question.substring(3, question.length - 1);
    });

    console.log(cleanedQuestions);

    recordcontext[recordcontext.length - 1].descriptions.push({
      question: cleanedQuestions[0],
      answer: "",
    });
    recordcontext[recordcontext.length - 1].descriptions.push({
      question: cleanedQuestions[1],
      answer: "",
    });
    console.log(recordcontext);
    props.handlenext();
    // loadingRef.current
  };

  if (!browserSupportsSpeechRecognition) {
    console.log("!");
    return <span>Browser doesn't support speech recognition.</span>;
  }
  async function handleok() {
    submit();
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
      <AiTool respondHoodle={respondHoodle} ref={ref} />
    </Card>
  );
}

function Page6(props: { handlenext: () => void }) {
  const recordcontext = useContext(RecordContext);
  const [value, setValue] = useState("");
  const [question, setQuestion] = useState(
    recordcontext[recordcontext.length - 1].descriptions[0].question
  );
  const [index, setIndex] = useState(0);
  const { transcript, browserSupportsSpeechRecognition } =
    useSpeechRecognition();
  const ref = useRef<any>(null);

  const handleInputChange = (e: any) => {
    setValue(e.target.value); // 更新 value 的状态
  };
  if (!browserSupportsSpeechRecognition) {
    console.log("!");
    return <span>Browser doesn't support speech recognition.</span>;
  }
  const handleok = () => {
    if (recordcontext[recordcontext.length - 1].descriptions.length === index) {
      submit();
      return;
    }
    recordcontext[recordcontext.length - 1].descriptions[index].answer = value;
    setIndex(index + 1);
    if (
      recordcontext[recordcontext.length - 1].descriptions.length >
      index + 1
    ) {
      setQuestion(
        recordcontext[recordcontext.length - 1].descriptions[index + 1].question
      );
      setValue("");
    } else {
      submit();
      console.log(recordcontext);
    }
  };

  let result = "";
  const submit = () => {
    let descriptions = recordcontext[recordcontext.length - 1].descriptions;

    // 使用map来提取问题和答案，然后join它们成为一个字符串
    let descriptionsString = descriptions
      .map((item) => `${item.question}:${item.answer}`)
      .join("\n");

    console.log(descriptionsString);
    if (ref.current) {
      console.log("yes");

      ref.current.submitHoodle(descriptionsString);
    }
  };
  const respondHoodle = (respond: string) => {
    result = respond.trim();
    console.log(result);
    if (result.charAt(result.length - 1) === ".") {
      // 去掉最后一个字符（句号）
      result = result.slice(0, -1);
    }
    recordcontext[recordcontext.length - 1].conslusion = result;
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
        <img
          src={voice}
          alt=""
          onContextMenu={(e) => {
            e.preventDefault();
          }}
          onTouchStart={(e) => {
            SpeechRecognition.startListening();
          }}
          onTouchEnd={() => {
            SpeechRecognition.stopListening();
            setValue(value + transcript);
          }}
        />
        <img className={styles.nextbtn} src={next} alt="" onClick={handleok} />
      </div>
      <AiTool2 respondHoodle={respondHoodle} ref={ref} />
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
