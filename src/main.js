import Schedule from './components/Schedule';
import { schools, classrooms, lectures } from './sheduleObjects';

const mySchedule = new Schedule();
schools.forEach(school => {
    mySchedule.create('school', { name: school.name, amount: school.amount });
});

classrooms.forEach(classroom => {
    mySchedule.create('classroom', { name: classroom.name, capacity: classroom.capacity });
});

lectures.forEach(lecture => {
    mySchedule.create('lecture', {
        name: lecture.name,
        lecturer: lecture.lecturer,
        time: lecture.time,
        classroomId: lecture.classroomId,
        schoolsId: lecture.schoolsId
    });
});