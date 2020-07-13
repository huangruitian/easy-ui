import React, {useState} from "react";
import { storiesOf } from "@storybook/react";
import Transition from "./index";

const defaultTransition = () => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [state, setState] = useState(true)
  return (
    <>
      <Transition in={state} timeout={300} animation="zoom-in-top">
        <div>zoom-in-top</div>
      </Transition>
      <button onClick={() => setState(!state)}>显示隐藏</button>
    </>
  );
};

storiesOf("Transition", module).add("Transition 基础用法", defaultTransition);
