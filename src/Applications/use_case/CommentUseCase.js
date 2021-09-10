const NewComment = require("../../Domains/comments/entities/NewComment");
const DeleteComment = require("../../Domains/comments/entities/DeleteComment");

class CommentUseCase {
  constructor({
    commentRepository,
    threadRepository,
    authenticationTokenManager,
  }) {
    this._commentRepository = commentRepository;
    this._threadRepository = threadRepository;
    this._authenticationTokenManager = authenticationTokenManager;
  }

  async addComment(useCasePayload, useCaseParams, useCaseAuthentication) {
    const newComment = new NewComment(useCasePayload, useCaseParams);
    const { id: credentialId } = useCaseAuthentication;

    await this._threadRepository.verifyAvailableThread(newComment.threadId);

    return this._commentRepository.addComment(newComment, credentialId);
  }

  async deleteComment(useCaseParams, useCaseAuthentication) {
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

module.exports = CommentUseCase;
