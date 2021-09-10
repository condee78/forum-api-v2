const NewReplyComment = require("../../Domains/replies/entities/NewReplyComment");
const DeleteReplyComment = require("../../Domains/replies/entities/DeleteReplyComment");

class ReplyCommentUseCase {
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

  async addReplyComment(useCasePayload, useCaseParams, useCaseAuthentication) {
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

  async deleteReplyComment(useCaseParams, useCaseAuthentication) {
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

module.exports = ReplyCommentUseCase;
