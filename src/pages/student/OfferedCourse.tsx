/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, Card, Col, Divider, Row, Tag } from "antd";
import {
  useEnrollCourseMutation,
  useGetAllOfferedCoursesQuery,
} from "../../redux/features/student/studentManagement";
import Title from "antd/es/typography/Title";

type TCourse = {
  [index: string]: any;
};

const OfferedCourse = () => {
  const { data: offeredCourses } = useGetAllOfferedCoursesQuery(undefined);
  const [enroll] = useEnrollCourseMutation();

  const singleObject = offeredCourses?.data?.reduce(
    (acc: TCourse, item: TCourse) => {
      const key = item.course.title;

      acc[key] = acc[key] || { courseTitle: key, sections: [] };

      acc[key].sections.push({
        section: item.section,
        _id: item._id,
        days: item.days,
        startTime: item.startTime,
        endTime: item.endTime,
      });

      return acc;
    },
    {}
  );

  const modifiedData = Object.values(singleObject ? singleObject : {});

  const handleEnroll = async(id: any) => {
    const enrollData = {
      offeredCourse: id,
    };

    const res = await enroll(enrollData);
    console.log(res);
  };

  if(!modifiedData.length){
    return <h2 style={{display: 'flex', justifyContent: 'center', alignContent: 'center'}}>There has not any Offer Course to Enroll!</h2>
  }

  return (
    <Row gutter={[16, 16]}>        
      {modifiedData.map((item: any) => (
        <Col span={24} key={item.courseTitle}>
          <Card
            bordered
            hoverable
            style={{ borderRadius: 10, boxShadow: "0 2px 8px rgba(0,0,0,0.1)" }}
          >
            <Title level={4}>📘 Course Title: {item.courseTitle}</Title>
            <Divider />

            {/* Table header row */}
            <Row gutter={16} style={{ fontWeight: "bold", padding: "8px 0" }}>
              <Col span={6}>📚 Section</Col>
              <Col span={6}>🗓️ Days</Col>
              <Col span={6}>🕐 Start Time</Col>
              <Col span={4}>🕒 End Time</Col>
              <Col span={2}></Col> {/* Button column */}
            </Row>

            {item.sections.map((section: any) => (
              <Row
                key={section._id}
                gutter={16}
                style={{
                  backgroundColor: "#fafafa",
                  borderRadius: 6,
                  marginBottom: 8,
                  padding: "8px",
                  alignItems: "center",
                }}
              >
                <Col span={6}>{section.section}</Col>
                <Col span={6}>
                  {section.days.map((day: any) => (
                    <Tag color="blue" key={day}>
                      {day}
                    </Tag>
                  ))}
                </Col>
                <Col span={6}>
                  <strong>{section.startTime}</strong>
                </Col>
                <Col span={4}>
                  <strong>{section.endTime}</strong>
                </Col>
                <Col span={2}>
                  <Button
                    onClick={() => handleEnroll(section._id)}
                    type="primary"
                    size="small"
                  >
                    Enroll
                  </Button>
                </Col>
              </Row>
            ))}
          </Card>
        </Col>
      ))}
    </Row>
  );
};

export default OfferedCourse;
