import React, { useState } from "react";

const progress: number = 10;

export const ProgressContext = React.createContext<{ progress: number }>({
  progress,
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
  date: string;
  descriptions: {
    question: string;
    answer: string;
  }[];
  conslusion: string;
}[] = [
  {
    img: "",
    date: "",
    descriptions: [{ question: "记录下你今天最喜欢的一道菜", answer: "" }],
    conslusion: "",
  },
];

export const RecordContext = React.createContext(record);