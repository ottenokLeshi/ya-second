import School from '../mainObjects/School';
import Classroom from '../mainObjects/Classroom';
import Lecture from '../mainObjects/Lecture';

/**
 * Класс Schedule.
 *
 * @class
 */
export default class Schedule {
    /**
     * Конструктор класса
     *
     * @constructor
     */
    constructor() {
        this._state = {
            lectures: [],
            schools: [],
            classrooms: [],
            lastLectureId: 0,
            lastSchoolId: 0,
            lastClassroomId: 0
        };
    }

    /**
     * Создание элемента расписания
     *
     * @param {String} type - тип элемента один из ['school', 'classroom', 'lecture']
     * @param {Object} options - опции создаваемого элемента
     *
     * @return {Schedule}
     */
    create(type, options) {
        try {
            if (!type || !options) {
                throw new Error('Необходимо указать тип создаваего элемента и опции');
            }

            switch (type) {
            case 'school': {
                if (!options.name || !options.amount) {
                    throw new Error('Не указано название или количество учащихся');
                }
                if (typeof options.name !== 'string'
                    || typeof options.amount !== 'number'
                    || options.amount % 1 !== 0) {
                    throw new Error('Название школой должно быть строкой, а количество - целым числом');
                }
                const id = this._state.lastSchoolId + 1;
                const newSchool = new School(id, options);
                this._state.schools.push(newSchool);
                this._state.lastSchoolId += 1;
                break;
            }
            case 'classroom': {
                if (!options.name || !options.capacity) {
                    throw new Error('Не указано название аудитории или ее вместимость');
                }
                if (typeof options.name !== 'string'
                    || typeof options.capacity !== 'number'
                    || options.capacity % 1 !== 0) {
                    throw new Error('Название аудитории должно быть строкой, а вместимость - целым числом');
                }
                const id = this._state.lastClassroomId + 1;
                const newClassroom = new Classroom(id, options);
                this._state.classrooms.push(newClassroom);
                this._state.lastClassroomId += 1;
                break;
            }
            case 'lecture': {
                if (!options.name || !options.lecturer || !options.time ||
                    !options.classroomId || !options.schoolsId) {
                    throw new Error('Не хватает данных для создания лекции');
                }
                if (typeof options.name !== 'string'
                    || typeof options.lecturer !== 'string'
                    || typeof options.classroomId !== 'number'
                    || !Array.isArray(options.time)
                    || !Schedule.checkArray(options.time, timeValue => timeValue instanceof Date)
                    || !Schedule.checkArray(options.schoolsId, schoolId => typeof schoolId === 'number')
                ) {
                    throw new Error('Входные параметры имеют неверный тип');
                }
                const classroom = this._state.classrooms.filter(item => item.getId() === options.classroomId)[0];
                if (!classroom) {
                    console.log(classroom);
                    throw new Error('Указан id несуществующей аудитории');
                }
                if (Schedule.checkArray(options.schoolsId, schoolId =>
                    this._state.schools.filter(item => item.getId() === schoolId)[0] == null)
                ) {
                    throw new Error('Указан id несуществующей школы');
                }
                if (options.time[0].getTime() >= options.time[1].getTime()) {
                    throw new Error('Начало лекции не может быть позже конца');
                }
                if (options.time[0].getDay() !== options.time[1].getDay()
                    || options.time[0].getMonth() !== options.time[1].getMonth()) {
                    throw new Error('Лекция должна проводиться в один день');
                }
                if (classroom.getCapacity() <
                    options.schoolsId.map(schoolId => this.get('school', { id: schoolId, request: 'amount' }))
                             .reduce((sum, current) => sum + current)) {
                    throw new Error('Вместимость аудитории меньше количества студентов');
                }
                const classroomLectures = this._state.lectures
                                              .filter(lectureItem => lectureItem.getClassroomId() === options.classroomId);
                classroomLectures.forEach(lectureItem => {
                    if (Schedule.timeIntersect(lectureItem.getLectureTime(), options.time)) {
                        throw new Error('В этой аудитории и в это время уже проводится лекция');
                    }
                });
                // Выделить те лекции, которые проводятся для школы из schoolsId
                const lecturersContainsInSchoolId = this._state.lectures.filter(lecture =>
                    lecture.getSchoolsId()
                           .filter(schoolId => options.schoolsId.includes(schoolId)).length !== 0);
                if (Schedule.checkArray(lecturersContainsInSchoolId, lecture =>
                        Schedule.timeIntersect(lecture.getLectureTime(), options.time))) {
                    throw new Error('Для одной школы не может быть двух лекций одновременно');
                }

                const id = this._state.lastLectureId + 1;
                const newLecture = new Lecture(id, options);
                const schools = options.schoolsId.map(schoolId =>
                    this._state.schools.filter(item => item.getId() === schoolId)[0]);
                schools.forEach(school => school.addLecturesId(id));
                classroom.addLecturesId(id);
                this._state.lectures.push(newLecture);
                this._state.lastLectureId += 1;
                break;
            }
            }
        } catch (e) {
            return Schedule.errorHandle(e);
        }
        return this;
    }

