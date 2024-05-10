import { FC, forwardRef, useImperativeHandle, useState } from "react";
import { requestObj } from "../config";
import { getWebsocketUrl } from "../utils";
interface AiToolProps {
  isText?: boolean;
  respondHoodle: (result: string) => void; //关联数据
  loadHoodle?: (isLoading: boolean) => void; //加载状态
  errorHoodle?: (isLoading: boolean) => void; //失败调用
}

interface CropperRef {
  submitHoodle: (v: any) => void; //父类调用
}

const AiTool = forwardRef<CropperRef, AiToolProps>(function AiTool(
  { isText, respondHoodle, errorHoodle },
  ref
) {
  let result: string = "";
  const [historyMessage, setHistoryMessage] = useState<any[]>([
    {
      role: "system",
      content:
        "作为服务老人的大学生志愿者，我的任务是倾听他们讲述生活中的事情，并基于他们的描述提出五个递进式的问题，以更深入地了解事件。我会尊重老人，用礼貌的语言提问，每次提问不超过10个字，确保问题递进且不偏离主题。在老人讲述完一件事情后，我会依次提出两个问题，老人也会依次回答。",
    },
  ]);

  useImperativeHandle(ref, () => ({
    submitHoodle: sendMsg,
  }));
  const sendMsg = async (questionText: string) => {
    result = " ";
    // 获取请求地址
    let myUrl = await getWebsocketUrl();
    // 获取输入框中的内容
    // 每次发送问题 都是一个新的websocket请求
    let socket = new WebSocket(myUrl);
    // 监听websocket的各阶段事件 并做相应处理
    socket.addEventListener("open", (event) => {
      console.log(event);

      // 发送消息
      let params = {
        header: {
          app_id: requestObj.APPID,
          uid: "wzz",
        },
        parameter: {
          chat: {
            domain: "generalv3.5",
            temperature: 0.5,
            max_tokens: 1024,
          },
        },
        payload: {
          message: {
            // 如果想获取结合上下文的回答，需要开发者每次将历史问答信息一起传给服务端，如下示例
            // 注意：text里面的所有content内容加一起的tokens需要控制在8192以内，开发者如有较长对话需求，需要适当裁剪历史信息
            text: [
              ...historyMessage,
              // ....... 省略的历史对话
              { role: "user", content: questionText }, //# 最新的一条问题，如无需上下文，可只传最新一条问题
            ],
          },
        },
      };
      socket.send(JSON.stringify(params));
    });
    socket.addEventListener("message", (event) => {
      let data = JSON.parse(event.data);
      console.log(event);
      console.log(data);
      if (!data.payload) {
        socket.close();
        return;
      }
      result += data.payload.choices.text[0].content;
      if (data.header.code !== 0) {
        console.log("出错了", data.header.code, ":", data.header.message);
        // 出错了"手动关闭连接"
        socket.close();
      }
      if (data.header.code === 0) {
        // 对话已经完成
        if (data.payload.choices.text && data.header.status === 2) {
          setTimeout(() => {
            // "对话完成，手动关闭连接"
            socket.close();
          }, 1000);
        }
      }
    });
    socket.addEventListener("close", (event) => {
      console.log(event);
      respondHoodle(result);
      // 对话完成后socket会关闭，将聊天记录换行处理
    });
    socket.addEventListener("error", (event) => {
      if (errorHoodle) errorHoodle(true);
      console.log("连接发送错误！！", event);
    });
  };
  // return result;
  return <div></div>;
});
export default AiTool;
