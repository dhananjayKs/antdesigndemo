import {
	Button,
	Col,
	DatePicker,
	Divider,
	Form,
	Input,
	TimePicker,
	Progress,
	Row,
	message,
} from "antd";
import "./App.css";
import "antd/dist/antd.css";
import { useState } from "react";
import Todo from "./Todo";
import { PlusOutlined } from "@ant-design/icons";
import { Layout } from "antd";
import moment from "moment";
import MainTasksContainer from "./MainTasksContainer";
import { useSelector, useDispatch } from "react-redux";

const { Header, Footer, Sider, Content } = Layout;

function App() {
	let [value, setValue] = useState("");
	const dispatch = useDispatch();

	let selected = useSelector((store) => store.selected);
	let todos = useSelector((store) => store.tasks[selected]).map((ele, index) => (
		<Todo text={ele} index={index} />
	));
	let completed = useSelector((store) => store.tasks[selected]).filter((ele) => {
		if (ele.completed) {
			return true;
		}
	});

	let add = (data) => {
		if (!data.content) {
			message.error("Enter the name of the ToDo");
		} else {
			data.completed = false;
			dispatch({
				type: "ADD",
				payload: data,
			});
		}
	};
	let addMainTask = (data) => {
		console.log(data.taskName);
		if (data.taskName) {
			dispatch({
				type: "ADDMAIN",
				payload: data.taskName,
			});
		} else {
			message.error("Enter the Main Task name");
		}
	};
	let onChange = (event) => {
		console.log(event.target.value);
		setValue(event.target.value);
	};
	return (
		<Layout style={{ position: "absolute", top: "0%", bottom: "0%", right: "0%", left: "0%" }}>
			<Header>
				<h1 style={{ color: "white" }}>Todo App</h1>
			</Header>

			<Layout>
				<Sider>
					<MainTasksContainer />
					<Form onFinish={addMainTask} style={{}}>
						<Form.Item name="taskName" style={{ margin: "0" }}>
							<Input
								style={{ width: "100%", marginTop: "1rem" }}
								placeholder="Add Task"
							></Input>
						</Form.Item>
						<Form.Item>
							<Button
								ghost
								icon={<PlusOutlined />}
								style={{
									display: "inline-block",
									width: "99%",
								}}
								htmlType="submit"
							>
								Add Task
							</Button>
						</Form.Item>
					</Form>
				</Sider>

				<Content style={{ overflow: "scroll", scrollbarWidth: "0%" }}>
					<Layout>
						<Header>
							<Row>
								<Col span={22}>
									<h1 style={{ color: "white", fontSize: "large" }}>
										{selected}
									</h1>
								</Col>
								<Col span={2}></Col>
							</Row>
						</Header>
						<Content style={{ marginTop: "2rem" }}>
							<div>{todos}</div>
						</Content>
					</Layout>
				</Content>

				<Footer style={{ position: "relative" }}>
					<Progress
						percent={((completed.length / todos.length) * 100).toPrecision(3)}
						type="circle"
						width={200}
						style={{
							position: "absolute",
							top: "70%",
							left: "50%",
							transform: "translate(-50%,-50%)",
						}}
					/>
					<Form onFinish={add}>
						<Form.Item label="Enter Todo" name="content">
							<Input onChange={onChange} value={value} />
						</Form.Item>

						<Form.Item name="dueDate" label="Due Date">
							<DatePicker defaultValue={moment()}></DatePicker>
						</Form.Item>
						<Form.Item name="dueTime" label="Due Time">
							<TimePicker defaultValue={moment("09:00:00", "HH:mm:ss")}></TimePicker>
						</Form.Item>
						<Form.Item name="description" label="Description" labelAlign="top">
							<Input.TextArea rows={5}></Input.TextArea>
						</Form.Item>
						<Form.Item>
							<Button
								type="primary"
								htmlType="submit"
								shape="round"
								icon={<PlusOutlined />}
								size="large"
							>
								add Todo
							</Button>
						</Form.Item>
					</Form>
				</Footer>
			</Layout>
		</Layout>
	);
}

export default App;
