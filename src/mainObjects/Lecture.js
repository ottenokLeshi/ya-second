/**
 * Класс Lecture
 *
 * @class
 */
export default class Lecture {
    /**
     * Конструктор аудитории
     *
     * @param {Number} id - Уникально id лекции
     * @param {Object} options - свойства
     * @param {String} options.name - название аудитории
     * @param {String} options.lecturer - фамилия лектора
     * @param {Object[]} options.time - [dataBegin, dataEnd] дата и время начала и конца лекции
     * @param {Number} options.classroomId - ID аудитории, в которой проходит лекция
     * @param {Number[]} options.schoolsId - массив ID школ, для которых проводится лекция
     *
     * @constructor
     */
    constructor(id, options) {
        const name = options.name;
        const lecturer = options.lecturer;
        const time = options.time;
        const classroomId = options.classroomId;
        const schoolsId = options.schoolsId;

        this._id = id;
        this._name = name;
        this._lecturer = lecturer;
        this._time = time;
        this._classroomId = classroomId;
        this._schoolsId = schoolsId;
        return this;
    }

    /**
     * Возвращение Id лекции
     *
     * @return {Number}
     */
    getId() {
        return this._id;
    }

    /**
     * Возвращение названия лекции
     *
     * @return {String}
     */
    getName() {
        return this._name;
    }

    /**
     * Изменение названия лекции
     *
     * @param {String} newName - новое название
     *
     * @return {Lecture}
     */
    setName(newName) {
        this._name = newName;
        return this;
    }

    /**
     * Вернуть ФИО лектора
     *
     * @return {String}
     */
    getLecturer() {
        return this._lecturer;
    }

    /**
     * Изменить ФИО лектора
     *
     * @param {String} newLecturer - новое ФИО лектора
     *
     * @return {Lecture} - новый лектор
     */
    setLecturer(newLecturer) {
        this._lecturer = newLecturer;
        return this;
    }

    /**
     * Вернуть время проведения лекции
     *
     * @return {Object[]}
     */
    getLectureTime() {
        return this._time;
    }

    /**
     * Изменить время проведения лекции
     *
     * @param {Object[]} newTime - новое время проведения
     *
     * @return {Lecture}
     */
    setLectureTime(newTime) {
        this._time = newTime;
        return this;
    }

    /**
     * Вернуть id аудитории
     *
     * @return {Number}
     */
    getClassroomId() {
        return this._classroomId;
    }

    /**
     * Изменить id аудитории
     *
     * @param {Number} newClassroomId - id новой аудитории
     *
     * @return {Lecture}
     */
    setClassroomId(newClassroomId) {
        this._classroomId = newClassroomId;
        return this;
    }


    /**
     *  Вернуть id школ, для которых проводится лекция
     *
     * @return {Number[]}
     */
    getSchoolsId() {
        return this._schoolsId;
    }


    /**
     * Изменить id школ, для которых проводится лекция
     *
     * @param {Number[]} newSchoolsId - новый массив школ
     *
     * @return {Lecture}
     */
    setSchoolsId(newSchoolsId) {
        this._schoolsId = newSchoolsId;
        return this;
    }
}
