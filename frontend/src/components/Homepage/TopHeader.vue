<template>
    <div class="head">
        <v-navigation-drawer
            v-model="drawer"
            color="#182a48"
            expand-on-hover
            mini-variant
            mini-variant-width=40
            bottom
            permanent
            absolute
            dark
        >
            <v-list dense nav>
                <v-list-item two-line class="px-0 ">
                    <v-list-item-avatar>
                        <v-img src="../../assets/icon.png" contain></v-img>
                    </v-list-item-avatar>
                        
                    <v-list-item-content>
                        <v-list-item-title class="sideTitle">
                            Socialomania
                        </v-list-item-title>
                    </v-list-item-content>
                </v-list-item>

                <v-divider></v-divider>

                <v-list-item v-for="item in items" :key="item.title">
                    <v-list-item-icon>
                        <v-icon>{{ item.icon }}</v-icon>
                    </v-list-item-icon>

                    <v-list-item-content>
                        <router-link :to=item.link>
                            <v-list-item-title>{{ item.title }}</v-list-item-title>
                        </router-link>
                    </v-list-item-content>
                </v-list-item>

                <v-list-item v-if="this.modo==1">
                    <v-list-item-icon>
                        <v-icon>mdi-security</v-icon>
                    </v-list-item-icon>
                    <v-list-item-content @click="moderation" class="link">
                        <v-list-item-title>Moderation</v-list-item-title>
                    </v-list-item-content>
                </v-list-item>

                <v-list-item>
                    <v-list-item-icon>
                        <v-icon>mdi-logout-variant</v-icon>
                    </v-list-item-icon>
                    <v-list-item-content @click="logout" class="link">
                        <v-list-item-title>Log out</v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
            </v-list>
        </v-navigation-drawer>
    </div>
</template>

<script>
export default {
    name : 'TopHeader',
    data(){
        return {
            modo: "",
            drawer: true,
            items: [
                { title: 'Homepage', icon: 'mdi-home', link: '/Homepage'  },
                { title: 'Profile', icon: 'mdi-account', link: '/Homepage/Profile'},
                { title: 'Forum', icon: 'mdi-forum', link: '/Homepage/Forum' },
            ],
        }
    },
    methods: {
        logout(){
            localStorage.userId = "";
            localStorage.token = "";
            localStorage.moderation = "";
            this.$router.push('/');
        },
        moderation(){
            this.$router.push('/Homepage/Moderation')
        }
    },
    mounted(){
        this.modo = localStorage.moderation;
    },
}
</script>

<style lang="scss">
    .theme--dark.v-icon {
        color: #fed7d7;
    }
    .sideTitle {
        color: #b85861;
    }
    a {
        text-decoration: none;
        color: #fed7d7!important;
        
    }
    a:hover {
        color: #b85861!important;
        text-decoration: underline;     
    }
    .link {
        cursor: pointer;
        color: #fed7d7
    }
    .link:hover {
        color: #b85861!important;
        text-decoration: underline;
    }
</style>