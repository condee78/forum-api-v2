/* istanbul ignore file */

// external agency
const { nanoid } = require("nanoid");
const bcrypt = require("bcrypt");
const Jwt = require("@hapi/jwt");
const pool = require("./database/postgres/pool");

// service (repository, helper, manager, etc)
const UserRepositoryPostgres = require("./repository/UserRepositoryPostgres");
const AuthenticationRepositoryPostgres = require("./repository/AuthenticationRepositoryPostgres");
const BcryptEncryptionHelper = require("./security/BcryptEncryptionHelper");
const JwtTokenManager = require("./security/JwtTokenManager");

const ThreadRepositoryPostgres = require("./repository/ThreadRepositoryPostgres");
const CommentRepositoryPostgres = require("./repository/CommentRepositoryPostgres");
const ReplyCommentRepositoryPostgres = require("./repository/ReplyCommentRepositoryPostgres");

// use case
const AddUserUseCase = require("../Applications/use_case/AddUserUseCase");
const LoginUserUseCase = require("../Applications/use_case/LoginUserUseCase");
const RefreshAuthenticationUseCase = require("../Applications/use_case/RefreshAuthenticationUseCase");
const LogoutUserUseCase = require("../Applications/use_case/LogoutUserUseCase");

const ThreadUseCase = require("../Applications/use_case/ThreadUseCase");
const CommentUseCase = require("../Applications/use_case/CommentUseCase");
const ReplyCommentUseCase = require("../Applications/use_case/ReplyCommentUseCase");

const serviceInstanceContainer = {
  userRepository: new UserRepositoryPostgres(pool, nanoid),
  threadRepository: new ThreadRepositoryPostgres(pool, nanoid),
  commentRepository: new CommentRepositoryPostgres(pool, nanoid),
  replyCommentRepository: new ReplyCommentRepositoryPostgres(pool, nanoid),
  authenticationRepository: new AuthenticationRepositoryPostgres(pool),
  encryptionHelper: new BcryptEncryptionHelper(bcrypt),
  authenticationTokenManager: new JwtTokenManager(Jwt.token),
};

const useCaseInstanceContainer = {
  addUserUseCase: new AddUserUseCase({
    userRepository: serviceInstanceContainer.userRepository,
    encryptionHelper: serviceInstanceContainer.encryptionHelper,
  }),
  threadUseCase: new ThreadUseCase({
    threadRepository: serviceInstanceContainer.threadRepository,
    commentRepository: serviceInstanceContainer.commentRepository,
    replyCommentRepository: serviceInstanceContainer.replyCommentRepository,
  }),
  commentUseCase: new CommentUseCase({
    commentRepository: serviceInstanceContainer.commentRepository,
    threadRepository: serviceInstanceContainer.threadRepository,
    authenticationTokenManager:
      serviceInstanceContainer.authenticationTokenManager,
  }),
  replyCommentUseCase: new ReplyCommentUseCase({
    commentRepository: serviceInstanceContainer.commentRepository,
    threadRepository: serviceInstanceContainer.threadRepository,
    replyCommentRepository: serviceInstanceContainer.replyCommentRepository,
    authenticationTokenManager:
      serviceInstanceContainer.authenticationTokenManager,
  }),
  loginUserUseCase: new LoginUserUseCase({
    authenticationRepository: serviceInstanceContainer.authenticationRepository,
    authenticationTokenManager:
      serviceInstanceContainer.authenticationTokenManager,
    userRepository: serviceInstanceContainer.userRepository,
    encryptionHelper: serviceInstanceContainer.encryptionHelper,
  }),
  refreshAuthenticationUseCase: new RefreshAuthenticationUseCase({
    authenticationRepository: serviceInstanceContainer.authenticationRepository,
    authenticationTokenManager:
      serviceInstanceContainer.authenticationTokenManager,
  }),
  logoutUserUseCase: new LogoutUserUseCase({
    authenticationRepository: serviceInstanceContainer.authenticationRepository,
  }),
};

// export all instance
module.exports = {
  ...serviceInstanceContainer,
  ...useCaseInstanceContainer,
};
