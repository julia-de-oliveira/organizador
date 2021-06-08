<template>
	<div class="input-group">
		<input class="w-75 form-control input-text pl-1 text-white" placeholder="Tarefa" v-on:keyup.enter="addTodo(text)" v-model="text"/>
		<button class="btn text-white rounded-circle btn-outline-success border-0" v-on:click="addTodo(text)">
			<svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" fill="currentColor" class="bi bi-plus" viewBox="0 0 16 16">
				<path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"/>
			</svg>
		</button>
	</div>

	<div class="frame overflow-auto">
		<ul class="list">
			<li v-for="todo in todos" v-on:click="checkTodo(todo)" v-bind:key="todo.id">

				<label class="d-block d-flex">
					<input type="checkbox" class="d-flex checkbox-style" v-model="todo.checked">
					
					<p v-if="todo.checked"><s><i>{{todo.text}}</i></s></p>
					<p v-else>{{todo.text}}</p>

					<button class="btn btn-sm text-danger d-flex btn-del" v-on:click="removeTodo(todo)">
						<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
							<path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
							<path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
						</svg>
					</button>
				</label>

			</li>
		</ul>
	</div>
</template>

<script>
	export default {

		name: 'Todo',

		data () {
			return {
				todos: [
					{id: 0, checked: false,text:  "Digite na caixa de texto e aperte enter, ou clique no botão, para adicionar a tarefa"},
					{id: 1, checked: false, text:  "Arraste o mouse para a direita da tarefa para exclui-lá"},
					{id: 2, checked: false, text:  "Clique na tarefa, ou no circulo pare marcar como concluido"}
				],
			}
		},

		mounted() {
			if (localStorage.getItem('todos')) {
				try {
					this.todos = JSON.parse(localStorage.getItem('todos'));
				} catch(e) {
					localStorage.removeItem('todos');
				}
			}
		},

		methods: {
			addTodo(text) {
				if (text !== "") {
					this.todos.push({
						id: this.todos.length + 1,
						checked: false,
						text,
					});
				}

				this.saveTodos();
				this.text = "";
			},

			removeTodo(todo) {
				this.todos.splice(this.todos.indexOf(todo), 1);
				this.saveTodos();
			},

			checkTodo(todo) {
				todo.checked = !todo.checked;
				this.todos[this.todos.indexOf(todo)] = todo;
				this.saveTodos();
			},

			saveTodos() {
				const parsed = JSON.stringify(this.todos);
				localStorage.setItem('todos', parsed);
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

.frame {
	height: 30em;
	width: 20em;
}

.list {
	padding: 15px;
	list-style: none;
}

.list p {
	width: 11em;
  word-wrap: break-word;
	font-size: 20px;
	margin-top: -0.5em;
	margin-left: 10px;
}

::-webkit-scrollbar {
  width: 2px;
}

::-webkit-scrollbar-track {
  -webkit-box-shadow: inset 0 0 60x rgba(0,0,0,0); 
  display: none;
  border-radius: 10px;
}

::-webkit-scrollbar-thumb {
	background: #7409b5;
  border-radius: 0px;
  -webkit-box-shadow: inset 0 0 0px rgba(0,0,0,0); 
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

.list label:hover svg {
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
		margin-top: -1px;
	}
}

</style>