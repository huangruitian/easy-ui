import React, { FC, useState } from "react";
import InputNumber from "../InputNumber";
import Button from "../Button";
import Select from "../Select";

export interface paginationType {
  /** 当前页 */
  current: number;
  /** 页容量 */
  pageSize: number;
  /** 总数 */
  total: number;
  //选择页码变化后的回调
  onChange?: (pageNo: number, pageSize: number) => void;
}

const Pagination: FC<paginationType> = (props) => {
  const { current, pageSize, total, onChange } = props;
  const [pageNo, setPageNo] = useState<number>(current || 1);
  const [_pageSize, setPageSize] = useState<number>(pageSize || 10);
  const maxPageNo = Math.ceil(total / _pageSize);

  const handleChangePageNo = (pageNo: number) => {
    if (pageNo > maxPageNo || pageNo < 1) {
      return;
    }
    if (onChange) {
      onChange(pageNo, _pageSize);
    }
    setPageNo(pageNo);
  };

  const handleFirstPageNo = () => {
    handleChangePageNo(1);
  };

  const handleLastPageNo = () => {
    handleChangePageNo(maxPageNo);
  };

  const handleNextPageNo = () => {
    handleChangePageNo(pageNo + 1);
  };

  const handlePrePageNo = () => {
    handleChangePageNo(pageNo - 1);
  };

  const handleChangeInputNumber = (page: number | string) => {
    console.log("handleChangePageNo", page);
    const pageNo = +page || 1;
    handleChangePageNo(pageNo);
  };

  const handleChangeSelect = (selectedValue: string, value: string []) => {
    const pageSize = +value[0] || 10;
    setPageSize(pageSize);
    setPageNo(1)
    if (onChange) {
      // 选了页容量要第一页开始算
      onChange(1, pageSize);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.keyCode !== 13) {
      return;
    }
    const inpDom = e.target as HTMLInputElement;
    const pageNo = +inpDom.value;
    // if (pageNo < 1 || pageNo > maxPageNo) {
    //   inpDom.value = "";
    //   return;
    // }
    handleChangePageNo(pageNo);
  };

  return (
    <div
      style={{
        border: "1px solid red",
        display: "flex",
        justifyContent: "flex-end",
        paddingRight: 20,
      }}
    >
      <div style={{ marginRight: 20, color: "red" }}>当前页：{pageNo}</div>
      <div style={{ display: "flex" }}>
        <Button onClick={handleFirstPageNo}> 首页 </Button>
        <Button btnType="link" onClick={handlePrePageNo}>
          上一页
        </Button>
        <span>
          <InputNumber
            style={{ width: 60 }}
            min={1}
            max={maxPageNo}
            onChange={handleChangeInputNumber}
            defaultValue={1}
            onKeyDown={handleKeyDown}
          />
        </span>
        <Button btnType="link" onClick={handleNextPageNo}>
          下一页
        </Button>
        <Button onClick={handleLastPageNo}> 最后一页 </Button>
        <span style={{display:"line-block", paddingLeft:20}}>选页：</span>
        <Select onChange={handleChangeSelect} defaultValue={['0']}>
          <Select.Option value="10">10页</Select.Option>
          <Select.Option value="20">20页</Select.Option>
          <Select.Option value="30">30页</Select.Option>
          <Select.Option value="40">40页</Select.Option>
          <Select.Option value="50">50页</Select.Option>
        </Select>
      </div>
    </div>
  );
};

Pagination.defaultProps = {
  current: 1,
  pageSize: 10,
  total: 0,
};

Pagination.displayName = "Pagination";

export default Pagination;
