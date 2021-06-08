<template>
	<div class="input-group">
		<input class="w-75 form-control input-text pl-1 text-white" placeholder="Tarefa" v-on:keyup.enter="addTodo(text)" v-model="text"/>
		<button class="btn text-white rounded-circle btn-outline-success border-0" v-on:click="addTodo(text)">
			<svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" fill="currentColor" class="bi bi-plus" viewBox="0 0 16 16">
				<path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"/>
			</svg>
		</button>
	</div>

	<div class="frame">
		<div class="center">
			<section class="todo-cmp">
				<ul class="todo-cmp__list">
					<li v-for="todo in todos" v-bind:key="todo.id">
						<label class="d-flex">
							<input type="checkbox">
							<span><p>{{todo.text}}</p></span>
							<button class="btn btn-sm text-danger btn-del" v-on:click="removeTodo(todo)">
								<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
									<path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
									<path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
								</svg>
							</button>
						</label>
					</li>
				</ul>
			</section>
		</div>
	</div>
</template>

<script>
export default {

	name: 'Todo',

	data () {
		return {
			todos: [{id: 0, text:  "Digite na caixa de texto e aperte enter, ou clique no botão, para adicionar a tarefa"},
			{id: 1, text:  "Arraste o mouse para a direita da tarefa para exclui-lá"},
			{id: 2, text:  "Clique na tarefa, ou no circulo pare marcar como concluido"},],
		}
	},

	methods: {
		addTodo(text) {
			if (text !== "") {
				this.todos.push({
					id: this.todos.length + 1,
					text,
				});
			}

			this.text = "";
		},

		removeTodo(todo) {
			this.todos.splice(this.todos.indexOf(todo), 1);
		}
	}
}
</script>

<style lang="scss" scoped>
.input-text {
	background-color: transparent;
	border-width: 0px 0px 1px 0px;
	border-radius: 0px;
}

textarea:focus, input:focus, select:focus {
    background-color: transparent;
	border-width: 0px 0px 1px 0px;
	border-radius: 0px;
}

.todo-cmp {
	background: transparent;
	padding: 5px 15px;
	width: 100%;
	box-sizing: inherit;
	
	&__list {
		list-style: none;
		padding: 0;
		
		li {
			padding: 10px 0 15px;
			margin: 0;
			text-align: left;
			width: 100%;
			
			label {
				cursor: pointer;
				font-size: 0.82rem;
				width: 100%;
				display: block;
				
				
				input {
					float: right;
					opacity: 0;
				}
				
				span {
					position: relative;
					display:block;
					padding-left: 25px;
					transition: all 550ms ease-in-out;
					font-size: 18px;
					overflow: hidden;
					word-wrap: break-word;
				}
				
				
				input + span::after {
						content: "";
						display: block;
						border: 1px solid #497081;
						border-radius: 13px;
						height: 13px;
						width: 13px;
						margin-top: 5px;
						position: absolute;
						left: 0;
						top: 1px;
						z-index: 10;
					
					transition: all 550ms cubic-bezier(0.680, -0.550, 0.265, 1.550); 
					transition-timing-function: cubic-bezier(0.680, -0.550, 0.265, 1.550);
				}
				
				input + span::before {
						content: "✔";
						display: block;
						font-size: 22px;
						height: 13px;
						width: 13px;
						position: absolute;
						left: -2px;
						margin-top: 5px;
						top: -8px;
						z-index: 10;
						opacity: 0;
				}
				
				input:checked + span {
					color: #ccc;

						text-decoration: line-through;
						font-style: italic;
					transition: all 550ms ease-in-out;
				}
				
				input:checked + span::after {
					opacity: 0;
					height: 17px;
					width: 17px;
					top: -2px;
					right: -2px;
				}
				
				input:checked + span::before {
						opacity: 1;
					transition: all 550ms ease-in-out;
				}
			}
		}
	}
}

.btn-del svg {
	color: transparent;
	background: transparent;
    border: none !important;
    font-size: 0px;
	margin-left: 10px;
	margin-top: -1px;
}

.btn-del.disabled{
  pointer-events: none;
}

.btn-del:hover svg {
	color: red;
    font-size: 0px;
	margin-left: 10px;
	margin-top: -1px;
}

@media screen and (max-width: 991.98px) {
  .btn-del svg {
		color: red;
		background: transparent;
		border: none !important;
		font-size: 0px;
		margin-left: 10px;
		margin-top: -10px;
	}
}

</style>