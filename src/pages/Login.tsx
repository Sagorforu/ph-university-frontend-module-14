import { Button, Row } from "antd";
import { FieldValues } from "react-hook-form";
import { useLoginMutation } from "../redux/features/auth/authApi";
import { useAppDispatch } from "../redux/features/hooks";
import { TUser, setUser } from "../redux/features/auth/authSlice";
import { verifyToken } from "../utils/verifyToken";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import PHForm from "../components/form/PHForm";
import PHInput from "../components/form/PHInput";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const [login] = useLoginMutation();

  const defaultValues = {
    id: "A-0002",
    password: "admin123",
  };

  const onSubmit = async (data: FieldValues) => {
    const toastId = toast.loading("Logging in");
    try {
      const userInfo = {
        id: data.id,
        password: data.password,
      };
      const res = await login(userInfo).unwrap();
      const user = verifyToken(res.data.accessToken) as TUser;
      dispatch(setUser({ user: user, token: res.data.accessToken }));
      toast.success("User logged in successfully", {
        id: toastId,
        duration: 2000,
      });
      navigate(`/${user.role}/dashboard`);
    } catch (error) {
      toast.error("user can't logged in", { id: toastId, duration: 2000 });
    }
  };

  return (
    <Row justify="center" align="middle">
      <PHForm onSubmit={onSubmit} defaultValues={defaultValues}>
        <h1>Login here</h1>
        <PHInput type="text" name="id" label="ID:" />
        <PHInput type="text" name="password" label="Password" />
        <Button htmlType="submit">Submit</Button>
      </PHForm>
    </Row>
  );
};

export default Login;
