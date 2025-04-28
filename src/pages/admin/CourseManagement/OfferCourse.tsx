import { FieldValues, SubmitHandler } from "react-hook-form";
import PHForm from "../../../components/form/PHForm";
import { Button, Col, Flex } from "antd";
import {
  useAddOfferedCourseMutation,
  useGetAllCoursesQuery,
  useGetAllRegisteredSemestersQuery,
  useGetCourseFacultyQuery,
} from "../../../redux/features/admin/courseManagement.api";
import PHSelectWithWatch from "../../../components/form/PHSelectWithWatch";
import { useState } from "react";
import PHSelect from "../../../components/form/PHSelect";
import { skipToken } from "@reduxjs/toolkit/query";
import {
  useGetAllDepartmentQuery,
  useGetAllFacultiesQuery,
} from "../../../redux/features/admin/adminManagement.api";
import PHInput from "../../../components/form/PHInput";
import { weekdaysOptions } from "../../../constants/global";
import PHTimePicker from "../../../components/form/PHTimePicker";
import moment from "moment";

const OfferCourse = () => {
  const [courseId, setCourseId] = useState("");
  const { data: semesterRegistrations } = useGetAllRegisteredSemestersQuery([
    { name: "sort", value: "year" },
    { name: "status", value: "UPCOMING" },
  ]);
  const { data: allAcademicFaculties } = useGetAllFacultiesQuery(undefined);
  const { data: allAcademicDepartments } = useGetAllDepartmentQuery(undefined);
  const { data: allCourses } = useGetAllCoursesQuery(undefined);
  const { data: courseFaculty } = useGetCourseFacultyQuery(
    courseId ? { courseFacultyId: courseId, data: {} } : skipToken
  );
  const [addOfferedCourse] = useAddOfferedCourseMutation();

  console.log('semesterRegistrations', semesterRegistrations);

  const semesterRegistrationOptions = semesterRegistrations?.data?.map(
    (item) => ({
      value: item._id,
      label: `${item.academicSemester.name} ${item.academicSemester.year}`,
    })
  );

  console.log("semesterRegistrationOptions", semesterRegistrationOptions);

  const allDepartmentOptions = allAcademicDepartments?.data?.map((item) => ({
    value: item._id,
    label: item.name,
  }));

  const academicFacultyOptions = allAcademicFaculties?.data?.map((item) => ({
    value: item._id,
    label: item.name,
  }));

  const courseOptions = allCourses?.data?.map((item) => ({
    value: item._id,
    label: item.title,
  }));

  const courseFacultyOptions = courseFaculty?.data?.faculties?.map((item) => ({
    value: item._id,
    label: `${item.name.firstName} ${item.name.middleName} ${item.name.lastName}`,
  }));

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    // const toastId = toast.loading("Creating...");

    const offeredCourseData = {
      ...data,
      section: Number(data.section),
      maxCapacity: Number(data.maxCapacity),
      startTime: moment(new Date(data.startTime)).format('HH:mm'),
      endTime: moment(new Date(data.endTime)).format('HH:mm'),
    };

    const res = addOfferedCourse(offeredCourseData);

    console.log(res);
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
          <PHSelect
            options={academicFacultyOptions}
            name="academicFaculty"
            label="Academic Faculty"
          />
          <PHSelect
            options={allDepartmentOptions}
            name="academicDepartment"
            label="Academic Department"
          />
          <PHSelectWithWatch
            onValueChange={setCourseId}
            options={courseOptions}
            name="course"
            label="Course"
          />
          <PHSelect
            options={courseFacultyOptions}
            name="faculty"
            label="Faculty"
            disabled={!courseId}
          />
          <PHInput type="text" name="section" label="Section" />
          <PHInput type="text" name="maxCapacity" label="Max Capacity" />
          <PHSelect
            mode="multiple"
            options={weekdaysOptions}
            name="days"
            label="Days"
          />
          <PHTimePicker name="startTime" label="Start Time" />
          <PHTimePicker name="endTime" label="End Time" />
          <Button className="" htmlType="submit">
            Submit
          </Button>
        </PHForm>
      </Col>
    </Flex>
  );
};

export default OfferCourse;
