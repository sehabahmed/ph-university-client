import {
  Button,
  Pagination,
  Space,
  Table,
  TableColumnsType,
  TableProps,
} from "antd";
import { useState } from "react";
import { TQueryParam } from "../../../constants/global";
import { useGetAllStudentsQuery } from "../../../redux/features/admin/userManagement.api";
import { TStudents } from "../../../types";

export type TTableData = Pick<TStudents, "fullName" | "id">;

const StudentData = () => {
  const [params, setParams] = useState<TQueryParam[]>([]);
  const [page, setPage] = useState(1);

  const { data: studentData, isFetching } = useGetAllStudentsQuery([
    { name: "page", value: page },
    { name: "sort", value: "id" },
    ...params,
  ]);
  console.log(studentData?.data);
  const tableData = studentData?.data?.map(({ _id, fullName, id, email, contactNo }) => ({
    key: _id,
    fullName,
    id,
    email,
    contactNo
  }));

  const metaData = studentData?.meta;

  const onChange: TableProps<TTableData>["onChange"] = (
    _pagination,
    filters,
    _sorter,
    extra
  ) => {
    if (extra.action === "filter") {
      const queryParams: TQueryParam[] = [];

      filters.name?.forEach((item) =>
        queryParams.push({ name: "name", value: item })
      );

      filters.year?.forEach((item) =>
        queryParams.push({ name: "year", value: item })
      );

      setParams(queryParams);
    }
  };

  const columns: TableColumnsType<TTableData> = [
    {
      title: "Name",
      dataIndex: "fullName",
      key: "name",
    },
    {
      title: "Roll No.",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Contact No.",
      dataIndex: "contactNo",
      key: "contactNo",
    },
    {
      title: "Action",
      key: "x",
      render: () => {
        return (
          <Space>
            <Button>Details</Button>
            <Button>Update</Button>
            <Button>Block</Button>
          </Space>
        );
      },
      width: "10%",
    },
  ];

  return (
    <>
      <Table<TTableData>
        loading={isFetching}
        columns={columns}
        dataSource={tableData}
        pagination={false}
        onChange={onChange}
      />
      <Pagination
        defaultCurrent={page}
        onChange={(value) => setPage(value)}
        pageSize={metaData?.limit}
        total={metaData?.total}
      />
    </>
  );
};

export default StudentData;
