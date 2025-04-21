import { FieldValues, SubmitHandler } from "react-hook-form";
import PHForm from "../../../components/form/PHForm";
import { Button, Col, Flex } from "antd";
import { toast } from "sonner";
import PHInput from "../../../components/form/PHInput";
import { useGetAllCoursesQuery } from "../../../redux/features/admin/courseManagement.api";
import PHSelectWithWatch from "../../../components/form/PHSelectWithWatch";
import { useState } from "react";

const OfferCourse = () => {
  const [ id, setId ] = useState("");
  const { data: allCourses } = useGetAllCoursesQuery(undefined);

  console.log("inside parent component", id);

  const courseOptions = allCourses?.data?.map((item) => ({
    value: item._id,
    label: item.title,
  }));

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const toastId = toast.loading("Creating...");
console.log(data)
    // try {
    //   console.log(semesterRegistrationData);

    //   const res = (await addSemesterRegistration(
    //     semesterRegistrationData
    //   )) as TResponse<TAcademicSemester>;
    //   if (res.error) {
    //     toast.error(res.error.data.message, { id: toastId });
    //   } else {
    //     toast.success("Semester Created Successfully", { id: toastId });
    //   }
    //   console.log(res);
    // } catch (error) {
    //   toast.error("Something went wrong", { id: toastId });
    // }
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

          <Button className="" htmlType="submit">
            Submit
          </Button>
        </PHForm>
      </Col>
    </Flex>
  );
};

export default OfferCourse;
