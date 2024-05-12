import React, { useContext, useEffect, useState } from "react";
import { useRef } from "react";
import Camera from "../../components/Camera";
import Microphone from "../../components/Microphone";
import styles from "./Question.module.scss";
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
import AiTool3 from "../../server/AiTool3";

export const QuestionPage = (props: { pagenum: number }) => {
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
          handlenext={(number: number) => {
            setPage(number);
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
  const recordcontext = useContext(RecordContext);
  useEffect(() => {
    const shuffleArray = () => {
      const newArray = [...recordcontext];
      const length = newArray.length;
      if (length > 1) {
        for (let i = 0; i < length - 2; i++) {
          const randomIndex = Math.floor(Math.random() * (length - i - 1)) + i;
          // 交换元素
          [recordcontext[randomIndex], recordcontext[length - 1]] = [
            recordcontext[length - 1],
            recordcontext[randomIndex],
          ];
        }
      }
    };
    shuffleArray();
  });
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

function Page4(props: { handlenext: (number: number) => void }) {
  const recordcontext = useContext(RecordContext);
  const [value, setValue] = useState("");
  const { transcript, browserSupportsSpeechRecognition } =
    useSpeechRecognition();
  const ref = useRef<any>(null);

  const handleInputChange = (e: any) => {
    setValue(e.target.value); // 更新 value 的状态
    console.log(e.target.value); // 可选：控制台输出当前的输入值
  };

  const handleok = () => {
    submit();
    // props.handlenext();
  };
  let result = "";
  const submit = () => {
    let descriptions =
      "正确答案：" +
      recordcontext[recordcontext.length - 1].descriptions[0].answer +
      ";老人的答案:" +
      value;

    // 使用map来提取问题和答案，然后join它们成为一个字符串;
    console.log(descriptions);
    if (ref.current) {
      console.log("yes");
      ref.current.submitHoodle(descriptions);
    }
  };
  const respondHoodle = (respond: string) => {
    result = respond.trim();
    console.log(result);
    const answerRegex = /答案：正确|答案：错误/g;

    // 检查字符串是否包含匹配的模式
    const match = result.match(answerRegex);
    console.log(match);
    if (match && match[0] === "答案：正确") {
      recordcontext[recordcontext.length - 1].correct = true;
    } else {
      recordcontext[recordcontext.length - 1].correct = false;
    }
    if (recordcontext[recordcontext.length - 1].descriptions.length === 1) {
      props.handlenext(5);
    } else {
      props.handlenext(4);
    }
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
      <AiTool3 respondHoodle={respondHoodle} ref={ref} />
    </Card>
  );
}

function Page5(props: { handlenext: () => void }) {
  const recordcontext = useContext(RecordContext);
  const [tempvalue, setTempValue] = useState("");
  const [value, setValue] = useState("");
  const { transcript, browserSupportsSpeechRecognition } =
    useSpeechRecognition();
  const ref = useRef<any>(null);

  const handleInputChange = (e: any) => {
    setValue(e.target.value); // 更新 value 的状态
    console.log(e.target.value); // 可选：控制台输出当前的输入值
  };

  const handleok = () => {
    submit();
    // props.handlenext();
  };
  let result = "";
  const submit = () => {
    let descriptions =
      "正确答案：" +
      recordcontext[recordcontext.length - 1].descriptions[1].answer +
      ";老人的答案:" +
      value;

    // 使用map来提取问题和答案，然后join它们成为一个字符串;
    console.log(descriptions);
    if (ref.current) {
      console.log("yes");
      ref.current.submitHoodle(descriptions);
    }
  };
  const respondHoodle = (respond: string) => {
    result = respond.trim();
    console.log(result);
    const answerRegex = /答案：正确|答案：错误/g;

    // 检查字符串是否包含匹配的模式
    const match = result.match(answerRegex);
    console.log(match);
    if (match && match[0] === "答案：正确") {
      recordcontext[recordcontext.length - 1].correct = true;
    } else {
      recordcontext[recordcontext.length - 1].correct = false;
    }
    props.handlenext();
  };
  if (!browserSupportsSpeechRecognition) {
    console.log("!");
    return <span>Browser doesn't support speech recognition.</span>;
  }
  return (
    <Card>
      <div className={styles.title}>
        {recordcontext[recordcontext.length - 1].correct
          ? "没错～！"
          : "记错啦～"}
        <br />
        {recordcontext[recordcontext.length - 1].descriptions[1].question}
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
      <AiTool3 respondHoodle={respondHoodle} ref={ref} />
    </Card>
  );
}

function Page7(props: { handlenext: () => void }) {
  const recordcontext = useContext(RecordContext);
  return (
    <Card>
      <div className={styles.title}>
        {recordcontext[recordcontext.length - 1].correct
          ? "你真厉害！"
          : "再接再厉！"}
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
      setPagenum(2);
      setProgress(50);
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
        background: "rgb(253, 185, 39)",
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
