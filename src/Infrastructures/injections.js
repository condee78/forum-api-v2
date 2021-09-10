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

const AddThreadUseCase = require("../Applications/use_case/AddThreadUseCase");
const DetailThreadUseCase = require("../Applications/use_case/DetailThreadUseCase");
const AddCommentUseCase = require("../Applications/use_case/AddCommentUseCase");
const DeleteCommentUseCase = require("../Applications/use_case/DeleteCommentUseCase");
const AddReplyCommentUseCase = require("../Applications/use_case/AddReplyCommentUseCase");
const DeleteReplyCommentUseCase = require("../Applications/use_case/DeleteReplyCommentUseCase");
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
  addThreadUseCase: new AddThreadUseCase({
    threadRepository: serviceInstanceContainer.threadRepository,
    authenticationTokenManager:
      serviceInstanceContainer.authenticationTokenManager,
  }),
  detailThreadUseCase: new DetailThreadUseCase({
    threadRepository: serviceInstanceContainer.threadRepository,
    commentRepository: serviceInstanceContainer.commentRepository,
    replyCommentRepository: serviceInstanceContainer.replyCommentRepository,
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
  addCommentUseCase: new AddCommentUseCase({
    commentRepository: serviceInstanceContainer.commentRepository,
    threadRepository: serviceInstanceContainer.threadRepository,
    authenticationTokenManager:
      serviceInstanceContainer.authenticationTokenManager,
  }),
  deleteCommentUseCase: new DeleteCommentUseCase({
    commentRepository: serviceInstanceContainer.commentRepository,
    threadRepository: serviceInstanceContainer.threadRepository,
    authenticationTokenManager:
      serviceInstanceContainer.authenticationTokenManager,
  }),
  addReplyCommentUseCase: new AddReplyCommentUseCase({
    commentRepository: serviceInstanceContainer.commentRepository,
    threadRepository: serviceInstanceContainer.threadRepository,
    replyCommentRepository: serviceInstanceContainer.replyCommentRepository,
    authenticationTokenManager:
      serviceInstanceContainer.authenticationTokenManager,
  }),
  deleteReplyCommentUseCase: new DeleteReplyCommentUseCase({
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
