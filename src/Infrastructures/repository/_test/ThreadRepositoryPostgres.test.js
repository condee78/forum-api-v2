const ThreadTableTestHelper = require("../../../../tests/ThreadTableTestHelper");
const InvariantError = require("../../../Commons/exceptions/InvariantError");
const NotFoundError = require("../../../Commons/exceptions/NotFoundError");
const NewThread = require("../../../Domains/threads/entities/NewThread");
const pool = require("../../database/postgres/pool");
const ThreadRepositoryPostgres = require("../ThreadRepositoryPostgres");

describe("ThreadRepositoryPostgres", () => {
  it("should be instance of ThreadRepository domain", () => {
    const threadRepositoryPostgres = new ThreadRepositoryPostgres({}, {}); // dummy dependency

    expect(threadRepositoryPostgres).toBeInstanceOf(ThreadRepositoryPostgres);
  });

  describe("behavior test", () => {
    afterEach(async () => {
      await ThreadTableTestHelper.cleanTable();
    });

    afterAll(async () => {
      await pool.end();
    });

    describe("addThread function", () => {
      it("should persist new thread and return row inserted correctly", async () => {
        // Arrange
        const newThread = new NewThread({
          title: "new thread",
          body: "content",
        });
        const user = "user-123";
        const fakeIdGenerator = () => "123"; // stub!
        const threadRepositoryPostgres = new ThreadRepositoryPostgres(
          pool,
          fakeIdGenerator
        );

        // Action
        const addedThread = await threadRepositoryPostgres.addThread(
          newThread,
          user
        );

        // Assert
        expect(addedThread.id).toEqual("thread-123");
        expect(addedThread.title).toEqual(newThread.title);
        expect(addedThread.owner).toEqual(user);
      });
    });

    describe("verifyAvailableThread function", () => {
      it("should throw NotFoundError when thread not available", async () => {
        // Arrange
        await ThreadTableTestHelper.addThread({ id: "thread-123" }); // memasukan thread baru dengan threadId thread-123

        const threadRepositoryPostgres = new ThreadRepositoryPostgres(pool, {});

        // Action & Assert
        await expect(
          threadRepositoryPostgres.verifyAvailableThread("thread")
        ).rejects.toThrowError(NotFoundError);
      });

      it("should not throw NotFoundError when thread available", async () => {
        // Arrange
        await ThreadTableTestHelper.addThread({ id: "thread-123" }); // memasukan thread baru dengan threadId thread-123
        const threadRepositoryPostgres = new ThreadRepositoryPostgres(pool, {});

        // Action & Assert
        await expect(
          threadRepositoryPostgres.verifyAvailableThread("thread-123")
        ).resolves.not.toThrowError(NotFoundError);
      });
    });

    describe("getThreadById", () => {
      it("should throw NotFoundError when thread not found", async () => {
        // Arrange
        const threadRepositoryPostgres = new ThreadRepositoryPostgres(pool, {});

        // Action & Assert
        await expect(
          threadRepositoryPostgres.getThreadById("thread")
        ).rejects.toThrowError(NotFoundError);
      });

      it("should return thread id correctly", async () => {
        // Arrange
        await ThreadTableTestHelper.addThread({ id: "thread-321" });
        const threadRepositoryPostgres = new ThreadRepositoryPostgres(pool, {});

        // Action
        const thread = await threadRepositoryPostgres.getThreadById(
          "thread-321"
        );

        // Assert
        expect(thread.id).toEqual("thread-321");
      });
    });
  });
});
