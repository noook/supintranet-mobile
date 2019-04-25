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
      <TabViewItem class="settings-tab" title="Paramètres" textTransform="uppercase">
        <StackLayout orientation="vertical">
          <Label class="bold" text="Informations de connexion" textWrap="true" />
          <TextField hint="ada.lovelace" v-model="input.username" autocorrect="false" />
          <TextField hint="*****" v-model="input.password" :secure="!showPassword" autocorrect="false" />
          <Button @tap="checkConnexion" text="Vérifier la connexion" />
          <Button @tap="logout" text="Me déconnecter" />
          <Label :text="preview" />
        </StackLayout>
      </TabViewItem>
    </TabView>
  </Page>
</template>

<script>
import axios from "axios";
import GradeDetail from "./GradeDetail.vue";
import { mapGetters, mapActions } from 'vuex';
import { ObservableArray } from 'tns-core-modules/data/observable-array';

export default {
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
      showPassword: false,
      preview: '',
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
    checkConnexion() {
      this.checkCredentials(this.input)
        .then(({ data }) => {
          this.setUser(data);
          alert({
            title: "Succès",
            message: "Identifiants corrects, rafraîchissez pour obtenir la liste des notes de ce semestre",
            okButtonText: "OK"
          }).then(() => {
            console.log("Alert dialog closed");
          });
        })
        .catch(err => {
          console.error(err);
          alert({
            title: "Echec de la connexion",
            message: "Identifiants incorrects ou service indisponible. Vérifiez vos informations de connexion ou votre connexion internet et réessayez",
            okButtonText: "OK"
          }).then(() => {
            console.log("Alert dialog closed");
          });
        });
    },
    logout() {
      confirm({
        title: "Déconnexion",
        message: "Êtes-vous sûr de vouloir vous déconnecter ?",
        okButtonText: "Ok",
        cancelButtonText: "Annuler"
      }).then(result => {
        if (result === true) {
          this.unsetUser();
        }
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

.settings-tab {
  StackLayout {
    padding: 20;

    > Label.bold {
      font-weight: 500;
      font-size: 16;
    }

    > TextField {
      font-size: 15;
    }
  }
}
</style>
