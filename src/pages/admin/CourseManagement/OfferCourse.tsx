import { FieldValues, SubmitHandler } from "react-hook-form";
import PHForm from "../../../components/form/PHForm";
import { Button, Col, Flex } from "antd";
import PHInput from "../../../components/form/PHInput";
import { useGetAllCoursesQuery, useGetCourseFacultyQuery } from "../../../redux/features/admin/courseManagement.api";
import PHSelectWithWatch from "../../../components/form/PHSelectWithWatch";
import { useState } from "react";
import PHSelect from "../../../components/form/PHSelect";

const OfferCourse = () => {
  const [ id, setId ] = useState("");
  const { data: allCourses } = useGetAllCoursesQuery(undefined);
  const { data: courseFaculty } = useGetCourseFacultyQuery(undefined);
  console.log("inside parent component", id);

  const courseOptions = allCourses?.data?.map((item) => ({
    value: item._id,
    label: item.title,
  }));

  const courseFacultyOptions = courseFaculty?.data?.map(item => ({
    value: item._id,
    label: `${item.name.firstName} ${item.name.middleName} ${item.name.lastName}`
  }))

  console.log(courseFacultyOptions);

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    // const toastId = toast.loading("Creating...");
    console.log(data);
  };

  return (
    <Flex justify="center">
      <Col span={6}>
        <PHForm onSubmit={onSubmit}>
          <PHSelectWithWatch
            onValueChange={setId}
            options={courseOptions}
            name="course"
            label="Course"
          />

          <PHInput type="text" name="faculty" label="Faculty" disabled={!id} />
          <PHSelect options={courseFacultyOptions} name="faculty" label="Faculty"/>
          <Button className="" htmlType="submit">
            Submit
          </Button>
        </PHForm>
      </Col>
    </Flex>
  );
};

export default OfferCourse;
