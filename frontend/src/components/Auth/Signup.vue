<template>
    <v-app class="signup ma-auto mt-6" v-if="form">
        <v-card class="signup__card" raised>
            <v-card-text>
                <v-form ref="form" v-model="valid">
                    <v-text-field  v-model="dataSignup.firstName" :rules="firstNameRules" label="First Name" prepend-icon="mdi-account-outline" color="black" autofocus required></v-text-field>
                    <v-text-field  v-model="dataSignup.lastName" :rules="lastNameRules" label="Last Name" prepend-icon="mdi-account-outline" color="black" required></v-text-field>
                    <v-text-field  v-model="dataSignup.email" :rules="emailRules" label="E-mail" prepend-icon="mdi-at" color="black" required></v-text-field>
                    <v-text-field  v-model="dataSignup.password" :rules="passRules" error-count="4" type="password" label="Password" prepend-icon="mdi-lock-outline" color="black" required></v-text-field>
                </v-form>
                <template>
                    <div class="text-center">
                        <v-dialog v-model="dialog" persistent width="500">
                        <template v-slot:activator="{ on, attrs }">
                            <v-btn :disabled="!valid" class="primary" rounded v-bind="attrs" v-on="on">Confirm</v-btn>
                        </template>
                        <v-card>
                            <v-card-title class="text-center">
                            Your account was created! <br/>
                            Please log in to access.
                            </v-card-title>
                            <v-divider></v-divider>
                            <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn @click="sendSignup()" class="primary" rounded>Confirm</v-btn>
                            </v-card-actions>
                        </v-card>
                        </v-dialog>
                    </div>
                </template>
                <p v-if="msg">{{ message }}</p>
            </v-card-text>
        </v-card>
    </v-app>
</template>
<script>
import axios from "axios"

export default {
    // eslint-disable-next-line vue/multi-word-component-names
    name : "Signup",
    data(){
        return{
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
                v => /.+@.+\..+/.test(v) || "Your email is not valid",
            ],
            passRules: [
                v => !!v || 'Enter your password',
                v => (v && v.length >= 5) || '5 characters minimum',
                v => /(?=.*[A-Z])/.test(v) || 'At least one capital letter', 
                v => /(?=.*\d)/.test(v) || 'At least one number',
            ],
            dataSignup:{
                firstName: "",
                lastName: "",
                email: "",
                password: "",
            },
            dataSignupS: "", 
            form: true,
            msg: false,
            message: ""
        }
    },
    methods: {
        sendSignup(){
            this.dataSignupS = JSON.stringify(this.dataSignup)
            axios.post('http://localhost:3000/api/auth/signup', this.dataSignupS, {headers: {'Content-Type': 'application/json'}})
            .then(response => {
                let sign = JSON.parse(response.data);
                this.message = sign.message;
                this.form = false;
                this.msg = true;
            })
            .catch(error => {
                console.log(error);
                this.message = error;
                this.msg = true; 
                });
        }
    }
}
</script>
<style lang="scss">
    .signup{
        position: flex;
        flex-direction: row;
        top: 5%;
        width: 350px;
        height: 100px;
        text-align: center;
    }
</style>
