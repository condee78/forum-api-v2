const DeleteReplyComment = require("../../Domains/replies/entities/DeleteReplyComment");

class DeleteReplyCommentUseCase {
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

  async execute(useCaseParams, useCaseAuthentication) {
    const deleteReplyComment = new DeleteReplyComment(useCaseParams);
    const { id: credentialId } = useCaseAuthentication;

    await this._threadRepository.verifyAvailableThread(
      deleteReplyComment.threadId
    );
    await this._commentRepository.verifyAvailableComment(
      deleteReplyComment.commentId
    );

    await this._replyCommentRepository.verifyReplyCommentOwner(
      deleteReplyComment.replyId,
      credentialId
    );

    return this._replyCommentRepository.deleteReplyComment(
      deleteReplyComment.replyId
    );
  }
}

module.exports = DeleteReplyCommentUseCase;