    /**
     * Получение элемента расписания
     *
     * @param {String} type - тип элемента один из ['school', 'classroom', 'lecture']
     * @param {Object} options - опции запрашиваемого элемента
     *
     * @return {Object}
     */
    get(type, options) {
        let returningObject;
        try {
            if (!type || !options) {
                throw new Error('Необходимо указать тип создаваего элемента и опции');
            }

            switch (type) {
            case 'school': {
                if (!options.id) {
                    throw new Error('Необходимо указать id');
                }
                if (typeof options.id !== 'number') {
                    throw new Error('id должен быть числом');
                }
                const school = this._state.schools
                                   .filter(schoolItem => schoolItem.getId() === options.id)[0];
                if (!school) {
                    throw new Error('Указан id несуществующей школы');
                }
                returningObject = school;
                break;
            }
            case 'classroom': {
                if (!options.id) {
                    throw new Error('Необходимо указать id');
                }
                if (typeof options.id !== 'number') {
                    throw new Error('id должен быть числом');
                }
                const classroom = this._state.classrooms
                                      .filter(classroomItem => classroomItem.getId() === options.id)[0];
                if (!classroom) {
                    throw new Error('Указан id несуществующей аудитории');
                }
                returningObject = classroom;
                break;
            }
            case 'lecture': {
                switch (options.request) {
                case 'ownObject': {
                    if (!options.id) {
                        throw new Error('Необходимо указать id');
                    }
                    if (typeof options.id !== 'number') {
                        throw new Error('id должен быть числом');
                    }
                    const lecture = this._state.lectures.filter(item => item.getId() === options.id)[0];
                    if (!lecture) {
                        throw new Error('Указан id несуществующей лекции');
                    }
                    returningObject = lecture;
                    break;
                }
                case 'classroomLectures': {
                    if (!options.id) {
                        throw new Error('Необходимо указать id аудитории');
                    }
                    if (typeof options.id !== 'number') {
                        throw new Error('id должен быть числом');
                    }
                    returningObject = this._state.classrooms
                                  .filter(classroomItem => classroomItem.getId() === options.id)[0]
                                  .getLecturesId().map(lectureId => this.get('lecture', { id: lectureId, request: 'ownObject' }));
                    break;
                }
                case 'schoolLectures': {
                    if (!options.id) {
                        throw new Error('Необходимо указать id аудитории');
                    }
                    if (typeof options.id !== 'number') {
                        throw new Error('id должен быть числом');
                    }
                    returningObject = this._state.schools
                                  .filter(schoolItem => schoolItem.getId() === options.id)[0]
                                  .getLecturesId().map(lectureId => this.get('lecture', { id: lectureId, request: 'ownObject' }));
                    break;
                }
                case 'classroomLecturesInterval': {
                    if (!options.id || !options.time) {
                        throw new Error('Необходимо указать id аудитории и новое время');
                    }
                    if (typeof options.id !== 'number'
                        || !Array.isArray(options.time)
                        || !Schedule.checkArray(options.time, timeValue => timeValue instanceof Date)) {
                        throw new Error('id должен быть числом, а интервал - массивом объектов Date');
                    }
                    if (options.time[0].getTime() > options.time[1].getTime()) {
                        throw new Error('Задан некорректный интервал');
                    }
                    returningObject = this._state.classrooms
                                  .filter(classroomItem => classroomItem.getId() === options.id)[0]
                                  .getLecturesId().map(lectureId =>
                                                this.get('lecture', { id: lectureId, request: 'ownObject' }))
                                  .filter(lecture => {
                                      const time = lecture.getLectureTime();
                                      return (time[0].getTime() >= options.time[0].getTime() &&
                                      time[1].getTime() <= options.time[1].getTime());
                                  });
                    break;
                }
                case 'schoolLecturesInterval': {
                    if (!options.id || !options.time) {
                        throw new Error('Необходимо указать id аудитории и новое время');
                    }
                    if (typeof options.id !== 'number'
                        || !Array.isArray(options.time)
                        || !Schedule.checkArray(options.time, timeValue => timeValue instanceof Date)) {
                        throw new Error('id должен быть числом, а интервал - массивом объектов Date');
                    }
                    if (options.time[0].getTime() > options.time[1].getTime()) {
                        throw new Error('Задан некорректный интервал');
                    }
                    returningObject = this._state.schools
                                  .filter(schoolItem => schoolItem.getId() === options.id)[0]
                                  .getLecturesId().map(lectureId =>
                                                this.get('lecture', { id: lectureId, request: 'ownObject' }))
                                  .filter(lecture => {
                                      const time = lecture.getLectureTime();
                                      return (time[0].getTime() >= options.time[0].getTime() &&
                                      time[1].getTime() <= options.time[1].getTime());
                                  });
                }
                }
                break;
            }
            }
        } catch (e) {
            return Schedule.errorHandle(e);
        }
        return returningObject;
    }

