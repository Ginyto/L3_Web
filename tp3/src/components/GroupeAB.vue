<template>
    <div class="container">
        <h1>Groupe AB</h1>
        <div class="container">
        <form>
        <div class="form-group">
            <input v-model="lname" type="text" class="form-control" name="lname" id="lname" placeholder="Nom">
        </div>
         <div class="form-group">
            <input v-model="grade" type="number" class="form-control" name="grade" id="grade" placeholder="Note" min="0" max="20">
        </div>
        <select v-model="group" class="form-select m-3">
            <option value="" disabled>Veuillez choisir un groupe</option>
            <option value="A">Groupe A</option>
            <option value="B">Groupe B</option>
        </select>
        <button type='button' class="btn btn-primary" @click="addStudent()">Ajouter un étudiant</button>
        </form>
    </div>
        <div class="container mt-3">
            <table class="table table-striped table-bordered table-hover">
                <caption>Moyenne: <strong>{{avg_grade}}</strong> | Note maximale: <strong>{{max_grade}}</strong></caption>
                <thead class="thead-dark">
                    <tr>
                        <th>Groupe</th>
                        <th>Nom</th>
                        <th>Note</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-bind:key="student.id" v-for="student in students">
                        <td>{{student.group}}</td>
                        <td>{{student.lname}}</td>
                        <td>{{student.grade}}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script>
import { students } from "@/store/store"
export default {
    name: "GroupeAB",
    data() {
        return {
            students,
            lname: '',
            grade: '',
            group: '',
        }
    },
    methods: {
        addStudent() {
            console.log(this.group)
            if(!this.lname || !this.grade || !this.group.match('A|B')) {
                alert("Please fill all the fields")
                return
            }
            const newStudent = {
                'id': this.students.length,
                'group': this.group,
                'lname': this.lname,
                'grade': this.grade,
            }

            this.students.push(newStudent);
            this.lname = '';
            this.grade = '';
        }
    },
    computed: {
        avg_grade() {
            let avg = 0;
            for(let i=0; i < this.students.length; i++){
                avg += this.students[i].grade;
            }
            avg /= this.students.length;
            return avg;
        },
        max_grade() {
            let max = 0;
            for(let i=0; i < this.students.length; i++){
                if(this.students[i].grade > max) {
                    max = this.students[i].grade
                }
            }
            return max
        }
    }
}
</script>