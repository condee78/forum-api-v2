class NewComment {
  constructor(payload, params) {
    this._isNullPayload(payload);
    this._verifyPayload(payload);
    this._isNullParams(params);
    this._verifyParams(params);

    const { content } = payload;
    const { threadId } = params;

    this.content = content;
    this.threadId = threadId;
  }

  _isNullPayload(payload) {
    if (payload == null) {
      throw new Error("NEW_COMMENT.NOT_CONTAIN_ANY_PROPERTY");
    }
  }

  _verifyPayload({ content }) {
    if (!content) {
      throw new Error("NEW_COMMENT.NOT_CONTAIN_NEEDED_PROPERTY");
    }

    if (typeof content !== "string") {
      throw new Error("NEW_COMMENT.NOT_MEET_DATA_TYPE_SPECIFICATION");
    }
  }

  _isNullParams(params) {
    if (params == null) {
      throw new Error("NEW_COMMENT.PARAMS_NOT_CONTAIN_ANY_PROPERTY");
    }
  }

  _verifyParams({ threadId }) {
    if (!threadId) {
      throw new Error("NEW_COMMENT.PARAMS_NOT_CONTAIN_NEEDED_PROPERTY");
    }

    if (typeof threadId !== "string") {
      throw new Error("NEW_COMMENT.PARAMS_NOT_MEET_DATA_TYPE_SPECIFICATION");
    }
  }
}

module.exports = NewComment;
