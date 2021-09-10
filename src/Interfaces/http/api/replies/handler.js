class RepliesHandler {
  constructor({ replyCommentUseCase }) {
    this._replyCommentUseCase = replyCommentUseCase;

    this.postReplyCommentHandler = this.postReplyCommentHandler.bind(this);
    this.deleteReplyCommentByIdHandler =
      this.deleteReplyCommentByIdHandler.bind(this);
  }

  async postReplyCommentHandler(request, h) {
    // const { id: credentialId } = request.auth.credentials;
    const addedReply = await this._replyCommentUseCase.addReplyComment(
      request.payload,
      request.params,
      request.auth.credentials
    );

    const response = h.response({
      status: "success",
      data: {
        addedReply,
      },
    });
    response.code(201);
    return response;
  }

  async deleteReplyCommentByIdHandler(request, h) {
    // const { id: credentialId } = request.auth.credentials;
    await this._replyCommentUseCase.deleteReplyComment(
      request.params,
      request.auth.credentials
    );

    const response = h.response({
      status: "success",
    });
    response.code(200);
    return response;
  }
}

module.exports = RepliesHandler;
