import { Col, Flex, Table, TableProps } from "antd";
import { useGetAllFacultiesQuery } from "../../../redux/features/admin/adminManagement.api";

interface DataType {
  key: string;
  name: string;
}

const columns: TableProps<DataType>["columns"] = [
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
    render: (text) => <a>{text}</a>,
  },
];

const AcademicFaculty = () => {
  const { data: facultiesData, isFetching } =
    useGetAllFacultiesQuery(undefined);

  console.log(facultiesData);

  const fieldData = facultiesData?.data?.map(({ _id, name }) => ({
    key: _id,
    name,
  }));

  return (
    <Flex justify="center">
      <Col span={9}>
        <Table<DataType>
          loading={isFetching}
          columns={columns}
          dataSource={fieldData}
        />
      </Col>
    </Flex>
  );
};

export default AcademicFaculty;