    /**
     * Изменение элемента расписания
     *
     * @param {String} type - тип элемента один из ['school', 'classroom', 'lecture']
     * @param {Object} options - опции запрашиваемого элемента
     *
     * @return {Schedule}
     */
    change(type, options) {
        try {
            if (!type || !options) {
                throw new Error('Необходимо указать тип создаваего элемента и опции');
            }
            switch (type) {
            case 'school': {
                if (!options.id) {
                    throw new Error('Необходимо указать id');
                }
                if (typeof options.id !== 'number') {
                    throw new Error('id должен быть числом');
                }
                const school = this._state.schools
                                   .filter(schoolItem => schoolItem.getId() === options.id)[0];
                if (!school) {
                    throw new Error('Указан id несуществующей школы');
                }
                switch (options.request) {
                case 'name': {
                    if (!options.name) {
                        throw new Error('Необходимо указать ФИО');
                    }
                    if (typeof options.name !== 'string') {
                        throw new Error('ФИО должно быть строкой');
                    }
                    school.setName(options.name);
                    break;
                }
                case 'amount': {
                    if (!options.amount) {
                        throw new Error('Необходимо указать количество учащихся');
                    }
                    if (typeof options.amount !== 'number' || options.amount % 1 !== 0) {
                        throw new Error('Количество учащихся должно быть числом');
                    }

                    /* Находим все лекции, который проводятся для школы */
                    const schoolLectures = school.getLecturesId().map(lectureId =>
                        this._state.lectures.filter(item => item.getId() === lectureId)[0]);

                    /* Находим id школ, для которых которых проводятся лекции */
                    const schoolLecturesSchoolsId = schoolLectures.map(lecture => lecture.getSchoolsId());

                    /* Находим количество слущающих лекцию */
                    const schoolLecturesAmount = schoolLecturesSchoolsId.map(schoolIds => schoolIds
                        .map(schoolId => {
                            if (schoolId === options.id) {
                                return options.amount;
                            }
                            return this.get('school', { id: schoolId }).getAmount();
                        }).reduce((sum, current) => sum + current));

                    /* Находим аудитории, в которых проводятся лекции */
                    const schoolLecturesClassroom = schoolLectures.map(lecture => lecture.getClassroomId());

                    /* Находим вместимость аудитории по id */
                    const schoolLecturesCapacity = schoolLecturesClassroom
                                    .map(classroomId => this.get('classroom', { id: classroomId }).getCapacity());
                    for (let i = 0; i < schoolLecturesCapacity.length; i += 1) {
                        if (schoolLecturesAmount[i] > schoolLecturesCapacity[0]) {
                            throw new Error('В одной из аудиторий не хватает места для нового количества студентов');
                        }
                    }
                    school.setAmount(options.amount);
                    break;
                }
                }
                break;
            }
            case 'classroom': {
                if (!options.id) {
                    throw new Error('Необходимо указать id');
                }
                if (typeof options.id !== 'number') {
                    throw new Error('id должен быть числом');
                }
                const classroom = this._state.classrooms
                                      .filter(classroomItem => classroomItem.getId() === options.id)[0];
                if (!classroom) {
                    throw new Error('Указан id несуществующей аудитории');
                }
                switch (options.request) {
                case 'name': {
                    if (!options.name) {
                        throw new Error('Необходимо указать новое название');
                    }
                    if (typeof options.name !== 'string') {
                        throw new Error('Новое название должно быть строкой');
                    }
                    classroom.setName(options.name);
                    break;
                }
                case 'description': {
                    if (!options.description) {
                        throw new Error('Необходимо указать новое описание местоположения аудитории');
                    }
                    if (typeof options.description !== 'string') {
                        throw new Error('Новое описание местоположения аудитории должно быть строкой');
                    }
                    classroom.setDescription(options.description);
                    break;
                }
                case 'capacity': {
                    if (!options.capacity) {
                        throw new Error('Необходимо указать новую вместимость');
                    }
                    if (typeof options.capacity !== 'number' || options.capacity % 1 !== 0) {
                        throw new Error('Вместимость аудитории должна быть числом');
                    }
                    /* Находим все лекции, который проводятся в аудитории */
                    const classroomLectures = classroom.getLecturesId().map(lectureId =>
                        this._state.lectures.filter(item => item.getId() === lectureId)[0]);

                    /* Находим id школ, для которых которых проводятся лекции */
                    const schoolLecturesSchoolsId = classroomLectures.map(lecture => lecture.getSchoolsId());

                    /* Находим количество слущающих лекцию */
                    const schoolLecturesAmount = schoolLecturesSchoolsId.map(schoolIds => schoolIds
                    .map(schoolId => this.get('school', { id: schoolId }).getAmount())
                                         .reduce((sum, current) => sum + current));

                    schoolLecturesAmount.forEach(lectureAmount => {
                        if (lectureAmount > options.capacity) {
                            throw new Error('В этой аудитории проводится лекция с количеством студентов, ' +
                                'большим, чем новая вместимость');
                        }
                    });
                    classroom.setCapacity(options.capacity);
                    break;
                }
                }
                break;
            }
            case 'lecture': {
                if (!options.id) {
                    throw new Error('Необходимо указать id');
                }
                if (typeof options.id !== 'number') {
                    throw new Error('id должен быть числом');
                }
                const lecture = this._state.lectures
                                      .filter(lectureItem => lectureItem.getId() === options.id)[0];

                if (!lecture) {
                    throw new Error('Указан id несуществующей лекции');
                }
                switch (options.request) {
                case 'name': {
                    if (!options.name) {
                        throw new Error('Необходимо указать новое название');
                    }
                    if (typeof options.name !== 'string') {
                        throw new Error('Новое название должно быть строкой');
                    }
                    lecture.setName(options.name);
                    break;
                }
                case 'lecturer': {
                    if (!options.lecturer) {
                        throw new Error('Необходимо указать ФИО нового лектора');
                    }
                    if (typeof options.lecturer !== 'string') {
                        throw new Error('ФИО нового лектора должно быть строкой');
                    }
                    lecture.setLecturer(options.lecturer);
                    break;
                }
                case 'time': {
                    if (!Array.isArray(options.time)
                        || !Schedule.checkArray(options.time, timeValue => timeValue instanceof Date)) {
                        throw new Error('Некорректный тип у передаваемого id и нового времени');
                    }
                    if (options.time[0].getTime() >= options.time[1].getTime()) {
                        throw new Error('Начало лекции не может быть позже конца');
                    }
                    if (options.time[0].getDay() !== options.time[1].getDay()
                        || options.time[0].getMonth() !== options.time[1].getMonth()) {
                        throw new Error('Лекция должна проводиться в один день');
                    }
                    /* Находим лекции, которые проходят в этой же аудитории */
                    const lecturesInClassroom = this._state.lectures
                                                        .filter(item => item.getId() !== lecture.getId()
                                                        && item.getClassroomId() === lecture.getClassroomId());
                    /* Выбираем из этого массива те лецкии, которые по времени пересекаются */
                    const lecturesIntersected = lecturesInClassroom.filter(lectureItem =>
                        Schedule.timeIntersect(lectureItem.getLectureTime(), options.time));

                    if (lecturesIntersected.length !== 0) {
                        throw new Error('В этой аудитории и в это время уже проводится лекция');
                    }

                    /* Выделяем те лекции, которые проводятся для школ из schoolsId */
                    const lecturersContainsInSchoolId = this._state.lectures.filter(item =>
                    item.id !== lecture.getId() &&
                    item.getSchoolsId().filter(schoolId => lecture.getSchoolsId().includes(schoolId)).length !== 0);

                    if (Schedule.checkArray(lecturersContainsInSchoolId, item =>
                            Schedule.timeIntersect(item.getLectureTime(), options.time))) {
                        throw new Error('Для одной школы не может быть двух лекций одновременно');
                    }
                    lecture.setLectureTime(options.time);
                    break;
                }
                case 'classroomId': {
                    if (!options.classroomId) {
                        throw new Error('Необходимо указать новую аудиторию');
                    }
                    if (typeof options.classroomId !== 'number' || options.classroomId % 1 !== 0) {
                        throw new Error('Номер аудитории должен быть числом');
                    }
                    const classroom = this._state.classrooms
                                          .filter(classroomItem => classroomItem.getId() === options.classroomId)[0];
                    /* Выделяем массив лекций, которые проводятся в этой эже аудитории */
                    const classroomLectures = this._state.lectures
                                          .filter(lectureItem => lectureItem.getClassroomId() === options.classroomId);
                    classroomLectures.forEach(lectureItem => {
                        if (Schedule.timeIntersect(lectureItem.getLectureTime(), lecture.getLectureTime())) {
                            throw new Error('В этой аудитории и в это время уже проводится лекция');
                        }
                    });
                    if (classroom.getCapacity() < lecture.getSchoolsId().map(schoolId => this.get('school', { id: schoolId }).getAmount())
                               .reduce((sum, current) => sum + current)) {
                        throw new Error('Вместимость аудитории меньше количества студентов');
                    }
                    lecture.setClassroomId(options.classroomId);
                    break;
                }
                case 'schoolsId': {
                    if (!options.schoolsId) {
                        throw new Error('Необходимо указать id школ');
                    }
                    if (!Schedule.checkArray(options.schoolsId, schoolid => typeof schoolid === 'number')) {
                        throw new Error('id  школы должно быть числом');
                    }
                    if (Schedule.checkArray(options.schoolsId, schoolId =>
                        this._state.schools.filter(item => item.getId() === schoolId)[0] == null)
                    ) {
                        throw new Error('Указан id несуществующей школы');
                    }
                    const classroom = this._state.classrooms
                                          .filter(classroomItem => classroomItem.getId() === lecture.getClassroomId())[0];
                    if (classroom.getCapacity() < options.schoolsId.map(schoolId => this.get('school', { id: schoolId }).getAmount())
                               .reduce((sum, current) => sum + current)) {
                        throw new Error('Вместимость аудитории меньше количества студентов');
                    }
                    /* Выделить те лекции, которые проводятся для школы из schoolsId */
                    const lecturersContainsInSchoolId = this._state.lectures.filter(item =>
                        item.getId() !== options.id &&
                        item.getSchoolsId().filter(schoolId =>
                        options.schoolsId.includes(schoolId)).length !== 0);

                    if (Schedule.checkArray(lecturersContainsInSchoolId, item =>
                            Schedule.timeIntersect(item.getLectureTime(), lecture.getLectureTime()))) {
                        throw new Error('Для одной школы не может быть двух лекций одновременно');
                    }
                    break;
                }
                }
                break;
            }
            }
        } catch (e) {
            return Schedule.errorHandle(e);
        }
        return this;
    }

