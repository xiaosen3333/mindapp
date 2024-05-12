import React, { useContext, useEffect, useState } from "react";
import { useRef } from "react";

import styles from "./Data.module.scss";
import next from "../../icon/next.svg";
import {
  PageContext,
  ProgressContext,
  RecordContext,
} from "../../context/MyContext";
import ReactEcharts from "echarts-for-react";
import echarts, { color } from "echarts";

const option = {
  color: ["rgba(255, 255, 255, 0.88)"],
  radar: {
    // shape: 'circle',
    indicator: [
      { name: "知觉域", max: 40 },
      { name: "注意域", max: 40 },
      { name: "记忆域", max: 40 },
      { name: "思维域", max: 40 },
      { name: "推理域", max: 40 },
      { name: "判断域", max: 40 },
    ],
    splitNumber: 4,
    radius: 70,
    splitArea: {
      areaStyle: {
        color: [
          "rgba(0, 0, 0, 0)",
          "rgba(0, 0, 0, 0)",
          "rgba(0, 0, 0, 0)",
          "rgba(0, 0, 0, 0)",
        ],
        shadowColor: "rgba(0, 0, 0, 0.2)",
        shadowBlur: 10,
      },
    },
    axisLine: {
      lineStyle: {
        color: "rgba(255, 255, 255, 0.88)",
      },
    },
    splitLine: {
      lineStyle: {
        type: ["solid", "solid", "dashed", "dashed"],
        color: [
          "rgb(255, 250, 254)",
          "rgba(255, 255, 255, 0.91)",
          "rgba(255, 255, 255, 0.86)",
          "rgba(255, 255, 255, 0.86)",
        ],
      },
    },
    axisName: {
      formatter: "{value}",
      color: "rgb(255, 255, 255)",
      fontWeight: "bold",
      fontSize: 16,
      padding: [5, 1, 5, 1],
    },
    nameGap: 2,
  },
  series: [
    {
      name: "Budget vs spending",
      type: "radar",
      data: [
        {
          value: [25, 25, 18, 25, 32, 25],
          name: "Allocated Budget",
          symbol: "none",
          areaStyle: {
            color: "rgba(215, 214, 231, 0.93)",
          },
        },
      ],
    },
  ],
};
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
function Page7(props: { handlenext: () => void }) {
  const recordcontext = useContext(RecordContext);
  useEffect(() => {
    const timer = setTimeout(() => {
      props.handlenext();
    }, 2000);
    return () => clearTimeout(timer);
  });
  return (
    <Card>
      <div className={styles.title}>
        看看你的
        <br />
        训练成果吧
      </div>
      <div className={styles.cardtext}>
        <ReactEcharts option={option}></ReactEcharts>
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
  const [animation, setAnimation] = useState(false);
  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimation(true);
    }, 2000);
    return () => clearTimeout(timer);
  });
  useEffect(() => {
    const timer = setTimeout(() => {
      // setPagenum(0);
      setProgress(100);
    }, 0);
    return () => clearTimeout(timer);
  });
  return (
    <>
      <NextCard></NextCard>
      <Card isanimation={animation}>
        <div className={styles.title}>
          看看你的
          <br />
          训练成果吧
        </div>
        <div className={styles.cardtext}>
          <ReactEcharts option={option}></ReactEcharts>
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
