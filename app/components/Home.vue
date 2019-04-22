<template>
    <Page class="page">
        <ActionBar class="action-bar">
            <Label class="action-bar-title" text="Home"></Label>
        </ActionBar>

        <TabView
            selectedTabTextColor="#42B883"
            androidTabsPosition="bottom">
            <TabViewItem
                class="grades-tab"
                title="Notes"
                textTransform="uppercase">
                <GridLayout rows="auto, *">
                    <Label row="0" class="header" text="Mes notes" />
                    <ListView row="1" for="grade in grades">
                        <v-template>
                            <GridLayout columns="1*, *" class="grade-item">
                                <Label
                                    col="0"
                                    :text="grade.value" />
                                <Label
                                    col="1"
                                    :text="grade.comment"
                                    textWrap="true" />
                            </GridLayout>
                        </v-template>
                    </ListView>
                </GridLayout>
            </TabViewItem>
            <TabViewItem
                title="Paramètres"
                textTransform="uppercase">
                <GridLayout rows="auto, *">
                    <Label row="0" class="header" text="Paramètres" />
                </GridLayout>
            </TabViewItem>
        </TabView>
    </Page>
</template>

<script>
    import axios from 'axios';

    export default {
        created() {
            axios.post('https://nameless-taiga-44756.herokuapp.com/api/student/grades', {
                username: "neil.richter",
                password: "***"
            })
                .then(({ data }) => {
                    this.grades = data.grades;
                })
                .catch(err => console.log(err));
        },
        data() {
            return {
                grades: [],
            };
        },
        computed: {
            message() {
                return "Blank {N}-Vue app";
            }
        }
    };
</script>

<style scoped lang="scss">
    // Start custom common variables
    @import '../app-variables';
    // End custom common variables

    // Custom styles
    .fa {
        color: $accent-dark;
    }

    .info {
        font-size: 20;
    }

    .grades-tab {
        .grade-item {
            padding: 20;
        }
    }
</style>
