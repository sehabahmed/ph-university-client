import { Button, Table, TableColumnsType, TableProps } from "antd";
import { useGetAllSemestersQuery } from "../../../redux/features/admin/adminManagement.api";
import { useState } from "react";
import { TAcademicSemester } from "../../../types/academicManagement.type";
import { TQueryParam } from "../../../constants/global";

export type TTableData = Pick<
  TAcademicSemester,
  "name" | "year" | "startMonth" | "endMonth"
>;

type OnChange = NonNullable<TableProps<TTableData>["onChange"]>;
type Filters = Parameters<OnChange>[1];

const AcademicSemester = () => {
  const [params, setParams] = useState<TQueryParam[] | undefined>(undefined);
  const { data: semesterData, isFetching } = useGetAllSemestersQuery(params);

  const tableData = semesterData?.data?.map(
    ({ _id, name, year, startMonth, endMonth }) => ({
      key: _id,
      name,
      year,
      startMonth,
      endMonth,
    })
  );

  const [filteredInfo, setFilteredInfo] = useState<Filters>({});

  const handleChange: OnChange = (_pagination, filters, _sorter, extra) => {
    setFilteredInfo(filters);
    if (extra.action === "filter") {
      const queryParams: TQueryParam[] = [];

      filters.name?.forEach((item) =>
        queryParams.push({ name: "name", value: item })
      );

      filters.year?.forEach((item) =>
        queryParams.push({ name: "year", value: item })
      );

      setParams(queryParams);
      console.log(queryParams);
    }
  };

  const columns: TableColumnsType<TTableData> = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      filters: [
        { text: "Autumn", value: "Autumn" },
        { text: "Summer", value: "Summer" },
        { text: "Fall", value: "Fall" },
      ],
      filteredValue: filteredInfo.name || null,
      onFilter: (value, record) => record.name.includes(value as string),
      sorter: (a, b) => a.name.length - b.name.length,
      ellipsis: true,
    },
    {
      title: "Year",
      dataIndex: "year",
      key: "year",
      filters: [
        { text: "2025", value: "2025" },
        { text: "2026", value: "2026" },
        { text: "2027", value: "2027" },
        { text: "2028", value: "2028" },
      ],
      filteredValue: filteredInfo.name || null,
      onFilter: (value, record) => record.name.includes(value as string),
      sorter: (a, b) => a.name.length - b.name.length,
      ellipsis: true,
    },
    {
      title: "Start Month",
      dataIndex: "startMonth",
      key: "startMonth",
    },
    {
      title: "End Month",
      dataIndex: "endMonth",
      key: "endMonth",
    },
    {
      title: "Action",
      key: "x",
      render: () => {
        return <Button>Update</Button>;
      },
    },
  ];

  return (
    <>
      <Table<TTableData>
        loading={isFetching}
        columns={columns}
        dataSource={tableData}
        onChange={handleChange}
      />
    </>
  );
};

export default AcademicSemester;
