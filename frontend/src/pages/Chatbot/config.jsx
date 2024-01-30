import React from 'react'
import { createChatBotMessage } from "react-chatbot-kit";
import WidgetOptions from "./components/WidgetOptions/WidgetOptions.jsx";
import LinkList from "./components/LinkList/LinkList.jsx";

const config = {
  botName: "AgriBot",
  initialMessages: [
    createChatBotMessage("Hi! AgriBot is here to help you. What do you want to know?",
    {
      widget: "widgetOptions",
    }),
  ],
  widgets: [
    {
      widgetName: "widgetOptions",
      widgetFunc: (props) => <WidgetOptions {...props} />,
    },
    {
      widgetName: "agricultureLinks",
      widgetFunc: (props) => <LinkList {...props} />,
      props: {
        options: [
          {
            text: "Origins of Agriculture",
            url:
              "https://www.britannica.com/topic/agriculture",
            id: 1,
          },
          {
            text: "Agriculture in Malaysia",
            url:
              "https://www.trade.gov/country-commercial-guides/malaysia-agricultural-sector",
            id: 2,
          },
        ],
      },
    },
    {
      widgetName: "noPovertyLinks",
      widgetFunc: (props) => <LinkList {...props} />,
      props: {
        options: [
          {
            text: "Overview of SDG1: No Poverty ",
            url:
              "https://www.un.org/sustainabledevelopment/poverty/",
            id: 1,
          },
          {
            text: "Additional Information",
            url:
              "https://www.un.org/sustainabledevelopment/wp-content/uploads/2023/09/Goal-1_Fast-Facts.pdf",
            id: 2,
          },
        ],
      },
    },
    {
      widgetName: "consumpLinks",
      widgetFunc: (props) => <LinkList {...props} />,
      props: {
        options: [
          {
            text: "Overview of SDG12: Responsible Consumption and Production",
            url:
              "https://www.globalgoals.org/goals/12-responsible-consumption-and-production/",
            id: 1,
          },
          {
            text: "Additional Information",
            url:
              "https://www.un.org/sustainabledevelopment/sustainable-consumption-production/",
            id: 2,
          },
        ],
      },
    },
  ],
  customStyles: {
    botMessageBox: {
      backgroundColor: "#376B7E",
    },
    chatButton: {
      backgroundColor: "#376B7E",
    },
  },
};

export default config;
