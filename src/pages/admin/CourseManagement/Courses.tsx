import { Button, Modal, Table, TableColumnsType } from "antd";
import { useGetAllCoursesQuery } from "../../../redux/features/admin/courseManagement.api";
import { TCourses } from "../../../types";
import { useState } from "react";
import PHForm from "../../../components/form/PHForm";
import PHSelect from "../../../components/form/PHSelect";
import { SubmitHandler } from "react-hook-form";
import { useGetAllUserFacultiesQuery } from "../../../redux/features/admin/userManagement.api";

export type TTableData = Pick<TCourses, "title" | "code">;

const Courses = () => {
  const { data: courseData } = useGetAllCoursesQuery(undefined);
  console.log(courseData);

  const tableData = (courseData?.data as TCourses[])?.map(
    ({ _id, title, code }) => ({
      key: _id,
      title,
      code,
    })
  );

  const columns: TableColumnsType<TTableData> = [
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Code",
      dataIndex: "code",
      key: "code",
    },
    {
      title: "Action",
      key: "x",
      render: (item) => {
        return <AddFacultyModal data={item} />;
      },
    },
  ];

  return (
    <>
      <Table<TTableData> columns={columns} dataSource={tableData} />
    </>
  );
};

const AddFacultyModal = ({ data }) => {
  // console.log(data)
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { data: facultiesData } = useGetAllUserFacultiesQuery(undefined);
  console.log("facultiesData", facultiesData);
  const facultiesOption = facultiesData?.data?.map(item => ({
    value: item._id,
    label: `${item.name.firstName} ${item.name.middleName} ${item.name.lastName}`
  }))

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleSubmit = (data) => {
    console.log(data);
  };

  return (
    <>
      <Button onClick={showModal}>Add Faculty</Button>
      <Modal title="Basic Modal" open={isModalOpen} onOk={handleOk}>
        <PHForm onSubmit={handleSubmit}>
          <PHSelect mode="multiple" options={facultiesOption} name="faculties" label="Faculty"/>
        </PHForm>
      </Modal>
    </>
  );
};

export default Courses;
