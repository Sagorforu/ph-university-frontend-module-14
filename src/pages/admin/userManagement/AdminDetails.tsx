import { useParams } from "react-router-dom";

const AdminDetails = () => {
  const params = useParams();
  const { adminId } = params;

  return (
    <div>
      <h1>Admin Details page: {adminId}</h1>
    </div>
  );
};

export default AdminDetails;
