/**
 * Обработчик ошибки
 *
 * @param {Number} error - экземпляр класса Error
 *
 * @constructor
 */
const errorHandler = error => {
    console.error(`Error: ${error.message}`);
    return null;
};

export default errorHandler;
