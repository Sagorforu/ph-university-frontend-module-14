import { Controller, FieldValues, SubmitHandler } from "react-hook-form";
import PHForm from "../../../components/form/PHForm";
import PHInput from "../../../components/form/PHInput";
import { Button, Col, Divider, Form, Input, Row } from "antd";
import PHSelect from "../../../components/form/PHSelect";
import {
  bloodGroupOptions,
  designationFacultyOptions,
  genderOptions,
} from "../../../components/constants/global";
import { useAddFacultyMutation } from "../../../redux/features/admin/userManagement.api";
import PHDatePicker from "../../../components/form/PHDatePicker";
import { useGetAllAcademicDepartmentQuery } from "../../../redux/features/admin/academicSemesterManagement.api";

const facultyDefaultValues = {
  designation: "Lecturer",
  name: {
    firstName: "Mridul ",
    middleName: "Das",
    lastName: "Rahman",
  },
  gender: "male",
  email: "faculty3@gmail.com",
  contactNo: "123",
  emergencyContactNo: "123",
  bloogGroup: "A+",
  presentAddress: "123 Main St, Cityville",
  permanentAddress: "456 Oak St, Townsville",
  academicDepartment: "65b00fb010b74fcbd7a25d8e",
};

const CreateFaculty = () => {
  const [addFaculty] = useAddFacultyMutation();

  const { data: dData, isLoading: dIsLoading } =
    useGetAllAcademicDepartmentQuery(undefined);

  const departmentOptions = dData?.data?.map((item) => ({
    value: item._id,
    label: `${item.name}`,
  }));

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    const facultyData = {
      password: "faculty123",
      faculty: data,
    };

    const formData = new FormData();
    formData.append("data", JSON.stringify(facultyData));
    formData.append("file", data.image);
    addFaculty(formData);
    //! this is for development
    //! Just for checking
    console.log(Object.fromEntries(formData));
  };

  return (
    <Row>
      <Col span={24}>
        <PHForm onSubmit={onSubmit} defaultValues={facultyDefaultValues}>
          <Row gutter={8}>
            <Divider>Personal Info</Divider>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHInput type="text" name="name.firstName" label="First Name" />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHInput type="text" name="name.middleName" label="Middle Name" />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHInput type="text" name="name.lastName" label="Last Name" />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHSelect options={genderOptions} name="gender" label="Gender" />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHDatePicker
                type="text"
                name="dateOfBirth"
                label="Date Of Birth"
              />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHSelect
                options={bloodGroupOptions}
                name="bloogGroup"
                label="Blood Group"
              />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <Controller
                name="image"
                render={({ field: { onChange, value, ...field } }) => (
                  <Form.Item label="Picture">
                    <Input
                      {...field}
                      value={value?.fileName}
                      type="file"
                      onChange={(e) => onChange(e.target.files?.[0])}
                    />
                  </Form.Item>
                )}
              />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHSelect
                options={designationFacultyOptions}
                name="designation"
                label="Designation"
              />
            </Col>
          </Row>
          <Row gutter={8}>
            <Divider>Contact Info</Divider>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHInput type="text" name="email" label="Email" />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHInput type="text" name="contactNo" label="Contact No" />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHInput
                type="text"
                name="emergencyContactNo"
                label="Emergency Contact No"
              />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHInput
                type="text"
                name="presentAddress"
                label="Present Address"
              />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHInput
                type="text"
                name="permanentAddress"
                label="Permanent Address"
              />
            </Col>
          </Row>
          <Row gutter={8}>
            <Divider>Academic Info</Divider>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHSelect
                options={departmentOptions}
                disabled={dIsLoading}
                name="academicDepartment"
                label="Academic Department"
              />
            </Col>
          </Row>
          <Button htmlType="submit">Submit</Button>
        </PHForm>
      </Col>
    </Row>
  );
};

export default CreateFaculty;
