/**
 * Класс School
 *
 * @class
 */
export default class School {
    /**
     * Конструктор класса
     *
     * @param {Number} id - Уникально id школы
     * @param {Object} options - свойства школы
     * @param {String} options.name - Название школы
     * @param {Number} options.amount - Количество учащихся
     *
     * @constructor
     */
    constructor(id, options) {
        const name = options.name;
        const amount = options.amount;

        this._id = id;
        this._name = name;
        this._amount = amount;
        this._lecturesId = [];
        return this;
    }

    /**
     * Возвращение Id школы
     *
     * @return {Number}
     */
    getId() {
        return this._id;
    }

    /**
     * Возвращение названия школы
     *
     * @return {String}
     */
    getName() {
        return this._name;
    }

    /**
     * Изменение названия школы
     *
     * @param {String} newName - новое название
     *
     * @return {School}
     */
    setName(newName) {
        this._name = newName;
        return this;
    }

    /**
     * Возвращение количества учащихся школы
     *
     * @return {Number}
     */
    getAmount() {
        return this._amount;
    }

    /**
     * Изменение количества учащихся школы
     *
     * @param {Number} newAmount - новое количество учащихся
     *
     * @return {School}
     */
    setAmount(newAmount) {
        this._amount = newAmount;
        return this;
    }

    /**
     * Возвращение лекций, проходящих для школы
     *
     * @return {Number[]}
     */
    getLecturesId() {
        return this._lecturesId;
    }

    /**
     * Добавление лекиции, проходящих для школы
     *
     * @param {Number} newLectureId - новая лекция
     *
     * @return {School}
     */
    addLecturesId(newLectureId) {
        this._lecturesId.push(newLectureId);
        return this;
    }

    /**
     * Удаление лекиции, проходящих для школы
     *
     * @param {Number} LectureId - лекция, которую нужно удалить
     *
     * @return {School}
     */
    deleteLecturesId(LectureId) {
        this._lecturesId = this._lecturesId.filter(id => id !== LectureId);
        return this;
    }
}