    /**
     * Удаление элемента расписания
     *
     * @param {String} type - тип элемента один из ['school', 'classroom', 'lecture']
     * @param {Object} options - опции удаляемого элемента
     *
     * @return {Object}
     */
    delete(type, options) {
        try {
            if (!type || !options) {
                throw new Error('Необходимо указать тип создаваего элемента и опции');
            }
            switch (type) {
            case 'school': {
                if (!options.id) {
                    throw new Error('Необходимо указать id');
                }
                if (typeof options.id !== 'number') {
                    throw new Error('id должен быть числом');
                }
                const school = this._state.schools.filter(item => item.getId() === options.id)[0];
                if (!school) {
                    throw new Error('Указан id несуществующей школы');
                }
                const lecturesContainsSchool = this._state.lectures
                                                       .filter(lecture => lecture.getSchoolsId()
                                                                                 .includes(options.id));
                const lecturesIdContainsSchool = lecturesContainsSchool.map(lecture => lecture.getId());
                if (lecturesContainsSchool.length !== 0) {
                    throw new Error(`Измените школы, для которых проводятся лекции ${lecturesIdContainsSchool}`);
                }
                this._state.schools = this._state.schools.filter(item => item.getId() !== options.id);
                break;
            }
            case 'classroom': {
                if (!options.id) {
                    throw new Error('Необходимо указать id');
                }
                if (typeof options.id !== 'number') {
                    throw new Error('id должен быть числом');
                }
                const classroom = this._state.classrooms.filter(item => item.getId() === options.id)[0];
                if (!classroom) {
                    throw new Error('Указан id несуществующей аудитории');
                }
                if (this._state.lectures.map(lecture => lecture.getClassroomId()).indexOf(options.id) !== -1) {
                    throw new Error(`Перенесите лекции ${classroom.getLecturesId()} из этой аудитории`);
                }
                this._state.classrooms = this._state.classrooms.filter(item => item.getId() !== options.id);
                break;
            }
            case 'lecture': {
                if (!options.id) {
                    throw new Error('Необходимо указать id');
                }
                if (typeof options.id !== 'number') {
                    throw new Error('id должен быть числом');
                }
                const lecture = this._state.lectures.filter(item => item.getId() === options.id)[0];
                if (!lecture) {
                    throw new Error('Указан id несуществующей лекции');
                }
                const classroom = this._state.classrooms
                                      .filter(item => item.getId() === lecture.getClassroomId())[0];
                classroom.deleteLecturesId(options.id);
                const schools = lecture.getSchoolsId().map(itemId => this.get('school', { id: itemId }));
                schools.forEach(school => school.deleteLecturesId(options.id));
                this._state.lectures = this._state.lectures.filter(lecture => lecture.getId() !== options.id);
                break;
            }
            }
        } catch (e) {
            return Schedule.errorHandle(e);
        }
        return this;
    }

