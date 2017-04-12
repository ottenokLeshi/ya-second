const schools = [{
    name: 'Школа разработки интерфейсов',
    amount: 32
}, {
    name: 'Школа мобильного дизайна',
    amount: 35
}, {
    name: 'Школа разработки приложений',
    amount: 25
}];

const classrooms = [{
    name: 'Синий кит',
    capacity: 4
}, {
    name: 'Рыжий голубь',
    capacity: 100
}, {
    name: 'Белая лисица',
    capacity: 61
}, {
    name: 'Красный волк',
    capacity: 34
}, {
    name: 'Розовый слон',
    capacity: 63
}, {
    name: 'Бордовый олень',
    capacity: 50
}, {
    name: 'Фиолетовая лама',
    capacity: 200
}];

const lectures = [{
    name: 'Разработка 1',
    lecturer: 'Василич',
    time: [new Date(2017, 1, 1, 17, 30), new Date(2017, 1, 1, 19, 30)],
    classroomId: 2,
    schoolsId: [1, 2, 3]
}, {
    name: 'Разработка 2',
    lecturer: 'Петрович',
    time: [new Date(2017, 1, 3, 17, 30), new Date(2017, 1, 3, 19, 30)],
    classroomId: 2,
    schoolsId: [2]
}, {
    name: 'Разработка 3',
    lecturer: 'Саныч',
    time: [new Date(2017, 1, 3, 17, 30), new Date(2017, 1, 3, 19, 30)],
    classroomId: 3,
    schoolsId: [1, 3]
}, {
    name: 'Разработка 4',
    lecturer: 'Олегыч',
    time: [new Date(2017, 1, 4, 7, 30), new Date(2017, 1, 4, 9, 30)],
    classroomId: 2,
    schoolsId: [1, 2, 3]
}, {
    name: 'Разработка 5',
    lecturer: 'Георгич',
    time: [new Date(2017, 1, 4, 17, 30), new Date(2017, 1, 4, 19, 30)],
    classroomId: 7,
    schoolsId: [2]
}];

export { schools, classrooms, lectures };
