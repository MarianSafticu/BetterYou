import { TEST_TYPE, AppActionType } from "./types";

export function doReduxTest(test: string): AppActionType {
    return {
        type: TEST_TYPE,
        payload: test
    }
}