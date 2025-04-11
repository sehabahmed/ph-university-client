import { Button } from "antd";
import PHForm from "../../../components/form/PHForm";
import PHInput from "../../../components/form/PHInput";
import PHSelect from "../../../components/form/PHSelect";
import { FieldValues, SubmitHandler } from "react-hook-form";
import {
  useAddAcademicDepartmentMutation,
  useGetAllFacultiesQuery,
} from "../../../redux/features/admin/adminManagement.api";
import { toast } from "sonner";
import { TResponse } from "../../../types";
import { TAcademicDepartment } from "../../../types/academicManagement.type";

const CreateAcademicDepartment = () => {
  const { data: facultiesData } = useGetAllFacultiesQuery(undefined);
  const [addAcademicDepartment] = useAddAcademicDepartmentMutation();

  const facultiesNameOptions = facultiesData?.data?.map(({ _id, name }) => ({
    key: _id,
    value: _id,
    label: name,
  }));

  console.log(facultiesNameOptions);

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const toastId = toast.loading("Creating...");

    const departmentData = {
      name: data.name,
      academicFaculty: data.academicFaculty,
    };

    try {
      const res = (await addAcademicDepartment(
        departmentData
      )) as TResponse<TAcademicDepartment>;
      if (res.error) {
        toast.error(res.error.data.message, { id: toastId });
      } else {
        toast.success("Semester Created Successfully", { id: toastId });
      }
      console.log(res);
    } catch (error) {
      toast.error("Something went wrong", { id: toastId });
    }
  };

  return (
    <div>
      <PHForm onSubmit={onSubmit}>
        <PHInput type="text" name="name" label="Academic Department" />
        <PHSelect
          options={facultiesNameOptions ?? []}
          label="Academic Faculty"
          name="academicFaculty"
        />
        <Button className="" htmlType="submit">
          Submit
        </Button>
      </PHForm>
    </div>
  );
};

export default CreateAcademicDepartment;
