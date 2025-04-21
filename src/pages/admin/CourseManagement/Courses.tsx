import { Button, Modal, Table, TableColumnsType } from "antd";
import {
  useAddFacultiesMutation,
  useGetAllCoursesQuery,
} from "../../../redux/features/admin/courseManagement.api";
import { TCourses } from "../../../types";
import { useState } from "react";
import PHForm from "../../../components/form/PHForm";
import PHSelect from "../../../components/form/PHSelect";
import { useGetAllUserFacultiesQuery } from "../../../redux/features/admin/userManagement.api";

export type TTableData = Pick<TCourses, "title" | "code">;

const Courses = () => {
  const { data: courseData } = useGetAllCoursesQuery(undefined);

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
        return <AddFacultyModal facultyInfo={item} />;
      },
    },
  ];

  return (
    <>
      <Table<TTableData> columns={columns} dataSource={tableData} />
    </>
  );
};

const AddFacultyModal = ({ facultyInfo }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { data: AllFacultiesData } = useGetAllUserFacultiesQuery(undefined);
  const [addFaculties] = useAddFacultiesMutation();

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const facultiesOption = AllFacultiesData?.data?.map((item) => ({
    value: item._id,
    label: `${item.name.firstName} ${item.name.middleName} ${item.name.lastName}`,
  }));

  const handleSubmit = (data) => {
    const facultiesData = {
      courseId: facultyInfo.key,
      data,
    };

    console.log("facultiesData", facultiesData);
    addFaculties(facultiesData);
  };

  return (
    <>
      <Button onClick={showModal}>Add Faculty</Button>
      <Modal title="Assign Faculties" open={isModalOpen} footer={null} onCancel={handleCancel}>
        <PHForm onSubmit={handleSubmit}>
          <PHSelect
            mode="multiple"
            options={facultiesOption}
            name="faculties"
            label="Faculty"
          />
          <Button htmlType="submit">Submit</Button>
        </PHForm>
      </Modal>
    </>
  );
};

export default Courses;