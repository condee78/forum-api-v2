class ThreadsHandler {
  constructor({ addThreadUseCase, detailThreadUseCase }) {
    this._addThreadUseCase = addThreadUseCase;
    this._detailThreadUseCase = detailThreadUseCase;

    this.postThreadHandler = this.postThreadHandler.bind(this);
    this.getThreadHandler = this.getThreadHandler.bind(this);
  }

  async postThreadHandler(request, h) {
    // const { id: credentialId } = request.auth.credentials;
    const addedThread = await this._addThreadUseCase.execute(
      request.payload,
      request.auth.credentials
    );

    const response = h.response({
      status: "success",
      data: {
        addedThread,
      },
    });
    response.code(201);
    return response;
  }

  async getThreadHandler(request, h) {
    const thread = await this._detailThreadUseCase.execute(request.params);

    const response = h.response({
      status: "success",
      data: {
        thread,
      },
    });
    response.code(200);
    return response;
  }
}

module.exports = ThreadsHandler;
