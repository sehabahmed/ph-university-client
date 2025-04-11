import { Button, Table, TableColumnsType, TableProps } from "antd";
import { TAcademicDepartment } from "../../../types/academicManagement.type";
import { useMemo, useState } from "react";
import { TQueryParam } from "../../../constants/global";
import { useGetAllDepartmentQuery } from "../../../redux/features/admin/adminManagement.api";

export type TTableData = Pick<TAcademicDepartment, "name" | "academicFaculty">;
type OnChange = NonNullable<TableProps<TTableData>["onChange"]>;
type Filters = Parameters<OnChange>[1];

const AcademicDepartment = () => {
  const [params, setParams] = useState<TQueryParam[] | undefined>(undefined);
  const { data: departmentsData, isFetching } =
    useGetAllDepartmentQuery(params);

  const tableData = departmentsData?.data?.map(
    ({ _id, name, academicFaculty }) => ({
      key: _id,
      name,
      academicFaculty: academicFaculty,
    })
  ) || [];
  console.log(tableData);

  const [filteredInfo, setFilteredInfo] = useState<Filters>({});

  const academicFacultyFilters = useMemo(() => {
    const uniqueFaculties = new Map();

    departmentsData?.data?.forEach((dept) => {
      if (dept.academicFaculty?._id && dept.academicFaculty?.name) {
        uniqueFaculties.set(dept.academicFaculty._id, dept.academicFaculty.name);
      }
    });

    return Array.from(uniqueFaculties, ([id, name]) => ({
      text: name,
      value: name,
    }));
  }, [departmentsData]);

  const handleChange: OnChange = (_pagination, filters, _sorter, extra) => {
    setFilteredInfo(filters);
    if (extra.action === "filter") {
      const queryParams: TQueryParam[] = [];

      filters.academicFaculty?.forEach((item) =>
        queryParams.push({ name: "academicFaculty", value: item })
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
    },
    {
      title: "Academic Faculty",
      dataIndex: "academicFaculty",
      key: "academicFaculty",
      render: (faculty) => faculty.name,
      filters: academicFacultyFilters,
      filteredValue: filteredInfo.academicFaculty || null,
      onFilter: (value, record) => record.academicFaculty.name === value,
      sorter: (a, b) => a.name.length - b.name.length,
      ellipsis: true,
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

export default AcademicDepartment;
