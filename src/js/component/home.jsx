import React, { useState, useEffect } from "react";


//create your first component
const Home = () => {

	const [task, setTask] = useState("")
	const [list, setList] = useState([])

async function addTask (event) {
	event.preventDefault()
		if (task !="") {
			setList ([...list, task])
			setTask("")
		} else {
			alert("Ingresar Tarea")
		}
		if (event.key == "Enter"){
			setList([...list, task])
			setTask("")
		}
	}

	const saveTask = async () => {
		try {
			const url = "https://playground.4geeks.com/todo/todos/embrana"
			const resp = await fetch (url, {
				method: "POST",
				headers: {'Content-Type': 'application/json'},
				body: JSON.stringify({
					label: task,
					is_done: false
				})
			})
			if (resp.ok) { 
					setTask()
					return true
				}} catch (error) { 
						console.log(error)
						return false
		}
	}

const loadTask = async () => {
	try{
		const url = "https://playground.4geeks.com/todo/users/embrana"
		const resp = await fetch (url)
		if 	(resp.status == 404) {
			setUser()
			return
		}
		const data = await resp.json()
		setList(data.todos)
		return true
	} catch (error){
		console.log(error)
		return false
	}
}

const setUser = async () => {
	try {
		const resp = await fetch ("https://playground.4geeks.com/todo/users/embrana", {
			method: "POST",
			headers: {"Content-Type": "application/json"}
		})
		if (resp.status == 201) { loadTask()}
	} catch (error) {
		console.log(error)
		return false
	}
}

const deleteTask = async (id) => {
	try {
		const resp = await fetch ( "https://playground.4geeks.com/todo/todos/" + id, {
			method: "DELETE",
			headers: {"Content-Type": "application/json"}

		})
		if (resp.status == 204) {
			loadTask()
			return true
		}
	} catch (error) {
		console.log (error)
		return false
	}
}


useEffect(() => {
	loadTask()
}, [])


	return (
		<div className="container text-center ">
			<h1 className="text-center mt-5 ">To Do's</h1>
			<form className="row">
				<div className="col-12 ">
					<input type="text "
						className="form-control border" placeholder="Nueva Tarea" value={task} onChange={(event) => setTask(event.target.value)} />
				</div>
				<div className="col-12 mt-2">
					<button type="submit" onClick={(event) => saveTask(event)} className="btn btn-primary mb-3">Agregar Tarea</button>
				</div>
			</form>
			<ul className="list-group">
				{list.map((item, index) => (
					<li className="list-group-item border border-dark-subtle d-flex justify-content-between" key={index}>
						{item.label}
						
						<i onClick={() => { deleteTask(item.id)}}
						className="m-1 fa-solid fa-x icon-hidden"></i></li>
				))}
				<li
				className="list-group-item border border-dark-subtle"
				style={{ display: list.length === 0 ? 'none' : 'block' }}
				>
				<span className="text-success">{list.length} Items Left</span>
				</li>
			</ul>
			<span className="text-primary
			">{(list.length==0)?"No hay Tareas , Agregar Una ":""}</span>
		</div>
	);
};

export default Home;
