const InvariantError = require("./InvariantError");
const AuthenticationError = require("./AuthenticationError");
const NotFoundError = require("./NotFoundError");

const DomainErrorTranslator = {
  translate(error) {
    return DomainErrorTranslator._directories[error.message] || error;
  },
};

DomainErrorTranslator._directories = {
  "NEW_USER.NOT_CONTAIN_NEEDED_PROPERTY": new InvariantError(
    "tidak dapat membuat user baru karena properti yang dibutuhkan tidak ada"
  ),
  "NEW_USER.NOT_MEET_DATA_TYPE_SPECIFICATION": new InvariantError(
    "tidak dapat membuat user baru karena tipe data tidak sesuai"
  ),
  "NEW_USER.USERNAME_LIMIT_CHAR": new InvariantError(
    "tidak dapat membuat user baru karena karakter username melebihi batas limit"
  ),
  "NEW_USER.USERNAME_CONTAIN_RESTRICTED_CHARACTER": new InvariantError(
    "tidak dapat membuat user baru karena username mengandung karakter terlarang"
  ),
  "USER_LOGIN.NOT_CONTAIN_NEEDED_PROPERTY": new InvariantError(
    "harus mengirimkan username dan password"
  ),
  "USER_LOGIN.NOT_MEET_DATA_TYPE_SPECIFICATION": new InvariantError(
    "username dan password harus string"
  ),
  "REFRESH_AUTHENTICATION_USE_CASE.NOT_CONTAIN_REFRESH_TOKEN":
    new InvariantError("harus mengirimkan token refresh"),
  "REFRESH_AUTHENTICATION_USE_CASE.PAYLOAD_NOT_MEET_DATA_TYPE_SPECIFICATION":
    new InvariantError("refresh token harus string"),
  "DELETE_AUTHENTICATION_USE_CASE.NOT_CONTAIN_REFRESH_TOKEN":
    new InvariantError("harus mengirimkan token refresh"),
  "DELETE_AUTHENTICATION_USE_CASE.PAYLOAD_NOT_MEET_DATA_TYPE_SPECIFICATION":
    new InvariantError("refresh token harus string"),
  "NEW_THREAD.NOT_CONTAIN_NEEDED_PROPERTY": new InvariantError(
    "harus mengirimkan title dan body"
  ),
  "NEW_THREAD.NOT_MEET_DATA_TYPE_SPECIFICATION": new InvariantError(
    "title dan body harus string"
  ),
  "NEW_COMMENT.NOT_CONTAIN_ANY_PROPERTY": new InvariantError(
    "tidak dapat membuat comment baru karena properti yang dibutuhkan tidak ada"
  ),
  "NEW_COMMENT.NOT_CONTAIN_NEEDED_PROPERTY": new InvariantError(
    "harus mengirimkan content"
  ),
  "NEW_COMMENT.NOT_MEET_DATA_TYPE_SPECIFICATION": new InvariantError(
    "content harus string"
  ),
  "NEW_COMMENT.PARAMS_NOT_CONTAIN_ANY_PROPERTY": new InvariantError(
    "tidak dapat membuat comment baru karena parameter yang dibutuhkan tidak ada"
  ),
  "NEW_COMMENT.PARAMS_NOT_CONTAIN_NEEDED_PROPERTY": new InvariantError(
    "harus mengirimkan parameter Thread ID"
  ),
  "NEW_COMMENT.PARAMS_NOT_MEET_DATA_TYPE_SPECIFICATION": new InvariantError(
    "Parameter Thread ID harus string"
  ),
  "DELETE_COMMENT.NOT_CONTAIN_NEEDED_PROPERTY": new InvariantError(
    "harus mengirimkan thread ID dan comment ID"
  ),
  "DELETE_COMMENT.NOT_MEET_DATA_TYPE_SPECIFICATION": new InvariantError(
    "Thread ID dan Comment ID harus string"
  ),
  "NEW_REPLY_COMMENT.NOT_CONTAIN_ANY_PROPERTY": new InvariantError(
    "tidak dapat membalas comment baru karena properti yang dibutuhkan tidak ada"
  ),
  "NEW_REPLY_COMMENT.NOT_CONTAIN_NEEDED_PROPERTY": new InvariantError(
    "harus mengirimkan content"
  ),
  "NEW_REPLY_COMMENT.NOT_MEET_DATA_TYPE_SPECIFICATION": new InvariantError(
    "reply content harus string"
  ),
  "NEW_REPLY_COMMENT.PARAMS_NOT_CONTAIN_ANY_PROPERTY": new InvariantError(
    "tidak dapat membalas comment baru karena parameter yang dibutuhkan tidak ada"
  ),
  "NEW_REPLY_COMMENT.PARAMS_NOT_CONTAIN_NEEDED_PROPERTY": new InvariantError(
    "harus mengirimkan parameter Thread ID dan Comment ID"
  ),
  "NEW_REPLY_COMMENT.PARAMS_NOT_MEET_DATA_TYPE_SPECIFICATION":
    new InvariantError("Parameter Thread ID dan Comment ID harus string"),
};

module.exports = DomainErrorTranslator;
