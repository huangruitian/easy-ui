import React, { FC } from "react";
import InputNumber from "../InputNumber";

export interface paginationType {
  current?: number;
  pageSize?: number;
  total?: number;
  //选择页码变化后的回调
  onChange?: (pageNo: number, pageSize: number) => void;
}

const Pagination: FC<paginationType> = (props) => {
  const { current, pageSize, total, onChange } = props;
  return (
    <div style={{ border: "1px solid red" }}>
      <span>首页</span>
      <span>上一页</span>
      <span>
        调转到
        <InputNumber
          min={1}
        //   onChange={(pageNo) => onChange(pageNo, pageSize)}
        />
        页
      </span>
      <span>下一页</span>
      <span>最后一页</span>
    </div>
  );
};

Pagination.defaultProps = {};

Pagination.displayName = "Pagination";

export default Pagination;
