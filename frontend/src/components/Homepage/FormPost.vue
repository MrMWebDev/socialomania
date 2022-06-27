<template>
    <v-app id="formPost">
        <top-header/>
        <h1 class="ml-12 white--text">Forum</h1>
        <v-card class="formPostCard mx-12 ml-16">
            <v-card-title class="m-3">
                <h2>New post</h2>
            </v-card-title>
            
            <v-card-text>
                <v-form ref="form" class="ma-3" v-model="valid" >
                    <v-text-field v-model="dataPost.title" color="black" :rules="titleRules" :counter="50" label="Title" autofocus required></v-text-field>
                    <v-file-input v-model="files" placeholder="Upload your documents" label="File input" multiple prepend-icon="mdi-paperclip">
                        <template v-slot:selection="{ text }">
                        <v-chip small label color="primary">
                            {{ text }}
                        </v-chip>
                        </template>
                    </v-file-input>
                    <v-textarea v-model="dataPost.content" color="black" :rules="contentRules" label="Message" required></v-textarea>
                </v-form>
            </v-card-text>
            

            <v-card-actions>
                <v-btn  :disabled="!valid" rounded class="primary" @click="sendPost">Post</v-btn>
                <v-btn text href="/Homepage/Forum" rounded color="black">Cancel</v-btn>
            </v-card-actions>

        </v-card>
    </v-app>
</template>
<script>
import axios from "axios"
import TopHeader from "./TopHeader"

export default {
    name: "FormPost",
    data(){
        return{
            valid: true,
            titleRules: [
                v => !!v || 'Publication title',
                v => (v && v.length <= 50) || 'The title must be less than 50 characters',

            ],
            files: [],
            contentRules: [
                v => !!v || 'Write your message',
            ],
            dataPost:{
                title: "",
                imageUrl: "null",
                content:"",
                userId: localStorage.userId
            },
            dataPostS: "",
            msg: false,
            message: "",
        }
    },
    methods: {
        sendPost(){
            this.dataPostS = JSON.stringify(this.dataPost);
            axios.post("http://localhost:3000/api/posts/", this.dataPostS, {headers: {'Content-Type': 'application/json', Authorization: 'Bearer ' + localStorage.token}})
                .then(response => {
                    let rep = JSON.parse(response.data);
                    this.message = rep.message;
                    this.msg = true;
                    this.form = false;
                    this.$router.push('/Homepage/Forum')
                    
                })
                .catch(error => {
                    console.log(error); 
                    this.message = error;
                    this.msg = true
                });
        },
        upload(event) {
            this.image = event.target.files[0];
        },
    },
    components: {
        "top-header": TopHeader,
        
    },
}
</script>
<style lang="scss">
    #formPost {
        background: no-repeat center url("../../assets/images/building.png");
        background-size: cover;
        display: flex;
        flex-direction: row;
        height: 100%;
    }
    .formPostCard {
        margin-top: 20vh;
    }
    @media screen and (min-width: 200px) and (max-width: 640px) {
    #formPost {
        background: no-repeat center url("../../assets/images/buildings.jpg");
        background-size: cover;
        display: flex;
        flex-direction: row;
        height: 100%;
    }
    }
</style>