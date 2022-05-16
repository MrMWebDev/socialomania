<template>
    <v-app id="Homepage">
        <top-header/>
        <router-view></router-view>

        <v-carousel
            id="carousel"
            cycle
            height="auto"
            hide-delimiters
            :show-arrows="false"
            >
            <v-carousel-item
              v-for="(item,i) in items"
              :key="i"
              :src="item.src"
            ></v-carousel-item>
        </v-carousel>      

    </v-app>
</template>
<script>
import TopHeader from "./Homepage/TopHeader"

export default {
    // eslint-disable-next-line vue/multi-word-component-names
    name: "Homepage",
    data(){
        return{
            items: [
            {
                src: require("../assets/images/teamwork2.jpg"),
            },
            {
                src: require("../assets/images/teamwork1.jpg"),
            },
            {
                src: require("../assets/images/teamwork.jpg"),
            },
            ]
            
        }
    },
    components: {
        "top-header": TopHeader,
    },
}
</script>
<style lang="scss">
    #Homepage{
        background: no-repeat center top/50% url("../assets/images/building.png");
        background-size: cover;
        display: flex;
        flex-direction: row;
        
    }
    #carousel{
        width: 60%;
        margin-top: 10%;
        margin-left: 20%;
    }
    .header{
        background-color: rgb(253,45,1);
        color: white;
    }
    @media screen and (min-width: 200px) and (max-width: 640px) {
    #carousel {
    padding-right: 15%;
    width: 80%;
    margin-top: 20%;
    margin-left: 20%;
    } 
    #Homepage{
    background: no-repeat center top/80% url("../assets/SocialomaniaBlack.png") ;
    background-color: #ababaa;
  }
}
        
    
</style>