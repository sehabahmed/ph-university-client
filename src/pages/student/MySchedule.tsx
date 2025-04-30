import { Card, Col, Divider, Row, Tag } from "antd";
import { useGetAllEnrolledCoursesQuery } from "../../redux/features/student/studentManagement";
import Title from "antd/es/typography/Title";

const MySchedule = () => {
  const { data: myScheduleData } = useGetAllEnrolledCoursesQuery(undefined);

  console.log(myScheduleData);
  if (!myScheduleData?.data?.length) {
    return (
      <h3
        style={{
          display: "flex",
          justifyContent: "center",
          alignContent: "center",
        }}
      >
        You have not enrolled any course yet.
      </h3>
    );
  }
  return (
    <Row gutter={[16, 16]}>
      {myScheduleData?.data?.map((item: any) => (
        <Col span={24} key={item._id}>
          <Card
            bordered
            hoverable
            style={{ borderRadius: 10, boxShadow: "0 2px 8px rgba(0,0,0,0.1)" }}
          >
            <Title level={4}>📘 Course Title: {item.course.title}</Title>
            <Divider />

            {/* Table header row */}
            <Row gutter={16} style={{ fontWeight: "bold", padding: "8px 0" }}>
              <Col span={6}>📚 Section</Col>
              <Col span={6}>🗓️ Days</Col>
              <Col span={6}>🕐 Start Time</Col>
              <Col span={6}>🕒 End Time</Col>
            </Row>

            {/* Data row */}
            <Row
              gutter={16}
              style={{
                backgroundColor: "#fafafa",
                borderRadius: 6,
                marginBottom: 8,
                padding: "8px",
                alignItems: "center",
              }}
            >
              <Col span={6}>{item.offeredCourse.section}</Col>
              <Col span={6}>
                {item.offeredCourse.days.map((day: string) => (
                  <Tag color="blue" key={day}>
                    {day}
                  </Tag>
                ))}
              </Col>
              <Col span={6}>
                <strong>{item.offeredCourse.startTime}</strong>
              </Col>
              <Col span={6}>
                <strong>{item.offeredCourse.endTime}</strong>
              </Col>
            </Row>
          </Card>
        </Col>
      ))}
    </Row>
  );
};

export default MySchedule;
