<template>
    <div>
        <v-card :loading="loading" class="mx-auto my-12" max-width="374">
            <CreateAdDialog v-if="dialog" @fechaModal="dialog = false" @updateAds="getAdInfo(game.id)" :game="game" />
            <v-img cover :src="game.bannerUrl"></v-img>
            <v-card-title>{{ game.title }}</v-card-title>

            <v-divider class="mx-4"></v-divider>

            <v-card-text>Anuncios Disponíveis: {{ game._count.ads }}</v-card-text>

            <v-card-text>
            <CheckAdDialog v-if="dialog2" @fechaModal="dialog2 = false" :ad="ad" />
                <v-chip-group column>
                    <v-chip :key="game.id" v-for="ad in ads" height="auto" @click="checkAD(ad)">
                        <v-icon start 
                        :icon="ad.useVoiceChannel ?
                        'mdi-microphone' : 'mdi-microphone-off'"
                        :color="ad.useVoiceChannel ? 'green' : 'red'">
                        </v-icon>
                        <p>
                        {{ ad.discord }}
                        </p>
                    </v-chip>
                </v-chip-group>
            </v-card-text>
            <v-card-actions>
                <v-btn color="deep-purple lighten-2" @click="createAd(game.id)">
                    Criar um Anuncio
                </v-btn>
            </v-card-actions>
        </v-card>
    </div>
</template>

<script lang="ts">
import { Game, Ad } from "~~/types/types";

export default {
    props: {
        game: {
            type: Object,
            required: true,
            default: () => ({
                id: "",
                title: "",
                bannerUrl: "",
                _count: {
                    ads: 0,
                },
            }),
        },
    },
    data: () => ({
        loading: false as boolean,
        gameInfo: {} as Game,
        ads: [] as Array<Ad>,
        ad: {} as Ad,
        dialog2: false as boolean,
        dialog: false as boolean,
    }),

    created() {
        this.getAdInfo(this.game.id);
    },

    methods: {
        createAd(game: Game) {
            this.gameInfo = game;
            this.dialog = true;
        },

        async getAdInfo(id: string) {
            await $fetch<Ad[]>(`http://localhost:3333/games/${id}/ads`).then(
                (data) => {
                    this.ads = data;
                }
            );
        },

        async checkAD(ad: Ad) {
            this.dialog2 = true;
            this.ad = ad;
        },

    },
};
</script>
