import React from "react";
import { useDispatch } from "react-redux";
import { Card } from "antd";

export default function MainTask({ name }) {
	const dispatch = useDispatch();

	let select = () => {
		dispatch({
			type: "SELECT",
			payload: name,
		});
		console.log(name);
	};
	return <Card.Grid onClick={select} style={{width:'100%', textAlign:'center'}}>
        {name}
    </Card.Grid>;
}
