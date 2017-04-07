/**
 * Класс School.
 * Школа в рамках которой проходит обучение
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
        this.state = {
            lectures: [],
            schools: [],
            classrooms: [],
            lastLectureId: 0,
            lastSchoolId: 0,
            lastClassroomId: 0
        };
    }

    /**
     * Создание школы
     *
     * @param {String} name - Название школы
     * @param {Number} amount - Количество учащихся
     *
     * @return {Schedule}
     */
    createSchool(name, amount) {
        try {
            if (!name || !amount) {
                throw new Error('Не указано название или количество учащихся');
            }
            if (typeof name !== 'string' || typeof amount !== 'number') {
                throw new Error('Название школой должно быть строкой, а количество - числом');
            }
        } catch (e) {
            return Schedule.errorHandle(e);
        }
        this.state.schools.push({
            name,
            amount,
            id: this.state.lastSchoolId += 1,
            lecturersId: []
        });
        return this;
    }

    /**
     * Возвращение школы по ID
     *
     * @param {Number} id - ID школы
     *
     * @return {Object} - объект школы с соответствующим ID
     */
    getSchool(id) {
        const school = this.state.schools.filter(item => item.id === id)[0];
        try {
            if (!id) {
                throw new Error('Необходимо указать id');
            }
            if (typeof id !== 'number') {
                throw new Error('id должен быть числом');
            }
            if (!school) {
                throw new Error('Указан id несуществующей школы');
            }
        } catch (e) {
            return Schedule.errorHandle(e);
        }
        return school;
    }

    /**
     * Возвращение леций школы по ID
     *
     * @param {Number} id - ID школы
     *
     * @return {Array} - массив ID лекций школы с соответствующим ID
     */
    getSchoolLectures(id) {
        const school = this.state.schools.filter(item => item.id === id)[0];
        try {
            if (!id) {
                throw new Error('Необходимо указать id');
            }
            if (typeof id !== 'number') {
                throw new Error('id должен быть числом');
            }
            if (!school) {
                throw new Error('Указан id несуществующей школы');
            }
        } catch (e) {
            return Schedule.errorHandle(e);
        }
        return school.lecturersId;
    }

    /**
     * Возвращение количества учащихся школы по ID
     *
     * @param {Number} id - ID школы
     *
     * @return {Number} - количество учащихся
     */
    getSchoolAmount(id) {
        const school = this.state.schools.filter(item => item.id === id)[0];
        try {
            if (!id) {
                throw new Error('Необходимо указать id');
            }
            if (typeof id !== 'number') {
                throw new Error('id должен быть числом');
            }
            if (!school) {
                throw new Error('Указан id несуществующей школы');
            }
        } catch (e) {
            return Schedule.errorHandle(e);
        }
        return school.amount;
    }

    /**
     * Удаление школы по ID
     *
     * @param {Number} id - ID школы
     *
     * @return {Schedule}
     */
    deleteSchool(id) {
        try {
            if (!id) {
                throw new Error('Необходимо указать id');
            }
            if (typeof id !== 'number') {
                throw new Error('id должен быть числом');
            }
            const school = this.state.schools.filter(item => item.id === id)[0];
            if (!school) {
                throw new Error('Указан id несуществующей школы');
            }
        } catch (e) {
            return Schedule.errorHandle(e);
        }
        this.state.schools = this.state.schools.filter(item => item.id !== id);
        return this;
    }

    /**
     * Изменение название школы по ID
     *
     * @param {Number} id - ID школы
     * @param {String} name - новое название школы
     *
     * @return {Schedule}
     */
    changeSchoolName(id, name) {
        const school = this.state.schools.filter(item => item.id === id)[0];
        try {
            if (!name || !id) {
                throw new Error('Не указано название или id изменяемой школы');
            }
            if (typeof name !== 'string' || typeof id !== 'number') {
                throw new Error('Новое название школы должно быть строкой, а id - числом');
            }
            if (!school) {
                throw new Error('Указан id несуществующей школы');
            }
        } catch (e) {
            return Schedule.errorHandle(e);
        }
        school.name = name;
        return this;
    }

    /**
     * Изменение количества учащихся школы по ID
     *
     * @param {Number} id - ID школы
     * @param {Number} amount - новое количество учащихся
     *
     * @return {Schedule}
     */
    changeSchoolAmount(id, amount) {
        const school = this.state.schools.filter(item => item.id === id)[0];
        try {
            if (!amount || !id) {
                throw new Error('Не указано название или id изменяемой школы');
            }
            if (typeof amount !== 'number' || typeof id !== 'number') {
                throw new Error('Новое количество учащихся школы должно быть числом, а id - числом');
            }
            if (!school) {
                throw new Error('Указан id несуществующей школы');
            }
        } catch (e) {
            return Schedule.errorHandle(e);
        }
        school.amount = amount;
        return this;
    }

    /**
     * Создание Аудитории
     *
     * @param {String} name - Название аудитории
     * @param {Number} capacity - Вместимость
     * @param {String} description - Описание местонахождения
     *
     * @return {Schedule}
     */
    createClassroom(name, capacity, description) {
        try {
            if (!name || !capacity) {
                throw new Error('Не указано название аудитории или ее вместимость');
            }
            if (typeof name !== 'string' || typeof capacity !== 'number') {
                throw new Error('Название аудитории должно быть строкой, а вместимость - числом');
            }
        } catch (e) {
            return Schedule.errorHandle(e);
        }
        this.state.classrooms.push({
            name,
            capacity,
            description: description || '',
            id: this.state.lastClassroomId += 1,
            lecturersId: []
        });
        return this;
    }

    /**
     * Возвращение аудитории по ID
     *
     * @param {Number} id - ID аудитории
     *
     * @return {Object} - объект аудитории с соответствующим ID
     */
    getClassroom(id) {
        const classroom = this.state.classrooms.filter(item => item.id === id)[0];
        try {
            if (!id) {
                throw new Error('Необходимо указать id');
            }
            if (typeof id !== 'number') {
                throw new Error('id должен быть числом');
            }
            if (!classroom) {
                throw new Error('Указан id несуществующей аудитории');
            }
        } catch (e) {
            return Schedule.errorHandle(e);
        }
        return classroom;
    }

    /**
     * Возвращение вместимости аудитории по ID
     *
     * @param {Number} id - ID аудитории
     *
     * @return {Number} - вместимость аудитории с соответствующим ID
     */
    getClassroomCapacity(id) {
        const classroom = this.state.classrooms.filter(item => item.id === id)[0];
        try {
            if (!id) {
                throw new Error('Необходимо указать id');
            }
            if (typeof id !== 'number') {
                throw new Error('id должен быть числом');
            }
            if (!classroom) {
                throw new Error('Указан id несуществующей аудитории');
            }
        } catch (e) {
            return Schedule.errorHandle(e);
        }
        return classroom.capacity;
    }

    /**
     * Удаление аудитории по ID
     *
     * @param {Number} id - ID аудитории
     *
     * @return {Schedule}
     */
    deleteClassroom(id) {
        const classroom = this.state.classrooms.filter(item => item.id === id)[0];
        try {
            if (!id) {
                throw new Error('Необходимо указать id');
            }
            if (typeof id !== 'number') {
                throw new Error('id должен быть числом');
            }
            if (!classroom) {
                throw new Error('Указан id несуществующей аудитории');
            }
        } catch (e) {
            return Schedule.errorHandle(e);
        }
        this.state.classrooms = this.state.classrooms.filter(item => item.id !== id);
        return this;
    }

    /**
     * Изменение название Аудитории по ID
     *
     * @param {Number} id - ID аудитории
     * @param {String} name - новое название аудитории
     *
     * @return {Schedule}
     */
    changeClassroomName(id, name) {
        const classroom = this.state.classrooms.filter(item => item.id === id)[0];
        try {
            if (!name || !id) {
                throw new Error('Не указано название или id изменяемой аудитории');
            }
            if (typeof name !== 'string' || typeof id !== 'number') {
                throw new Error('Новое название аудитории должно быть строкой, а id - числом');
            }
            if (!classroom) {
                throw new Error('Указан id несуществующей школы');
            }
        } catch (e) {
            return Schedule.errorHandle(e);
        }
        classroom.name = name;
        return this;
    }

    /**
     * Изменение вместимости Аудитории по ID
     *
     * @param {Number} id - ID аудитории
     * @param {String} capacity - новая вместимость аудитории
     *
     * @return {Schedule}
     */
    changeClassroomCapacity(id, capacity) {
        const classroom = this.state.classrooms.filter(item => item.id === id)[0];
        try {
            if (!capacity || !id) {
                throw new Error('Не указана новая вместимость или id изменяемой аудитории');
            }
            if (typeof capacity !== 'number' || typeof id !== 'number') {
                throw new Error('Новая вместимость аудитории должна быть числом, а id - числом');
            }
            if (!classroom) {
                throw new Error('Указан id несуществующей аудитории');
            }
        } catch (e) {
            return Schedule.errorHandle(e);
        }
        classroom.capacity = capacity;
        return this;
    }

    /**
     * Изменение описания местонахождения Аудитории по ID
     *
     * @param {Number} id - ID аудитории
     * @param {String} description - новое описание аудитории
     *
     * @return {Schedule}
     */
    changeClassroomDescription(id, description) {
        const classroom = this.state.classrooms.filter(item => item.id === id)[0];
        try {
            if (!description || !id) {
                throw new Error('Не указано описание или id изменяемой аудитории');
            }
            if (typeof description !== 'string' || typeof id !== 'number') {
                throw new Error('Описание аудитории должно быть строкой, а id - числом');
            }
            if (!classroom) {
                throw new Error('Указан id несуществующей школы');
            }
        } catch (e) {
            return Schedule.errorHandle(e);
        }
        classroom.description = description;
        return this;
    }

    /**
     * Создание лекции
     *
     * @param {String} name - название аудитории
     * @param {String} lecturer - фамилия лектора
     * @param {Object[]} time - [dataBegin, dataEnd] дата и время начала и конца лекции
     * @param {Number} classroomId - ID аудитории, в которой проходит лекция
     * @param {Number[]} schoolsId - массив ID школ, для которых проводится лекция
     *
     * @return {Schedule}
     */
    createLecture(name, lecturer, time, classroomId, schoolsId) {
        try {
            if (!name || !lecturer || !time || !classroomId || !schoolsId) {
                throw new Error('Не хватает данных для создания лекции');
            }
            if (typeof name !== 'string'
                || typeof lecturer !== 'string'
                || typeof classroomId !== 'number'
                || !Schedule.checkArray(time, timeValue => timeValue instanceof Date)
                || !Schedule.checkArray(schoolsId, id => typeof id === 'number')
            ) {
                throw new Error('Входные параметры имеют неверный тип');
            }
            const classroom = this.state.classrooms.filter(item => item.id === classroomId)[0];
            if (!classroom) {
                throw new Error('Указан id несуществующей аудитории');
            }
            if (Schedule.checkArray(schoolsId, id =>
                this.state.schools.filter(item => item.id === id)[0] == null)
            ) {
                throw new Error('Указан id несуществующей школы');
            }
            if (this.state.lectures.map(lecture => lecture.classroomId).indexOf(classroomId) !== -1 &&
                this.state.lectures.filter(lecture => lecture.classroomId === classroomId)
                    .filter(item => Schedule.timeIntersect(item.time, time))
                    .length !== 0
            ) {
                throw new Error('В этой аудитории и в это время уже проводится лекция');
            }
            if (time[0].getDay() !== time[1].getDay() || time[0].getMonth() !== time[1].getMonth()) {
                throw new Error('Лекция должна проводиться в один день');
            }
            if (this.getClassroomCapacity(classroomId) <
                schoolsId.map(id => this.getSchoolAmount(id)).reduce((sum, current) => sum + current)) {
                throw new Error('Вместимость аудитории меньше количества студентов');
            }
            // Выделить те лекции, которые проводятся для школы из schoolsId
            const lecturersContainsInSchoolId = this.state.lectures.filter(lecture =>
                lecture.schoolsId.filter(id => schoolsId.includes(id)).length !== 0);
            if (Schedule.checkArray(lecturersContainsInSchoolId, lecture =>
                    Schedule.timeIntersect(lecture.time, time))) {
                throw new Error('Для одной школы не может быть двух лекций одновременно');
            }
        } catch (e) {
            return Schedule.errorHandle(e);
        }
        this.state.lastLectureId += 1;
        schoolsId.forEach(id => this.getSchoolLectures(id).push(this.state.lastLectureId));
        this.state.lectures.push({
            name,
            lecturer,
            time,
            classroomId,
            schoolsId,
            id: this.state.lastLectureId
        });
        return this;
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
