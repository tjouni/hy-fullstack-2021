const Header = ({ course }) => {
  return <h1>{course.name}</h1>;
};

const Content = ({ parts }) => {
  return parts.map((part) => (
    <p key={part.id}>
      {part.name} {part.exercises}
    </p>
  ));
};

const Total = ({ parts }) => {
  console.log(parts);
  const sum = parts.reduce((a, b) => a + b.exercises, 0);
  return (
    <div>
      <b>
        <p>Number of exercises {sum}</p>
      </b>
    </div>
  );
};

const Course = ({ course }) => {
  return (
    <div>
      <Header course={course} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  );
};

export default Course;
