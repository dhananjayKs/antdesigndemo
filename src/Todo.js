import React, { useState } from "react";
import { Switch, Divider, Row, Col, Card, Layout } from "antd";
import moment from "moment";
import { useDispatch } from "react-redux";
import { CheckOutlined, EditOutlined } from "@ant-design/icons";

let { Header, Footer, Sider, Content } = Layout;

export default function Todo({ text, index }) {
	let dispatch = useDispatch();
	let done = text.completed;
	let status = "";
	let style = {};
	if (done) {
		style = {
			color: "white",
			textAlign: "center",
			backgroundColor: "green",
		};
		status = "Completed";
	} else {
		style = {
			color: "white",
			textAlign: "center",
			backgroundColor: "red",
		};
		status = `Due ${moment(text.dueDate).fromNow()}`;
	}
	//done ? changeStatus("Completed") : changeStatus(`Due ${moment(text.dueDate).fromNow()}`);
	let onChange = () => {
		dispatch({
			type: "TOGGLE",
			payload: index,
		});
		console.log(done);
	};
	return (
		<Row key={index}>
			<Col span={23} push={1}>
				<div>
					<Card
						title={text.content}
						actions={[<CheckOutlined onClick={onChange} />, <EditOutlined />]}
					>
						<Layout>
							<Content>
								<p
									style={{
										position: "absolute",
										top: "50%",
										left: "10%",
										transform: "translate(-50%,-50%)",
										paddingLeft: "1rem",
									}}
								>
									{text.description}
								</p>
							</Content>
							<Sider style={style}>
								<p>{status}</p>
							</Sider>
						</Layout>
					</Card>

					<Divider />
				</div>
				<Divider type="vertical" />
			</Col>
		</Row>
	);
}
