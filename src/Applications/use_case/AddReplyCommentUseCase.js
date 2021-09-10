const NewReplyComment = require("../../Domains/replies/entities/NewReplyComment");

class AddReplyCommentUseCase {
  constructor({
    commentRepository,
    threadRepository,
    replyCommentRepository,
    authenticationTokenManager,
  }) {
    this._commentRepository = commentRepository;
    this._threadRepository = threadRepository;
    this._replyCommentRepository = replyCommentRepository;
    this._authenticationTokenManager = authenticationTokenManager;
  }

  async execute(useCasePayload, useCaseParams, useCaseAuthentication) {
    const newReplyComment = new NewReplyComment(useCasePayload, useCaseParams);
    const { id: credentialId } = useCaseAuthentication;

    await this._threadRepository.verifyAvailableThread(
      newReplyComment.threadId
    );
    await this._commentRepository.verifyAvailableComment(
      newReplyComment.commentId
    );

    return this._replyCommentRepository.addReplyComment(
      newReplyComment,
      credentialId
    );
  }
}

module.exports = AddReplyCommentUseCase;
