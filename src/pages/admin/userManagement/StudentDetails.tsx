import { useParams } from "react-router-dom";

const StudentDetails = () => {
  const params = useParams();
  const { studentId } = params;

  return (
    <div>
      <h1>Student Details page: {studentId}</h1>
    </div>
  );
};

export default StudentDetails;
