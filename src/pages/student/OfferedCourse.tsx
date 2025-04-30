import { useGetAllOfferedCoursesQuery } from "../../redux/features/student/studentManagement";

const OfferedCourse = () => {
  const { data: offeredCourses } = useGetAllOfferedCoursesQuery(undefined);

  const singleObject = offeredCourses?.data?.reduce((acc, item) => {
    const key = item.course.title;

    acc[key] = acc[key] || { courseTitle: key, sections: [] };

    acc[key].sections.push({
      section: item.section,
      _id: item._id,
    });

    return acc;
  }, {});

  console.log(Object.values(singleObject ? singleObject : {}));

  return (
    <div>
      <h1>Offered Course</h1>
    </div>
  );
};

export default OfferedCourse;
