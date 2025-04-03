import { FieldValues, SubmitHandler } from "react-hook-form";
import PHForm from "../../../components/form/PHForm";
import { Button, Col, Flex } from "antd";
import PHSelect from "../../../components/form/PHSelect";
import { nameOptions } from "../../../constants/semester";
import { monthOptions } from "../../../constants/global";
import { zodResolver } from "@hookform/resolvers/zod";
import { academicSemesterSchema } from "../../../schemas/academicManagement.schema";
import { useAddAcademicSemesterMutation } from "../../../redux/features/admin/adminManagement.api";
import { toast } from "sonner";
import { TResponse } from "../../../types/global.type";

type TAcademicSemester = {
  id: string;
  name: string;
  code: string;
  year: string;
  startMonth: string;
  endMonth: string;
};

const currentYear = new Date().getFullYear();

const yearOptions = [0, 1, 2, 3, 4].map((number) => ({
  value: String(currentYear + number),
  label: String(currentYear + number),
}));

const CreateAcademicSemester = () => {
  const [addAcademicSemester] = useAddAcademicSemesterMutation();

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const toastId = toast.loading("Creating...");
    const name = nameOptions[Number(data?.name - 1)]?.label;

    const semesterData = {
      name,
      code: data.name,
      year: data.year,
      startMonth: data.startMonth,
      endMonth: data.endMonth,
    };

    try {
      console.log(semesterData);
      const res = (await addAcademicSemester(
        semesterData
      )) as TResponse<TAcademicSemester>;
      console.log(res);
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
    <Flex justify="center">
      <Col span={6}>
        <PHForm
          onSubmit={onSubmit}
          resolver={zodResolver(academicSemesterSchema)}
        >
          <PHSelect options={nameOptions} label="Name" name="name" />
          <PHSelect options={yearOptions} label="Year" name="year" />
          <PHSelect
            options={monthOptions}
            label="Start Month"
            name="startMonth"
          />
          <PHSelect options={monthOptions} label="End Month" name="endMonth" />
          <Button className="" htmlType="submit">
            Submit
          </Button>
        </PHForm>
      </Col>
    </Flex>
  );
};

export default CreateAcademicSemester;
