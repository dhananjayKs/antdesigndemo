const initialState = {
	tasks: { Default: [] },
	selected: "Default",
};

let reducer = (state = initialState, { type, payload }) => {
	switch (type) {
		case "ADD":
			let tasks = state.tasks[state.selected].slice();
			tasks.push(payload);
			return { ...state, tasks: { ...state.tasks, [state.selected]: [...tasks] } };

		case "SELECT":
			return { ...state, selected: payload };
		case "TOGGLE":
			let toggleTasks = state.tasks[state.selected].slice();
			toggleTasks[payload].completed = !toggleTasks[payload].completed;
			return { ...state, tasks: { ...state.tasks, [state.selected]: [...toggleTasks] } };

		case "ADDMAIN":
			return { ...state, tasks: { ...state.tasks, [payload]: [] }, selected: payload };
		default:
			return state;
	}
};

export default reducer;
