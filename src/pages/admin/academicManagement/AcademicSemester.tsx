import { useGetAllSemestersQuery } from "../../../redux/features/academicSemester/academicSemester";

const AcademicSemester = () => {

  const {data} = useGetAllSemestersQuery(undefined);

    return (
        <div>
          <h1>Academic Semester</h1>  
        </div>
    );
};

export default AcademicSemester;