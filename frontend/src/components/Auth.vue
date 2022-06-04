<template>
    <v-app id="auth">
        <header class="authHeader">
            <img class="header-logo" src="../assets/SocialomaniaBlack.png" alt="socialomania">
        </header>
        <v-container class="auth">
            
            <div class="auth__boutons">
                <v-btn class="auth__boutons--ind" color="primary white--text" @click="component='signup'" rounded>Register</v-btn>
                <v-btn class="auth__boutons--ind" color="primary white--text white--hover" @click="component='login'" rounded>Log in</v-btn>
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
        background: no-repeat center url("../assets/images/building.png") ;
        background-size: cover;
        display: flex;
        flex-direction: row;
        height: 100%;
    }
    .header-logo{
        height: 95%;
        width: 80%;
    }
    .authHeader {
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
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
                // margin-top: 5%;
                width: 150px ;
                
            }
        }
    }
    @media screen and (min-width: 200px) and (max-width: 640px) {
        #auth {
            background: no-repeat center url("../assets/images/buildings.jpg") ;
            background-size: cover;
            display: flex;
            flex-direction: row;
            height: 100%;
        }
    }
    
</style>