    /**
     *  Обработка ошибки
     *
     * @param {Object} error - проверяемый массив
     *
     * @return {null}
     */
    static errorHandle(error) {
        console.error(`Error: ${error.message}`);
        return null;
    }

    /**
     *  Проверка массива на соответствие
     *
     * @param {Array} array - проверяемый массив
     * @param {Function} condition - функцияс условием проверки массива
     *
     * @return {Boolean}
     */
    static checkArray(array, condition) {
        const check = array.filter(condition);
        return Boolean(check.length);
    }

    /**
     *  Проверка персечения временных отрезков
     *
     * @param {Object} timeFirst - первая дата
     * @param {Object} timeSecond - вторая дата
     *
     * @return {Boolean}
     */
    static timeIntersect(timeFirst, timeSecond) {
        const timeFirstBegin = timeFirst[0].getTime();
        const timeFirstEnd = timeFirst[1].getTime();
        const timeSecondBegin = timeSecond[0].getTime();
        const timeSecondEnd = timeSecond[1].getTime();

        const timeBeginMax = Math.max(timeFirstBegin, timeSecondBegin);
        const timeEndMin = Math.min(timeFirstEnd, timeSecondEnd);
        return ((timeEndMin - timeBeginMax) > 0 &&
        timeFirst[0].getDay() === timeSecond[0].getDay() &&
        timeFirst[0].getMonth() === timeSecond[0].getMonth());
    }
}
