import {
  Button,
  Dropdown,
  MenuProps,
  Table,
  TableColumnsType,
  Tag,
} from "antd";
import {
  useGetAllRegisteredSemestersQuery,
  useUpdateSemesterRegistrationMutation,
} from "../../../redux/features/admin/courseManagement.api";
import { TSemesterRegistration } from "../../../types";
import moment from "moment";
import { useState } from "react";

const items: MenuProps["items"] = [
  {
    label: "Upcoming",
    key: "UPCOMING",
  },
  {
    label: "Ongoing",
    key: "ONGOING",
  },
  {
    label: "Ended",
    key: "ENDED",
  },
];

export type TTableData = Pick<
  TSemesterRegistration,
  "status" | "startDate" | "endDate"
>;

const RegisteredSemester = () => {
  const [semesterId, setSemesterId] = useState("");
  //   const [params, setParams] = useState<TQueryParam[] | undefined>(undefined);
  const { data: semesterData, isFetching } =
    useGetAllRegisteredSemestersQuery(undefined);
  const [updateSemesterStatus] =
    useUpdateSemesterRegistrationMutation();

  const tableData = semesterData?.data?.map(
    ({ _id, academicSemester, status, startDate, endDate }) => ({
      key: _id,
      academicSemester: `${academicSemester.name} ${academicSemester.year}`,
      status,
      startDate: moment(new Date(startDate)).format("MMMM"),
      endDate: moment(new Date(endDate)).format("MMMM"),
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

  const handleStatusUpdate: MenuProps["onClick"] = (data) => {
    console.log("semester", semesterId);
    console.log("new Status", data.key);

    const updateData = {
      id: semesterId,
      data: {
        status: data.key,
      },
    };

    updateSemesterStatus(updateData);
  };

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
      render: (item) => {
        let color;
        if (item === "UPCOMING") {
          color = "blue";
        }
        if (item === "ONGOING") {
          color = "green";
        }
        if (item === "ENDED") {
          color = "red";
        }

        return <Tag color={color}>{item}</Tag>;
      },
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
      render: (item) => {
        return (
          <Dropdown
            menu={{ items, onClick: handleStatusUpdate }}
            placement="bottom"
            trigger={["click"]}
          >
            <Button onClick={() => setSemesterId(item.key)}>Update</Button>
          </Dropdown>
        );
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
