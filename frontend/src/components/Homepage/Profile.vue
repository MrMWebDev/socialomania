<template>
    <div id="profile" class="d-flex justify-center align-content-center">
        <top-header/>
        <v-card class="profCard" height="70%" raised>
            
            <ImageUpload/>
            
            <v-card-title class="my-3 justify-center">
                <h1>My profile</h1>
            </v-card-title>

            <v-card-text class="ml-2 black--text">
                <p>First Name : {{ dataGet.firstName }}</p>
                <p>Last Name : {{ dataGet.lastName }}</p>
                <p>E-mail : {{ dataGet.email }}</p>
            </v-card-text>

            <v-card-actions class="d-flex justify-space-around">
                <v-btn @click.stop="dialogUp=true" title="modify my information">Modify</v-btn>
                <v-btn @click.stop="dialogDel=true" title="delete my profile" color="#b85861">Delete</v-btn>
            </v-card-actions>
        </v-card>

        <v-dialog persistent v-model="dialogUp" max-width="600px">
            <v-card>
                <v-card-title>Edit my profile</v-card-title>
                <v-card-text>
                    <v-form ref="form" v-model="valid">
                        <v-text-field v-model="dataUp.firstName" :rules="firstNameRules" label="First Name" prepend-icon="mdi-account-outline" color="black" required></v-text-field>
                        <v-text-field  v-model="dataUp.lastName" :rules="lastNameRules" label="Last Name" prepend-icon="mdi-account-outline" color="black" required></v-text-field>
                        <v-text-field v-model="dataUp.email" :rules="emailRules" label="E-mail" prepend-icon="mdi-at" color="black" required></v-text-field>
                    </v-form>
                </v-card-text>
                <v-card-actions>
                    <v-btn text @click="dialogUp=false">Cancel</v-btn>
                    <v-btn text :disabled="!valid" @click="updateUser">Confirm</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>

        <v-dialog v-model="dialogDel" max-width="350px">
            <v-card>
                <v-card-title>
                    Are you sure?
                </v-card-title>
                <v-card-text>
                    <p>By deleting your profile, you will also delete all your posts and comments.</p>
                    <p>{{ msg }}</p>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn text @click="dialogDel=false">
                        Cancel
                    </v-btn>
                    <v-btn text @click="deleteUser">
                        Delete my profile
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </div>
</template>

<script>

import TopHeader from "./TopHeader"
import ImageUpload from "./imgUp/ImageUpload"
import axios from "axios"

export default {
    // eslint-disable-next-line vue/multi-word-component-names
    name: "Profile",
    data() {
        return{
            dialogDel: false,
            dialogUp: false,
            msg: "",
            dataGet: { 
                firstName: "",
                lastName: "",
                email: ""
            },
            dataUp: {
                firstName: "",
                lastName: "",
                email: "",
            },
            dataUpS: "",
            valid: true,
            firstNameRules: [
                v => !!v || 'Enter your first name',
                v => /^[A-Za-z]+$/.test(v) || "Your first name is not valid",
            ],
            lastNameRules: [
                v => !!v || 'Enter your last name',
                v => /^[A-Za-z]+$/.test(v) || "Your last name is not valid",
            ],
            emailRules: [
                v => !!v || 'Enter your e-mail',
                v => /.+@.+\..+/.test(v) || "Your email is invalid",
            ],
            component: ""
        }
    },
    methods: {
        deleteUser() {
            
            axios.delete("http://localhost:3000/api/auth/", {headers: {Authorization: 'Bearer ' + localStorage.token}})
            .then(response => {
                let rep = JSON.parse(response.data);
                console.log(rep);
                localStorage.userId = "";
                localStorage.token = "";
                this.$router.push('/');  
            })
            .catch(error => {
                console.log(error);
                this.msg = error  
            })
        },
        updateUser() {
            this.dataUpS = JSON.stringify(this.dataUp);
            axios.put("http://localhost:3000/api/auth/", this.dataUpS, {headers: {'Content-Type': 'application/json', Authorization: 'Bearer ' + localStorage.token}})
            .then(response => {
                let rep = JSON.parse(response.data);
                console.log(rep);
                this.dialogUp = false;
                window.location.assign('http://localhost:8080/Homepage/Profile');
            })
            .catch(error => {
                console.log(error);
                this.msg = error  
            })
        }
    },
    mounted() { 
        axios.get("http://localhost:3000/api/auth/", {headers: {Authorization: 'Bearer ' + localStorage.token}})
            .then(response => {
                let profile = JSON.parse(response.data);
                this.dataGet.email = profile[0].email;
                this.dataGet.firstName = profile[0].firstName;
                this.dataGet.lastName = profile[0].lastName;
                this.dataUp.email = profile[0].email;
                this.dataUp.firstName = profile[0].firstName;
                this.dataUp.lastName = profile[0].lastName;
            })
            .catch(error => {
                console.log(error);
            });    
    },
    
    components: {
        "top-header": TopHeader,
        "ImageUpload": ImageUpload

    }
}
</script>

<style lang="scss">
    .profCard {
        margin-top: 15%;

    }
    .logo{
        margin-top: 5%;
        margin-left: 30%;
    }
    #profile {
        background: no-repeat center url("../../assets/images/building.png");
        background-size: cover;
        display: flex;
        flex-direction: row;
        height: 100%;
    }
@media screen and (min-width: 200px) and (max-width: 640px) {
    #profile {
        padding-left: 10%;
        background: no-repeat center url("../../assets/images/buildings.jpg");
        background-size: cover;
        display: flex;
        flex-direction: row;
        height: 100%;
    }
}
</style>
