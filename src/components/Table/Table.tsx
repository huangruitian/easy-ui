import React, { FC, useState, useEffect, ReactNode, useRef } from "react";
import { deepGet } from "../../utils";
import Pagination, { paginationType } from "../Pagination/Pagination";
import InputNumber from "../InputNumber";
import Button from "../Button";

interface ColumnProps {
  title?: React.ReactNode;
  dataIndex: string | string[];
  key?: string;
}

interface TableProps {
  dataSource?: any[];
  columns: ColumnProps[];
  loading?: boolean;
  pagination?: boolean | paginationType;
  onChange?: (pageNo: number, pageSize: number) => void;
}

const Table: FC<TableProps> = (props) => {
  const { dataSource = [], columns, loading, pagination, onChange } = props;
  const { current, pageSize, total } = pagination as paginationType;

  const [renderData, setRenderData] = useState<any[]>([]);
  const [pageNo, setPageNo] = useState<number>(current || 1);
  const [page_size, setPage_size] = useState<number>(pageSize || 10);
  const [pageLoading, setPageLoading] = useState(loading);
  const maxPageNo = Math.ceil(dataSource.length / page_size);

  //首次渲染的数据
  useEffect(() => {
    if (typeof pagination !== "boolean" && pagination) {
      const asyncRender = async () => {
        console.time("slice：");
        const index = (pageNo - 1) * page_size;
        const limit = page_size * pageNo;
        const arr = (dataSource || []).slice(index, limit);
        // 性能优化，一次开完内存，避免多次push
        //   const arr = new Array(limit)
        //   for(let i = index; i < limit; i++){
        //     arr[i] = dataSource[i]
        //   }
        console.timeEnd("slice：");

        await setRenderData(arr);
      };
      setPageLoading(true);
      asyncRender();
      setPageLoading(false);
    }
  }, [pageNo, page_size, pagination, dataSource, pageLoading]);

  const renderTitle = () => {
    return columns.map((item, index) => {
      return (
        <span
          key={index}
          style={{
            flex: "1",
            border: "1px solid #ccc",
            textAlign: "center",
          }}
        >
          {item.title || ""}
        </span>
      );
    });
  };

  const renderDataSource = () => {
    // 每一行
    return renderData.map((item, index) => {
      if (!(item instanceof Object)) {
        console.error("dataSource item not a object");
        return;
      }
      // 10000 * 3
      return (
        <div key={index} style={{ display: "flex" }}>
          {columns.map((col, colIdx) => {
            // 这里有个问题，columns 怎么去适配 dataSource 呢？模拟 lodash 的 get
            const value = deepGet(item, col.dataIndex, "").toString();
            // debugger
            return (
              <span
                key={colIdx}
                style={{
                  flex: 1,
                  textAlign: "center",
                  border: "1px solid #ccc",
                }}
              >
                {value}
              </span>
            );
          })}
        </div>
      );
    });
  };

  const handleFirstPageNo = () => {
    if (onChange) {
      onChange(1, page_size);
    }
    setPageNo(1);
  };

  const handleLastPageNo = () => {
    if (onChange) {
      onChange(maxPageNo, page_size);
    }
    setPageNo(maxPageNo);
  };

  const handleNextPageNo = () => {
    if (pageNo >= maxPageNo) {
      return;
    }
    setPageNo((pre) => {
      if (onChange) {
        onChange(pre + 1, page_size);
      }
      return pre + 1;
    });
  };

  const handlePrePageNo = () => {
    if (pageNo <= 1) {
      return;
    }
    setPageNo((pre) => {
      if (onChange) {
        onChange(pre - 1, page_size);
      }
      return pre - 1;
    });
  };

  const handleChangePageNo = (page: number | string) => {
    console.log("handleChangePageNo", page);
    const pageNo = +page || 1;
    setPageNo(pageNo);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.keyCode !== 13) {
      return;
    }
    const inpDom = e.target as HTMLInputElement;
    const value = +inpDom.value;
    if (value < 1 || value > maxPageNo) {
      return;
    }
    setPageNo(value);
  };

  return (
    <div>
      <div style={{ border: "1px solid green", display: "flex" }}>
        {renderTitle()}
      </div>
      <div style={{ border: "1px solid red" }}>{renderDataSource()}</div>
      {pagination && (
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
              {" "}
              上一页{" "}
            </Button>
            <span>
              <InputNumber
                style={{ width: 60 }}
                min={1}
                max={maxPageNo}
                onChange={handleChangePageNo}
                defaultValue={1}
                onKeyDown={handleKeyDown}
              />
            </span>
            <Button btnType="link" onClick={handleNextPageNo}>
              {" "}
              下一页{" "}
            </Button>
            <Button onClick={handleLastPageNo}> 最后一页 </Button>
          </div>
        </div>
      )}
      {pageLoading && <div>加载中...</div>}
    </div>
  );
};

Table.defaultProps = {
  loading: true,
  dataSource: [],
  pagination: {
    current: 1,
    pageSize: 10000,
    total: 0,
  },
};

export default Table;
