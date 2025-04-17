import { FieldValues, SubmitHandler } from "react-hook-form";
import PHForm from "../../../components/form/PHForm";
import { Button, Col, Flex } from "antd";
import PHSelect from "../../../components/form/PHSelect";
import { semesterStatusOptions } from "../../../constants/semester";
import { monthOptions } from "../../../constants/global";
import { useGetAllSemestersQuery } from "../../../redux/features/admin/adminManagement.api";
import { toast } from "sonner";
import { TResponse } from "../../../types/global.type";
import { TAcademicSemester } from "../../../types/academicManagement.type";
import PHDatePicker from "../../../components/form/PHDatePicker";
import PHInput from "../../../components/form/PHInput";
import { useAddSemesterRegistrationMutation, useGetAllCoursesQuery } from "../../../redux/features/admin/courseManagement.api";

const CreateCourse = () => {
  
  const [addSemesterRegistration] = useAddSemesterRegistrationMutation();
  const {data: courseData} = useGetAllCoursesQuery(undefined)


  const preRequisiteCoursesOptions = courseData?.data?.map((item) => ({
    value: item._id,
    label: item.title,
  }));

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const toastId = toast.loading("Creating...");

    const createCourseData = {
      ...data,
      isDeleted: false,
      preRequisiteCourses: data.preRequisiteCourses.map(item => ({
        course: item,
        isDeleted: false
      }))
    };

    console.log("create course", createCourseData);

    // try {
    //   console.log(createCourseData);

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
          <PHInput type="text" name="title" label="Title" />
          <PHInput type="text" name="prefix" label="Prefix" />
          <PHInput type="text" name="code" label="Code" />
          <PHInput type="text" name="credits" label="Credits" />
          <PHSelect
          mode="multiple"
          options={preRequisiteCoursesOptions} name="preRequisiteCourses" label="PreRequisite Courses" />
          <Button className="" htmlType="submit">
            Submit
          </Button>
        </PHForm>
      </Col>
    </Flex>
  );
};

export default CreateCourse;
