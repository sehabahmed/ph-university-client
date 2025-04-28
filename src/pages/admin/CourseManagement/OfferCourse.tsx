import { FieldValues, SubmitHandler } from "react-hook-form";
import PHForm from "../../../components/form/PHForm";
import { Button, Col, Flex } from "antd";
import {
  useGetAllCoursesQuery,
  useGetCourseFacultyQuery,
} from "../../../redux/features/admin/courseManagement.api";
import PHSelectWithWatch from "../../../components/form/PHSelectWithWatch";
import { useState } from "react";
import PHSelect from "../../../components/form/PHSelect";
import { skipToken } from "@reduxjs/toolkit/query";
import { useGetAllSemestersQuery } from "../../../redux/features/admin/adminManagement.api";

const OfferCourse = () => {
  const [id, setId] = useState("");
  const { data: allCourses } = useGetAllCoursesQuery(undefined);
  const { data: courseFaculty } = useGetCourseFacultyQuery(
    id ? { courseFacultyId: id, data: {} } : skipToken
  );
  const { data: semesterRegistration } = useGetAllSemestersQuery(undefined);

  const semesterRegistrationOptions = semesterRegistration?.data?.map(
    (item) => ({
      value: item._id,
      label: `${item.name} ${item.year}`,
    })
  );

  const courseOptions = allCourses?.data?.map((item) => ({
    value: item._id,
    label: item.title,
  }));

  const courseFacultyOptions =
    courseFaculty?.data?.faculties?.map((item) => ({
      value: courseOptions._id,
      label: `${item.name.firstName} ${item.name.middleName} ${item.name.lastName}`,
    })) || [];

  console.log(courseFacultyOptions);

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    // const toastId = toast.loading("Creating...");
    console.log(data);
  };

  return (
    <Flex justify="center">
      <Col span={6}>
        <PHForm onSubmit={onSubmit}>
          <PHSelect
            options={semesterRegistrationOptions}
            name="semesterRegistration"
            label="Semester Registration"
          />
          <PHSelectWithWatch
            onValueChange={setId}
            options={courseOptions}
            name="course"
            label="Course"
          />
          <PHSelect
            options={courseFacultyOptions}
            name="faculty"
            label="Faculty"
            disabled={!id}
          />
          <Button className="" htmlType="submit">
            Submit
          </Button>
        </PHForm>
      </Col>
    </Flex>
  );
};

export default OfferCourse;
