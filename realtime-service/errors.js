var util = require("util");

function UsernameOrPasswordInvalidError(settings) {
    return new AppError({message: 'username or password invalid!'}, UsernameOrPasswordInvalidError);
}

function UserAlreadyExistError(email) {
    var message = `user ${email} already exist!`;
    return new AppError(message, UserAlreadyExistError);
}

function UserNotExistError(email) {
    let [message,status] = [`user ${email} does not exist!`, 500];
    return new AppError({message, status}, UserNotExistError);
}

function AppError(settings) {
    settings = ( settings || {} );

    this.name = "AppError";

    this.type = ( settings.type || "Application" );
    this.message = ( settings.message || "error occurred." );
    this.detail = ( settings.detail || "" );
    this.extendedInfo = ( settings.extendedInfo || "" );
    this.errorCode = ( settings.errorCode || "" );
    this.status = (settings.status || 500);
    this.isAppError = true;

    Error.captureStackTrace(this, (AppError ));
}

module.exports = {
    UsernameOrPasswordInvalidError: UsernameOrPasswordInvalidError,
    UserAlreadyExistError: UserAlreadyExistError,
    UserNotExistError: UserNotExistError,
};
