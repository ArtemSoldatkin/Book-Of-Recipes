export const success = (type: any, data: any) => ({
    type,
    payload: { data },
});

export const failure = (type: any, error: any) => ({
    type,
    payload: { error },
});

export const start = (type: any) => ({ type });

interface SuccessType<T, D> {
    type: T;
    payload: { data: D };
}

interface FailureType<T> {
    type: T;
    payload: { error: string };
}

interface StartType<T> {
    type: T;
}

export type BaseActions<DATA, START, SUCCESS, FAILURE> =
    | StartType<START>
    | SuccessType<SUCCESS, DATA>
    | FailureType<FAILURE>;
