import React, { useContext, useEffect, useState } from "react";
import { useRef } from "react";
import Camera from "../../components/Camera";
import Microphone from "../../components/Microphone";
import styles from "./Exercise.module.scss";
import next from "../../icon/next2.svg";
import next1 from "../../icon/next.svg";

import camera from "../../icon/camera.svg";
import back from "../../icon/back.svg";
import { PageContext, RecordContext } from "../../context/MyContext";
import backbtn from "../../icon/backbtn.svg";
import voice from "../../icon/voice.svg";
import compelete from "../../icon/compelete.svg";

export const ExercisePage = (props: { pagenum: number }) => {
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
        <Page7
          handlenext={() => {
            setPage(4);
          }}
        />
      );
    case 4:
      return (
        <Page8
          handlenext={() => {
            setPage(5);
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
      <div className={styles.title}>辛苦啦</div>
      <div className={styles.cardtext}>
        让我们
        <br />
        来做个手指操
        <br /> 放松放松吧！
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
      <div className={styles.title}>00:00</div>
      <div className={styles.bigcard}>
        结束啦！
        <br />
        <br />
        今天的运动，
        <br />
        是送给身体
        <br />
        最好的礼物！
        <img
          className={styles.nextbtn}
          src={next1}
          alt=""
          onClick={() => props.handlenext()}
        />
      </div>
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
        让健康与活力
        <br />
        伴您每一天！
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

  useEffect(() => {
    const timer = setTimeout(() => {
      setPagenum(3);
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
          让健康与活力
          <br />
          伴您每一天！
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
        background: "rgb(100, 96, 203)",
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
