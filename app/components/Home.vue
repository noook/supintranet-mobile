<template>
  <Page class="page">
    <ActionBar class="action-bar">
      <Label class="action-bar-title" :text="tabs[activeTab]"></Label>
    </ActionBar>

    <TabView :selectedIndex="activeTab" @selectedIndexChange="tabChanged" selectedTabTextColor="#42B883" androidTabsPosition="bottom">
      <TabViewItem class="grades-tab" title="Notes" textTransform="uppercase">
        <StackLayout orientation="vertical">
          <ActivityIndicator v-if="!loaded" class="grades-loading" :busy="!loaded" />
          <Label class="error" v-if="error" text="Impossible de récupérer les notes. Vérifiez les informations de connexion ou votre connexion internet et réessayez" textWrap="true"></Label>
          <RadListView
            ref="listView"
            for="grade in grades"
            layout="linear"
            pullToRefresh="true"
            @itemTap="goToDetail"
            @pullToRefreshInitiated="refreshGrades">
            <v-template>
              <GridLayout columns="*,auto" class="grade-item">
                <Label col="0" :text="grade | formattedProject" textWrap="true" />
                <label col="1" :text="grade.value" />
              </GridLayout>
            </v-template>
          </RadListView>
        </StackLayout>
      </TabViewItem>
      <TabViewItem title="Paramètres" textTransform="uppercase">
        <Settings />
      </TabViewItem>
    </TabView>
  </Page>
</template>

<script>
import axios from "axios";
import GradeDetail from "./GradeDetail.vue";
import Settings from './Settings';
import { mapGetters, mapActions } from 'vuex';
import { LoadingIndicator, Mode } from "nativescript-loading-indicator";

export default {
  components: {
    Settings,
  },
  created() {
    this.getGrades()
      .then(() => {
        this.error = false,
        this.loaded = true;
      })
      .catch(() => {
        this.error = true;
        this.loaded = true;
      });
  },
  data() {
    return {
      activeTab: 0,
      input: {
        username: '',
        password: '',
      },
      error: false,
      loaded: false,
      tabs: [
        'Notes',
        'Paramètres',
      ],
    }
  },
  computed: {
    ...mapGetters([
      'username',
      'password',
      'grades',
    ]),
  },
  methods: {
    ...mapActions([
      'setUser',
      'unsetUser',
      'getGrades',
      'checkCredentials',
    ]),
    goToDetail({ item }) {
      this.$navigateTo(GradeDetail, {
        props: {
          grade: item,
        },
      });
    },
    refreshGrades({ object }) {
      this.$nextTick(() => {
        this.getGrades()
          .then(() => {
            object.notifyPullToRefreshFinished();
          })
          .catch(err => console.log(err));
      });
    },
    tabChanged({ value }) {
      this.activeTab = value;
    },
  },
  filters: {
    formattedProject(grade) {
      return `${grade.ECUE} - ${grade.project}`;
    }
  }
};
</script>

<style scoped lang="scss">
// Start custom common variables
@import "../app-variables";
// End custom common variables

// Custom styles
.fa {
  color: $accent-dark;
}

.info {
  font-size: 20;
}

.grades-tab {
  .error {
    margin: 20;
    font-weight: 600;
    color: rgba(#c00, .5);
  }

  .grades-loading {
    margin: 30 0;
  }

  .grade-item {
    padding: 15;
  }
}
</style>
