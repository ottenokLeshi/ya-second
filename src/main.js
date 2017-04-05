import Schedule from './components/Schedule';

const mySchedule = new Schedule();

mySchedule.createSchool('Школа разработки интерфейсов', 32);
mySchedule.createSchool('Школа мобильного дизайна', 35);
mySchedule.createSchool('Школа разработки приложений', 25);

mySchedule.createClassroom('Синий кит', 40);
mySchedule.createClassroom('Рыжий голубь', 100);
mySchedule.createClassroom('Белая лисица', 61);

mySchedule.changeSchoolAmount(2, 60);
mySchedule.changeClassroomCapacity(2, 90);

mySchedule.changeSchoolName(2, 'Школа дизайна');
mySchedule.changeClassroomName(2, 'Розовый слон');

mySchedule.changeClassroomDescription(2, 'Справа от входа');

mySchedule.getSchool(3);
mySchedule.getClassroom(3);

mySchedule.deleteSchool(3);
mySchedule.deleteClassroom(3);

mySchedule.createLecture('Новая лекция', 'Платонов', [new Date(2017, 1, 1, 17, 30),
    new Date(2017, 1, 1, 19, 30)], 2, [1, 2]);