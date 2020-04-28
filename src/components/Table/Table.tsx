import React, {
  FC,
  useState,
  useEffect,
} from "react";
import { FixedSizeList as List } from "react-window";
import { deepGet } from "../../utils";
import Pagination, { paginationType } from "../Pagination/Pagination";

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
  console.log('renderData', renderData)

  //首次渲染的数据
  useEffect(() => {
    console.log('page_size, pageNo', page_size, pageNo)
    if (pagination && dataSource.length) {
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
      // 怎么在一次更新之后再回调一次更新
      setRenderData(arr);
    }
  }, [pageNo, page_size, pagination, dataSource]);

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

  const Row = (props: {
    index: number;
    style: React.CSSProperties;
    data: any[];
  }) => {
    console.log("props", props);
    const { index, style, data } = props;
    const item = data[index];
    if (!(item instanceof Object)) {
      // console.error("data item not a object");
      return null;
    }
    return (
      <div key={index} style={{ ...style, display: "flex" }}>
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
  };

  const renderDataSource = () => (
    <List
      height={300}
      itemCount={page_size}
      itemSize={30}
      width={1000}
      itemData={renderData}
    >
      {Row}
    </List>
  );
  
  const handleChangePageNo = (pageNo: number, pageSize: number) => {
     if(onChange){
       onChange(pageNo, pageSize)
     }
     console.log('handleChangePageNo', pageNo, pageSize)
     setPageNo(pageNo)
     setPage_size(pageSize)
  }

  return (
    <div>
      <div style={{ border: "1px solid green", display: "flex" }}>
        {renderTitle()}
      </div>
      <div style={{ border: "1px solid red" }}>{renderDataSource()}</div>

      {pagination && (
        <Pagination
          current={pageNo}
          pageSize={page_size}
          total={dataSource.length}
          onChange={handleChangePageNo}
        />
      )}
      {pageLoading && <div>加载中...</div>}
    </div>
  );
};

Table.defaultProps = {
  loading: false,
  dataSource: [],
  pagination: true,
};

export default Table;
