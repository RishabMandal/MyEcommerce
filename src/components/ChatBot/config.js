import { createChatBotMessage } from "react-chatbot-kit";
import StartBtn from "./StartBtn";

const config = {
  initialMessages: [
    createChatBotMessage(`Welcome to ShopKart!`, { widget: "startBtn" }),
  ],
  botName: "ShopBot",
  customStyles: {
    botMessageBox: {
      backgroundColor: "#376B7E",
    },
    chatButton: {
      backgroundColor: "#dc2626",
    },
  },
  widgets: [
    {
      widgetName: "startBtn",
      widgetFunc: (props) => <StartBtn {...props} />,
    },
  ],
};

export default config;
