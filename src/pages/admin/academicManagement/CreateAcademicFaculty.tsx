import { FieldValues, SubmitHandler } from "react-hook-form";
import PHForm from "../../../components/form/PHForm";
import PHInput from "../../../components/form/PHInput";
import { Button, Col, Flex } from "antd";
import { useAddAcademicFacultyMutation } from "../../../redux/features/admin/adminManagement.api";
import { toast } from "sonner";
import { TResponse } from "../../../types";
import { TAcademicFaculty } from "../../../types/academicManagement.type";
import { zodResolver } from "@hookform/resolvers/zod";
import { academicFacultySchema } from "../../../schemas/academicManagement.schema";

// type TAcademicFaculty = {
//   id: string;
//   name: string;
// };

const CreateAcademicFaculty = () => {
  const [addAcademicFaculty] = useAddAcademicFacultyMutation();

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const toastId = toast.loading("Creating...");

    const facultyData = {
      name: data.name,
    };

    const res = (await addAcademicFaculty(
      facultyData
    )) as TResponse<TAcademicFaculty>;

    if (res.error) {
      toast.error(res.error.data.message, { id: toastId });
    } else {
      toast.success("Semester Created Successfully", { id: toastId });
    }
    console.log(res);
  };

  return (
    <Flex justify="center">
      <Col span={6}>
        <PHForm onSubmit={onSubmit} resolver={zodResolver(academicFacultySchema)}>
          <PHInput type="text" name="name" label="Academic Faculty" />
          <Button className="" htmlType="submit">
            Submit
          </Button>
        </PHForm>
      </Col>
    </Flex>
  );
};

export default CreateAcademicFaculty;
