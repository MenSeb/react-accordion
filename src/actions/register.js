export default function register(state, { childs }) {
    return {
        ...state,
        datas: state.datas.map((data, index) => {
            const { expanded } = childs[index].props;

            if (expanded === undefined) return data;

            return { ...data, expanded };
        }),
    };
}
