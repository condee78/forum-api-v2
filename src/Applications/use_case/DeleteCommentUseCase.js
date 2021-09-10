const DeleteComment = require("../../Domains/comments/entities/DeleteComment");

class DeleteCommentUseCase {
  constructor({
    commentRepository,
    threadRepository,
    authenticationTokenManager,
  }) {
    this._commentRepository = commentRepository;
    this._threadRepository = threadRepository;
    this._authenticationTokenManager = authenticationTokenManager;
  }

  async execute(useCaseParams, useCaseAuthentication) {
    const deleteComment = new DeleteComment(useCaseParams);
    const { id: credentialId } = useCaseAuthentication;

    await this._threadRepository.verifyAvailableThread(deleteComment.threadId);

    await this._commentRepository.verifyCommentOwner(
      deleteComment.commentId,
      credentialId
    );

    return this._commentRepository.deleteComment(deleteComment.commentId);
  }
}

module.exports = DeleteCommentUseCase;
