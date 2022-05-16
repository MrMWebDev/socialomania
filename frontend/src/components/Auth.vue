<template>
    <v-app id="auth">
        
        <v-container class="auth">
            

            <div class="auth__boutons">
                <v-btn class="auth__boutons--ind" color="black white--text" @click="component='signup'" rounded>Register</v-btn>
                <v-btn class="auth__boutons--ind" color="black white--text white--hover" @click="component='login'" rounded>Log in</v-btn>
            </div>
            
            <component v-bind:is="component"></component>
            
        </v-container>
        
    </v-app>
</template>

<script>
    import Signup from "./Auth/Signup.vue"
    import Login from "./Auth/Login.vue"

    export default {
        // eslint-disable-next-line vue/multi-word-component-names
        name : "Auth",
        data(){
            return{
                
                component: ""
            }
        },
        
        components: {
            'login': Login,
            'signup': Signup
        }
    }
</script>

<style lang="scss">
    #auth {
        background: no-repeat center top/80% url("../assets/SocialomaniaBlack.png") ;
        display: flex;
        flex-direction: row;

    }
    .auth {
        &__boutons{
            display: flex;
            flex-direction: row;
            justify-content: space-around;
            align-items: center;
            margin-top: 15%;
            margin-bottom: 2%;
            &--ind{
                margin-top: 5%;
                width: 150px ;
                
            }
        }
    }
    
</style>