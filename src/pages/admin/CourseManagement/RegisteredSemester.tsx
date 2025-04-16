import { Button, Table, TableColumnsType, TableProps } from "antd";
import { useGetAllRegisteredSemestersQuery } from "../../../redux/features/admin/courseManagement.api";
import { TSemesterRegistration } from "../../../types";

export type TTableData = Pick<
  TSemesterRegistration,
  "academicSemester" | "status" | "startDate" | "endDate"
>;

const RegisteredSemester = () => {
  //   const [params, setParams] = useState<TQueryParam[] | undefined>(undefined);
  const { data: semesterData, isFetching } =
    useGetAllRegisteredSemestersQuery(undefined);

  const tableData = semesterData?.data?.map(
    ({ _id, academicSemester, status, startDate, endDate }) => ({
      key: _id,
      academicSemester: `${academicSemester.name} ${academicSemester.year}`,
      status,
      startDate,
      endDate,
    })
  );

  //   const [filteredInfo, setFilteredInfo] = useState<Filters>({});

  //   const handleChange: OnChange = (_pagination, filters, _sorter, extra) => {
  //     setFilteredInfo(filters);
  //     if (extra.action === "filter") {
  //       const queryParams: TQueryParam[] = [];

  //       filters.name?.forEach((item) =>
  //         queryParams.push({ name: "name", value: item })
  //       );

  //       filters.year?.forEach((item) =>
  //         queryParams.push({ name: "year", value: item })
  //       );

  //       setParams(queryParams);
  //       console.log(queryParams);
  //     }
  //   };

  const columns: TableColumnsType<TTableData> = [
    {
      title: "Academic Semester",
      dataIndex: "academicSemester",
      key: "academicSemester",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
    },
    {
      title: "Start Date",
      dataIndex: "startDate",
      key: "startDate",
    },
    {
      title: "End Date",
      dataIndex: "endDate",
      key: "endDate",
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
        // onChange={handleChange}
      />
    </>
  );
};

export default RegisteredSemester;
