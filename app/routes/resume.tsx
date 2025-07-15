import { useParams } from "react-router";

const Resume = () => {
  const { id } = useParams();

  return <div>resume {id}</div>;
};

export default Resume;
