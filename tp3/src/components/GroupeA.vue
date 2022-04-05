<template>
    <div class="container">
        <h1>Groupe A</h1>
        <div class="container">
        <form>
        <div class="form-group">
            <input v-model="lname" type="text" class="form-control" name="lname" id="lname" placeholder="Nom">
        </div>
         <div class="form-group">
            <input v-model="grade" type="number" class="form-control" name="grade" id="grade" placeholder="Note" min="0" max="20">
        </div>
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
                    <tr v-bind:key="student.id" v-for="student in students.filter(student => student.group == 'A')">
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
    name: "GroupeA",
    data() {
        return {
            students,
            lname: '',
            grade: '',
        }
    },
    methods: {
        addStudent() {
            if(!this.lname || !this.grade) {
                alert("Please fill all the fields")
                return
            }
            const newStudent = {
                'id': this.students.length,
                'group': 'A',
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
            let students = this.students.filter(student => student.group == 'A')
            for(let i=0; i < students.length; i++){
                avg += students[i].grade;
            }
            avg /= students.length;
            return avg;
        },
        max_grade() {
            let max = 0;
            let students = this.students.filter(student => student.group == 'A')
            for(let i=0; i < students.length; i++){
                if(students[i].grade > max) {
                    max = students[i].grade
                }
            }
            return max
        }
    }
}
</script>