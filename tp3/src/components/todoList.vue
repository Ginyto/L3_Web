<template>
<div class="container">
    <h1>Todo List </h1>
    <div class="container">
        <form>
        <div class="form-group">
            <input v-model="title" type="text" class="form-control" name="title" id="title" placeholder="Titre">
        </div>
        <div class="form-group">
            <input v-model="desc" type="text" class="form-control" name="desc" id="desc" placeholder="Description">
        </div>
        <div class="form-check m-2">
            <input class="form-check-input" type="checkbox" id="checkbox" v-model="completed">
            <label class="form-check-label" for="checkbox">
                Tâche déjà réalisée
            </label>
        </div>
        <button type='button' class="btn btn-primary" @click="addTask()">Ajouter tâche</button>
        </form>
    </div>

    <div class="container mt-3">
        <table class="table table-striped table-bordered table-hover">
            <caption>Tâches effectuées: <strong>{{completed_tasks}}</strong> | Tâches non-effectuées: <strong>{{tasks.length - completed_tasks}}</strong></caption>
            <thead class="thead-dark">
                <tr>
                    <th>#</th>
                    <th>Tâche</th>
                    <th>Description</th>
                    <th>Etat</th>
                </tr>
            </thead>
            <tbody>
                <tr v-bind:key="task.id" v-for="task in tasks" v-on:click="completedTask(task)">
                    <td>{{task.id}}</td>
                    <td>{{task.title}}</td>
                    <td>{{task.desc}}</td>
                    <td v-if="!task.completed">❌</td>
                    <td v-else>✅</td>
                </tr>
            </tbody>
        </table>
    </div>
</div>  
</template>

<script>
export default {
    name: "todoList",
    data() {
        return {
            tasks: [],
            id:'',
            title: '',
            desc: '',
            completed: false,
        }
    },
    methods: {
        addTask() {
            if(!this.title) {
                alert("Please add a task")
                return
            }
            const newTask = {
                'id': this.tasks.length,
                'title': this.title,
                'desc': this.desc,
                'completed': this.completed,
            }

            this.tasks.push(newTask);
            this.title = '';
            this.desc = '';
            document.getElementById("checkbox").checked = false;
            console.log(this.tasks)
        },
        completedTask(task) {
            task.completed = !task.completed   
        }
    },
    computed: {
        completed_tasks() {
            return this.tasks.filter(task => task.completed).length
        }
    }
    
}
</script>