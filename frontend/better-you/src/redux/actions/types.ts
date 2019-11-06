export const TEST_TYPE = "TEST_TYPE";

export interface TestType {
    type: typeof TEST_TYPE;
    payload: string;
}

export type AppActionType = TestType;