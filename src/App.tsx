import React, { useState } from "react";
import Button from "./components/Button/Button";
import Menu from "./components/Menu/Menu";
import MenuItem from "./components/Menu/MenuItem";
// import Button from "./components/Button";

const App: React.FC = () => {
  const [visibile, setVisibile] = useState(true)
  return (
    <div>
      <a></a>
      <Button onClick={(e) => {
        console.log('visibile', visibile)
        setVisibile(!visibile)
      }}> 显示/隐藏 </Button>
      <Menu
        defaultIndex={'0'}
        onSelect={(index) => {
          alert(index)
        }}>
        <MenuItem index={"0"}>第一项</MenuItem>
        <MenuItem index={"1"}>第二项</MenuItem>
        <MenuItem index={"2"}>第三项</MenuItem>
      </Menu>
    </div>
  );
}

export default App;
