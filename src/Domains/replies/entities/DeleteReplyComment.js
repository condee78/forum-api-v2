class DeleteReplyComment {
  constructor(params) {
    this._isNullParams(params);
    this._verifyParams(params);

    const { threadId, commentId, replyId } = params;

    this.threadId = threadId;
    this.commentId = commentId;
    this.replyId = replyId;
  }

  _isNullParams(params) {
    if (params == null) {
      throw new Error("DELETE_REPLY_COMMENT.NOT_CONTAIN_ANY_PROPERTY");
    }
  }

  _verifyParams({ threadId, commentId, replyId }) {
    if (!threadId || !commentId || !replyId) {
      throw new Error("DELETE_REPLY_COMMENT.NOT_CONTAIN_NEEDED_PROPERTY");
    }

    if (
      typeof threadId !== "string" ||
      typeof commentId !== "string" ||
      typeof replyId !== "string"
    ) {
      throw new Error("DELETE_REPLY_COMMENT.NOT_MEET_DATA_TYPE_SPECIFICATION");
    }
  }
}

module.exports = DeleteReplyComment;
