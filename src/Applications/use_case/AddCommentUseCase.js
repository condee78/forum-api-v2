const NewComment = require("../../Domains/comments/entities/NewComment");

class AddedCommentUseCase {
  constructor({
    commentRepository,
    threadRepository,
    authenticationTokenManager,
  }) {
    this._commentRepository = commentRepository;
    this._threadRepository = threadRepository;
    this._authenticationTokenManager = authenticationTokenManager;
  }

  async execute(useCasePayload, useCaseParams, useCaseAuthentication) {
    const newComment = new NewComment(useCasePayload, useCaseParams);
    const { id: credentialId } = useCaseAuthentication;

    await this._threadRepository.verifyAvailableThread(newComment.threadId);

    return this._commentRepository.addComment(newComment, credentialId);
  }
}

module.exports = AddedCommentUseCase;
