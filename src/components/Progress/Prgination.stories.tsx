import React from "react";
import { storiesOf } from "@storybook/react";
import Progress from "./index";

const defaultTransition = () => {
  return (
    <>
      <Progress percent={10} showText/>
    </>
  );
};

storiesOf("Progress", module).add("Progress 基础用法", defaultTransition);
