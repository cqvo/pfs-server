import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";
import { db } from "../libs/db";

jest.mock("@neondatabase/serverless", () => ({
    neon: jest.fn().mockReturnValue("mockedSqlClient"),
}));

jest.mock("drizzle-orm/neon-http", () => ({
    drizzle: jest.fn().mockReturnValue("mockedDbInstance"),
}));

describe("Database Connection", () => {
    beforeEach(() => {
        process.env.DATABASE_URL = "mockDatabaseUrl";
        neon.mockReturnValue("mockedNeonClient");
    });

    it("should initialize drizzle with the correct client", () => {
        expect(neon).toHaveBeenCalledWith("mockDatabaseUrl");
        expect(drizzle).toHaveBeenCalledWith({ client: "mockedNeonClient" });
    });
});
