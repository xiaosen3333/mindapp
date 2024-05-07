import React, { useContext, useEffect, useState } from "react";
import { Layout, theme, Image } from "antd";
import { PageContext, ProgressContext } from "../../context/MyContext";
import { MyProgress } from "../Progress/Progress";
import menu from "../../../src/icon/menu.svg";
import user from "../../../src/icon/user.svg";
import { RecordPage } from "../../pages/Record/Record";
import { QuestionPage } from "../../pages/Question/Question";
import { ExercisePage } from "../../pages/Exercise/Exercise";
import { DataPage } from "../../pages/Data/Data";
const { Header, Content, Footer } = Layout;

export const MyLayout: React.FC = () => {
  const progress = useContext(ProgressContext);
  const [pagenum, setPagenum] = useState(0);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  useEffect(() => {
    console.log(pagenum);
  }, [pagenum]);
  return (
    <Layout
      style={{ height: 616, display: "flex", backgroundColor: "#fcf5eb" }}
    >
      <Header
        style={{
          height: 60,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "23px 23px 19px 23px",
          backgroundColor: "#FCF5EB",
        }}
      >
        <img src={menu} alt=""></img>
        <img src={user} alt=""></img>
      </Header>
      <PageContext.Provider value={{ pagenum, setPagenum }}>
        <Content style={{ padding: "0px 13px", backgroundColor: "#FCF5EB" }}>
          {pagenum === 0 && <RecordPage pagenum={0}></RecordPage>}
          {pagenum === 1 && <QuestionPage pagenum={0}></QuestionPage>}
          {pagenum === 2 && <ExercisePage pagenum={0}></ExercisePage>}
          {pagenum === 3 && <DataPage pagenum={5}></DataPage>}
        </Content>
      </PageContext.Provider>

      <Footer
        style={{
          height: 32,
          display: "flex",
          textAlign: "center",
          justifyContent: "center",
          backgroundColor: "#FCF5EB",
          padding: "9px 0px 19px 0px",
        }}
      >
        <MyProgress progress={progress.progress}></MyProgress>
      </Footer>
    </Layout>
  );
};