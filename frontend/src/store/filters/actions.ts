export const SET_SEARCH = '[filters] SET_SEARCH';

interface SetSearchType {
    type: typeof SET_SEARCH;
    payload: string;
}

export type Actions = SetSearchType;

export type SetSearch = (search: string) => void;
export const set_search = (search: string): SetSearchType => ({
    type: SET_SEARCH,
    payload: search,
});
