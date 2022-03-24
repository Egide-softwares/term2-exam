import "jest";

describe("Environment variables", ()=> {
    beforeEach(()=> {});

    it("DB URL should be defined", async ()=> {
        expect(process.env.DATABASE_URL).not.toBe(undefined);
    });

    it("JWT secret should be defined", async ()=> {
        expect(process.env.JWT_SECRET).not.toBe(undefined);
    });
});