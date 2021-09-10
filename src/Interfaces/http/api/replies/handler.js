class RepliesHandler {
  constructor({ addReplyCommentUseCase, deleteReplyCommentUseCase }) {
    this._addReplyCommentUseCase = addReplyCommentUseCase;
    this._deleteReplyCommentUseCase = deleteReplyCommentUseCase;

    this.postReplyCommentHandler = this.postReplyCommentHandler.bind(this);
    this.deleteReplyCommentByIdHandler =
      this.deleteReplyCommentByIdHandler.bind(this);
  }

  async postReplyCommentHandler(request, h) {
    // const { id: credentialId } = request.auth.credentials;
    const addedReply = await this._addReplyCommentUseCase.execute(
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
    await this._deleteReplyCommentUseCase.execute(
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
