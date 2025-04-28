import { useGetOfferedCoursesQuery } from "../../redux/features/student/studentManagement";

const OfferedCourse = () => {
    const {data: offeredCourses} = useGetOfferedCoursesQuery(undefined);

    console.log(offeredCourses);

    return (
        <div>
           <h1>Offered Course</h1> 
        </div>
    );
};

export default OfferedCourse;