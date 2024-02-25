import { FieldValues, SubmitHandler } from "react-hook-form";
import PHForm from "../../../components/form/PHForm";
import { Button, Col, Flex } from "antd";
import PHSelect from "../../../components/form/PHSelect";
import { zodResolver } from "@hookform/resolvers/zod";
import { academicSemesterSchema } from "../../../components/schemas/academicManagement.schema";
import { useAddAcademicFacultyMutation } from "../../../redux/features/admin/academicSemesterManagement.api";
import { toast } from "sonner";
import { TResponse } from "../../../types/global";
import { facultyOptions } from "../../../components/constants/faculty";

const CreateAcademicFaculty = () => {
  const [addAcademicFaculty] = useAddAcademicFacultyMutation();

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const name = facultyOptions[Number(data?.name) - 1]?.label;
    const toastId = toast.loading("Creating...");

    const facultyData = {
      name: name,
    };
    try {
      const res = (await addAcademicFaculty(facultyData)) as TResponse;
      if (res.error) {
        toast.error(res.error.data.message, { id: toastId });
      } else {
        toast.success("Faculty created!!!", { id: toastId });
      }
      console.log(res);
    } catch (error: any) {
      toast.error(error.message, { id: toastId });
    }
  };
  return (
    <Flex justify="center" align="center">
      <Col span={6}>
        <PHForm
          onSubmit={onSubmit}
          resolver={zodResolver(academicSemesterSchema)}
        >
          <PHSelect label="Name" name="name" options={facultyOptions} />
          <Button htmlType="submit">Submit</Button>
        </PHForm>
      </Col>
    </Flex>
  );
};

export default CreateAcademicFaculty;
