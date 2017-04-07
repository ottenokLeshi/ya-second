import Schedule from './components/Schedule';
import { schools, classrooms, lectures } from './sheduleObjects';

const mySchedule = new Schedule();

schools.forEach(school => {
    mySchedule.createSchool(school.name, school.amount);
});
classrooms.forEach(classroom => {
    mySchedule.createClassroom(classroom.name, classroom.capacity);
});
lectures.forEach(lecture => {
    mySchedule.createLecture(lecture.name, lecture.lecturer,
        lecture.time, lecture.classroomId, lecture.schoolsId);
});
