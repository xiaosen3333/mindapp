import React, { useContext, useEffect, useState } from "react";
import { useRef } from "react";

import styles from "./Manage.module.scss";
import next from "../../icon/next.svg";
import {
  DailyRecordContext,
  PageContext,
  ProgressContext,
  RecordContext,
} from "../../context/MyContext";
import ReactEcharts from "echarts-for-react";
import echarts, { color } from "echarts";
import menu from "../../../src/icon/menu.svg";
import user from "../../../src/icon/user.svg";
import dateimg from "../../../src/icon/date.svg";
import deleteimg from "../../../src/icon/delete.svg";
import detail from "../../../src/icon/detail.svg";
import share from "../../../src/icon/share.svg";
import { Carousel } from "antd";
import back1 from "../../../src/icon/back1.svg";

export const ManagePage = (props: { changemode: () => void }) => {
  const [enter, setEnter] = useState(0);
  const dailyrecord = useContext(DailyRecordContext);
  const [isenter, setIsEnter] = useState(false);
  const [record, setRecord] = useState(dailyrecord[enter]);
  useEffect(() => {
    setRecord(dailyrecord[enter]);
  }, [enter]);
  useEffect(() => {
    console.log(record);
  }, [record]);
  return (
    <>
      {!isenter ? (
        <div className={styles.body}>
          <div className={styles.head}>
            <img src={menu} alt=""></img>
            <img src={user} onClick={() => props.changemode()} alt=""></img>
          </div>
          <img src={dateimg} alt="" className={styles.headdate}></img>

          <Carousel
            className={styles.records}
            afterChange={setEnter}
            dots={{ className: styles.dots }}
            easing="ease-in"
            effect="scrollx"
          >
            {dailyrecord.map((record, index) => {
              return (
                <div className={styles.item}>
                  <DailyCard
                    handleclick={() => setEnter(index)}
                    record={record}
                    animate={enter === index}
                    onClick={() => setIsEnter(true)}
                  ></DailyCard>
                  <br />
                  <br />
                  <br />
                  <br />
                  <br />
                  <br />
                  <br />
                  {record.date}
                </div>
              );
            })}
          </Carousel>
          <div className={styles.btns}>
            <img src={detail} alt="" onClick={() => setIsEnter(true)} />
            <img src={deleteimg} alt="" />
            <img src={share} alt="" />
          </div>
        </div>
      ) : (
        <div className={styles.body}>
          <div className={styles.head}>
            <img src={back1} alt="" onClick={() => setIsEnter(false)}></img>
          </div>
          <Carousel
            className={styles.detailrecords}
            dots={{ className: styles.dots }}
            easing="ease-in"
          >
            {record && (
              <div className={styles.item}>
                <div className={styles.itembody}>
                  <div className={styles.card1}>
                    <div className={styles.date}>{record.card1.date}</div>
                    <img src={record.card1.img} alt="" />
                    <div className={styles.summarizecard}>
                      <div className={styles.summarize}>
                        {record.card1.summarize}
                      </div>
                    </div>
                  </div>
                  {record.card1.date.split(" ")[0]}
                </div>
              </div>
            )}
            {record && (
              <div className={styles.item}>
                <div className={styles.itembody}>
                  <div className={styles.card2}>
                    <div className={styles.date}>{record.card2.date}</div>
                    <img src={record.card2.img} alt="" />
                    <div className={styles.summarizecard}>
                      <div className={styles.summarize}>
                        {record.card2.summarize}
                      </div>
                    </div>
                  </div>
                  {record.card2.date.split(" ")[0]}
                </div>
              </div>
            )}
            {record && (
              <div className={styles.item}>
                <div className={styles.itembody}>
                  <div className={styles.card3}>
                    <div className={styles.date}>{record.card3.date}</div>
                    <img src={record.card3.img} alt="" />
                    <div className={styles.summarizecard}>
                      <div className={styles.summarize}>
                        {record.card3.summarize}
                      </div>
                    </div>
                  </div>
                  {record.card3.date.split(" ")[0]}
                </div>
              </div>
            )}
            {record && (
              <div className={styles.item}>
                <div className={styles.itembody}>
                  <div className={styles.card4}>
                    <div className={styles.date}>{record.card4.date}</div>
                    <img src={record.card4.img} alt="" />
                  </div>
                  {record.card4.date.split(" ")[0]}
                </div>
              </div>
            )}
            {record && (
              <div className={styles.item}>
                <div className={styles.itembody}>
                  <div className={styles.card5}>
                    <img src={record.card5.img} alt="" />
                  </div>
                  {record.card5.date.split(" ")[0]}
                </div>
              </div>
            )}
          </Carousel>
          <div className={styles.btns}>
            <img src={detail} alt="" />
            <img src={deleteimg} alt="" />
            <img src={share} alt="" />
          </div>
        </div>
      )}
    </>
  );
};

function DailyCard(props: {
  handleclick: () => void;
  record: any;
  animate: boolean;
  onClick: () => void;
}) {
  useEffect(() => {
    console.log(props.animate);
  }, [props.animate]);
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        // alignItems: "center",
        width: "100%",
      }}
      onClick={props.onClick}
    >
      <div className={styles.dailycard}>
        <div className={props.animate ? styles.card1animate : styles.card1}>
          <div className={styles.date}>{props.record.card1.date}</div>
          <img src={props.record.card1.img} alt="" />
          <div className={styles.summarizecard}>
            <div className={styles.summarize}>
              {props.record.card1.summarize}
            </div>
          </div>
        </div>
        <div className={props.animate ? styles.card2animate : styles.card2}>
          <div className={styles.date}>{props.record.card2.date}</div>
          <img src={props.record.card2.img} alt="" />
          <div className={styles.summarizecard}>
            <div className={styles.summarize}>
              {props.record.card2.summarize}
            </div>
          </div>
        </div>
        <div className={props.animate ? styles.card3animate : styles.card3}>
          <div className={styles.date}>{props.record.card3.date}</div>
          <img src={props.record.card3.img} alt="" />
          <div className={styles.summarizecard}>
            <div className={styles.summarize}>
              {props.record.card3.summarize}
            </div>
          </div>
        </div>
        <div className={props.animate ? styles.card4animate : styles.card4}>
          <div className={styles.date}>{props.record.card4.date}</div>
          <img src={props.record.card4.img} alt="" />
        </div>
        <div className={props.animate ? styles.card5animate : styles.card5}>
          <img src={props.record.card5.img} alt="" />
        </div>
      </div>
    </div>
  );
}
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
