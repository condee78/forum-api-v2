class DeleteComment {
  constructor(params) {
    this._isNullParams(params);
    this._verifyParams(params);

    const { threadId, commentId } = params;

    this.threadId = threadId;
    this.commentId = commentId;
  }

  _isNullParams(params) {
    if (params == null) {
      throw new Error("DELETE_COMMENT.NOT_CONTAIN_ANY_PROPERTY");
    }
  }

  _verifyParams({ threadId, commentId }) {
    if (!threadId || !commentId) {
      throw new Error("DELETE_COMMENT.NOT_CONTAIN_NEEDED_PROPERTY");
    }

    if (typeof threadId !== "string" || typeof commentId !== "string") {
      throw new Error("DELETE_COMMENT.NOT_MEET_DATA_TYPE_SPECIFICATION");
    }
  }
}

module.exports = DeleteComment;
