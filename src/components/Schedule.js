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
        if (!name || !amount) {
            throw new Error('Не указано название или количество учащихся');
        }
        if (typeof name !== 'string' || typeof amount !== 'number') {
            throw new Error('Название школой должно быть строкой, а количество - числом');
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
        return school;
    }

    /**
     * Удаление школы по ID
     *
     * @param {Number} id - ID школы
     *
     * @return {Schedule}
     */
    deleteSchool(id) {
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
        if (!name || !id) {
            throw new Error('Не указано название или id изменяемой школы');
        }
        if (typeof name !== 'string' || typeof id !== 'number') {
            throw new Error('Новое название школы должно быть строкой, а id - числом');
        }
        const school = this.state.schools.filter(item => item.id === id)[0];
        if (!school) {
            throw new Error('Указан id несуществующей школы');
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
        if (!amount || !id) {
            throw new Error('Не указано название или id изменяемой школы');
        }
        if (typeof amount !== 'number' || typeof id !== 'number') {
            throw new Error('Новое количество учащихся школы должно быть числом, а id - числом');
        }
        const school = this.state.schools.filter(item => item.id === id)[0];
        if (!school) {
            throw new Error('Указан id несуществующей школы');
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
        if (!name || !capacity) {
            throw new Error('Не указано название аудитории или ее вместимость');
        }
        if (typeof name !== 'string' || typeof capacity !== 'number') {
            throw new Error('Название аудитории должно быть строкой, а вместимость - числом');
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
        if (!id) {
            throw new Error('Необходимо указать id');
        }
        if (typeof id !== 'number') {
            throw new Error('id должен быть числом');
        }
        const classroom = this.state.classrooms.filter(item => item.id === id)[0];
        if (!classroom) {
            throw new Error('Указан id несуществующей аудитории');
        }
        return classroom;
    }

    /**
     * Удаление аудитории по ID
     *
     * @param {Number} id - ID аудитории
     *
     * @return {Schedule}
     */
    deleteClassroom(id) {
        if (!id) {
            throw new Error('Необходимо указать id');
        }
        if (typeof id !== 'number') {
            throw new Error('id должен быть числом');
        }
        const classroom = this.state.classrooms.filter(item => item.id === id)[0];
        if (!classroom) {
            throw new Error('Указан id несуществующей аудитории');
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
        if (!name || !id) {
            throw new Error('Не указано название или id изменяемой аудитории');
        }
        if (typeof name !== 'string' || typeof id !== 'number') {
            throw new Error('Новое название аудитории должно быть строкой, а id - числом');
        }
        const classroom = this.state.classrooms.filter(item => item.id === id)[0];
        if (!classroom) {
            throw new Error('Указан id несуществующей школы');
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
        if (!capacity || !id) {
            throw new Error('Не указана новая вместимость или id изменяемой аудитории');
        }
        if (typeof capacity !== 'number' || typeof id !== 'number') {
            throw new Error('Новая вместимость аудитории должна быть числом, а id - числом');
        }
        const classroom = this.state.classrooms.filter(item => item.id === id)[0];
        if (!classroom) {
            throw new Error('Указан id несуществующей аудитории');
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
        if (!description || !id) {
            throw new Error('Не указано описание или id изменяемой аудитории');
        }
        if (typeof description !== 'string' || typeof id !== 'number') {
            throw new Error('Описание аудитории должно быть строкой, а id - числом');
        }
        const classroom = this.state.classrooms.filter(item => item.id === id)[0];
        if (!classroom) {
            throw new Error('Указан id несуществующей школы');
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
        this.state.lectures.push({
            name,
            lecturer,
            time,
            classroomId,
            schoolsId,
            id: this.state.lastLectureId += 1
        });
        return this;
    }

    /**
     *  Проверка массива на соответствие
     *
     * @param {Array} array - проверяемый массив
     * @param {Function} condition - функция, проверяющая значения массива
     *
     * @return {Boolean}
     */
    static checkArray(array, condition) {
        const check = array.filter(condition);
        return Boolean(check.length);
    }
}
