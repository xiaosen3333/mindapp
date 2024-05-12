import React, { useContext, useEffect, useState } from "react";
import { useRef } from "react";
import styles from "./Exercise.module.scss";
import next from "../../icon/next2.svg";
import next1 from "../../icon/next.svg";
import { PageContext, ProgressContext } from "../../context/MyContext";
import compelete from "../../icon/compelete.svg";
import { random } from "lodash";
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
type Circle = {
  id: number;
  x: number;
  y: number;
  opacity: number;
};

function Page2(props: { handleback: () => void; handlenext: () => void }) {
  const [timeLeft, setTimeLeft] = useState(60);
  const [circles, setCircles] = useState<Circle[]>([]);
  useEffect(() => {
    // 创建一个计时器
    const timer = setInterval(() => {
      setTimeLeft((prevTimeLeft) => prevTimeLeft - 1);
    }, 1000);

    // 当时间到达0时，清除计时器
    if (timeLeft === 0) {
      clearInterval(timer);
    }

    // 组件卸载时清除计时器
    return () => clearInterval(timer);
  }, [timeLeft]); // 依赖项为timeLeft，当timeLeft变化时，effect会重新运行

  return (
    <Card>
      <div className={styles.title}>
        {timeLeft > 0 ? `00:${timeLeft}` : "时间到!"}
      </div>
      <div
        style={{
          position: "relative",
          width: "80%",
          height: "300px", // 设置一个区域的高度
          border: "1px solid black",
        }}
      >
        {circles.map((circle) => (
          <div
            key={circle.id}
            style={{
              position: "absolute",
              left: `${circle.x}%`,
              top: `${circle.y}%`,
              width: "50px",
              height: "50px",
              borderRadius: "50%",
              backgroundColor: "blue",
              opacity: circle.opacity,
            }}
          />
        ))}
      </div>
    </Card>
  );
}

function Page3(props: { handlenext: () => void; handleback: () => void }) {
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

function Page7(props: { handlenext: () => void }) {
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
  const { pagenum, setPagenum } = useContext(PageContext);
  const { progress, setProgress } = useContext(ProgressContext);

  useEffect(() => {
    const timer = setTimeout(() => {
      setPagenum(3);
      setProgress(75);
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
