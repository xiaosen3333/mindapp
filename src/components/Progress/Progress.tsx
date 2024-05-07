import React from 'react';
import { Flex, Progress } from 'antd';

export const MyProgress = (props:{progress:number}) => {
  return(
    <Flex vertical gap="small" style={{ width: 229,position:'relative',top:-10 }}>
      <Progress trailColor="rgb(230, 206, 172)" percent={props.progress} size="default" strokeColor="rgb(125, 101, 66)" showInfo={false}/>
    </Flex>
)};
