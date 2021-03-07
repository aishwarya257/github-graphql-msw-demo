import { server } from "./server";

export const setupServer = function () {
  beforeAll(() => {
    server.listen({
      onUnhandledRequest: "warn",
    });
  });

  afterEach(() => {
    server.resetHandlers();
  });

  afterAll(() => {
    server.close();
  });
};
