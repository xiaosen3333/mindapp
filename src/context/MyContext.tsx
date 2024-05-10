import React, { useState } from "react";

const progress: number = 0;

export const ProgressContext = React.createContext<{
  progress: number;
  setProgress: React.Dispatch<React.SetStateAction<number>>;
}>({
  progress,
  setProgress: () => {},
});
interface PageContextType {
  pagenum: number;
  setPagenum: React.Dispatch<React.SetStateAction<number>>;
}

// 创建一个context对象，并提供默认值
export const PageContext = React.createContext<PageContextType>({
  pagenum: 0,
  setPagenum: () => {},
});

const record: {
  img: string;
  event: string;
  date: string;
  descriptions: {
    question: string;
    answer: string;
  }[];
  conslusion: string;
}[] = [
  {
    event: "",
    img: "",
    date: "",
    descriptions: [{ question: "记录下你今天最喜欢的一道菜", answer: "" }],
    conslusion: "",
  },
];

export const RecordContext = React.createContext(record);
