class ThreadsHandler {
  constructor({ threadUseCase }) {
    this._threadUseCase = threadUseCase;

    this.postThreadHandler = this.postThreadHandler.bind(this);
    this.getThreadHandler = this.getThreadHandler.bind(this);
  }

  async postThreadHandler(request, h) {
    // const { id: credentialId } = request.auth.credentials;
    const addedThread = await this._threadUseCase.addThread(
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
    const thread = await this._threadUseCase.getThread(request.params);

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
