import deepFreeze from "deep-freeze";
import counterReducer from "./reducer";

describe("unicafe reducer", () => {
  const initialState = {
    good: 0,
    ok: 0,
    bad: 0,
  };
  const goodAction = {
    type: "GOOD",
  };
  const neutralAction = {
    type: "OK",
  };
  const badAction = {
    type: "BAD",
  };
  const resetAction = {
    type: "ZERO",
  };

  test("should return a proper initial state when called with undefined state", () => {
    const state = {};
    const action = {
      type: "DO_NOTHING",
    };

    const newState = counterReducer(undefined, action);
    expect(newState).toEqual(initialState);
  });

  test("good is incremented", () => {
    const state = initialState;

    deepFreeze(state);
    const newState = counterReducer(state, goodAction);
    expect(newState).toEqual({
      good: 1,
      ok: 0,
      bad: 0,
    });
  });
  test("neutral is incremented", () => {
    const state = initialState;

    deepFreeze(state);
    const newState = counterReducer(state, neutralAction);
    expect(newState).toEqual({
      good: 0,
      ok: 1,
      bad: 0,
    });
  });
  test("bad is incremented", () => {
    const state = initialState;

    deepFreeze(state);
    const newState = counterReducer(state, badAction);
    expect(newState).toEqual({
      good: 0,
      ok: 0,
      bad: 1,
    });
  });
  test("resetting the state sets all to zero", () => {
    const state = initialState;

    deepFreeze(state);
    const newState = counterReducer(
      counterReducer(counterReducer(state, goodAction), badAction),
      neutralAction
    );
    expect(newState).toEqual({
      good: 1,
      ok: 1,
      bad: 1,
    });
    const resettedState = counterReducer(newState, resetAction);
    expect(resettedState).toEqual(initialState);
  });
});
