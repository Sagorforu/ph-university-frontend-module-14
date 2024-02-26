import { DatePicker, Form } from "antd";
import { Controller } from "react-hook-form";

type TPHDatePickerProps = {
  type: string;
  name: string;
  label?: string;
};

const PHDatePicker = ({ name, label }: TPHDatePickerProps) => {
  return (
    <div style={{ marginBottom: 20 }}>
      <Controller
        name={name}
        render={({ field }) => (
          <Form.Item label={label}>
            <DatePicker {...field} size="large" style={{ width: "100%" }} />
          </Form.Item>
        )}
      />
    </div>
  );
};

export default PHDatePicker;
