import React, { useEffect, useState } from "react";
import { Table } from "antd";
import type {
  ColumnsType,
  TablePaginationConfig,
  TableProps,
} from "antd/es/table";
import type { FilterValue, SorterResult } from "antd/es/table/interface";

interface IProps extends TableProps<any> {
  //   columns: ColumnsType<any>;
  //   data: any;
  //   totalRecords: number;
}

const ApTable: React.FC<IProps> = (props: IProps) => {
  const [loading, setLoading] = useState(false);

  const pagOnchange = (value: any) => {
    console.log(value);
  };

  const handleTableChange = (value: any) => [console.log(value)];

  return (
    <Table
      sticky
      {...props}
      //   columns={columns}
      //   sticky
      //   rowKey={(record) => record._id}
      //   dataSource={data}
      //   pagination={{ current: 1, total: totalRecords, onChange: pagOnchange }}
      //   loading={loading}
      //   scroll={{ y: 240 }}
      //   onChange={handleTableChange}
    />
  );
};

export default ApTable;
