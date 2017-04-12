/**
 * Класс Classroom
 *
 * @class
 */
export default class Classroom {
    /**
     * Конструктор аудитории
     *
     * @param {Number} id - Уникально id аудитории
     * @param {Object} options - свойства
     * @param {String} options.name - Название аудитории
     * @param {Number} options.capacity - Вместимость
     * @param {String} options.description - Описание местонахождения
     *
     * @constructor
     */
    constructor(id, options) {
        const name = options.name;
        const capacity = options.capacity;
        const description = options.description;

        this._id = id;
        this._name = name;
        this._capacity = capacity;
        this._description = description || '';
        this._lecturesId = [];
        return this;
    }

    /**
     * Возвращение Id аудитории
     *
     * @return {Number}
     */
    getId() {
        return this._id;
    }

    /**
     * Возвращение названия аудитории
     *
     * @return {String}
     */
    getName() {
        return this._name;
    }

    /**
     * Изменение названия аудитории
     *
     * @param {String} newName - новое название аудитории
     *
     * @return {School}
     */
    setName(newName) {
        this._name = newName;
        return this;
    }


    /**
     * Возвращение вместимости аудитории
     *
     * @return {Number}
     */
    getCapacity() {
        return this._capacity;
    }

    /**
     * Изменение вместимости аудитории
     *
     * @param {Number} newCapacity - новая вместимость
     *
     * @return {Classroom}
     */
    setCapacity(newCapacity) {
        this._capacity = newCapacity;
        return this;
    }

    /**
     * Возвращение описания аудитории
     *
     * @return {String}
     */
    getDescription() {
        return this._description;
    }

    /**
     * Изменение описания аудитории
     *
     * @param {String} newDescription - новое описание аудитории
     *
     * @return {School}
     */
    setDescription(newDescription) {
        this._description = newDescription;
        return this;
    }

    /**
     * Возвращение лекций, проходящих в аудитории
     *
     * @return {Number[]}
     */
    getLecturesId() {
        return this._lecturesId;
    }

    /**
     * Добавление лекиции, проходящей в аудитории
     *
     * @param {Number} newLectureId - новая лекция
     *
     * @return {Classroom}
     */
    addLecturesId(newLectureId) {
        this._lecturesId.push(newLectureId);
        return this;
    }

    /**
     * Удаление лекиции, проходящей в аудитории
     *
     * @param {Number} LectureId - лекция, которую нужно удалить
     *
     * @return {Classroom}
     */
    deleteLecturesId(LectureId) {
        this._lecturesId = this._lecturesId.filter(id => id !== LectureId);
        return this;
    }
}
