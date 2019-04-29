<template>
  <Page backgroundSpanUnderStatusBar="true" actionBarHidden="true">
    <FlexboxLayout alignItems="center" justifyContent="center">
      <StackLayout v-if="!loading" orientation="vertical">
        <Label class="title" text="Sup'Intranet" horizontalAlignment="stretch" />
        <Label class="field-label" text="Identifiant:" />
        <TextField hint="ada.lovelace" v-model="username" />
        <Label class="field-label" text="Mot de passe:" />
        <TextField hint="********" v-model="password" secure="true" />
        <Button @tap="checkConnexion" text="Connexion" />
      </StackLayout>
      <StackLayout v-if="loading">
        <Label text="Vérification..." horizontalAligment="center" textWrap="true" />
        <ActivityIndicator busy="true" />
      </StackLayout>
    </FlexboxLayout>
  </Page>
</template>

<script>
import { mapActions } from 'vuex';
import { Mode, LoadingIndicator } from 'nativescript-loading-indicator';

export default {
  name: 'Login',
  data() {
    return {
      loading: false,
      username: '',
      password: '',
    };
  },
  methods: {
    checkConnexion() {
      const { username, password } = this;
      this.$store.dispatch('checkCredentials', { username, password })
        .then(({ data }) => {
          this.$store.dispatch('setUser', data);
        })
        .catch(err => {
          console.error(err);
          alert({
            title: "Echec de la connexion",
            message: "Identifiants incorrects ou service indisponible. Vérifiez vos informations de connexion ou votre connexion internet et réessayez",
            okButtonText: "OK"
          });
        });
    },
  },
};
</script>

<style lang="scss" scoped>
Page {
  background-color: #e4978c;
  height: 100%;

  > FlexboxLayout {
    height: 100%;
    width: 100%;
    padding: 0;

    > StackLayout {
      background-color: #fff;
      width: 100%;
      margin: 30;
      padding: 20;

      > Label {
        &.title {
          font-size: 24dp;
          text-align: center;
          color: rgba(#000, .8);
          font-weight: 600;
          margin-bottom: 20;
        }

        &.field-label {
          color: rgba(#000, .8);
          font-size: 18;
          text-transform: uppercase;
        }
      }

      > TextField {
        font-size: 16;
      }

      > Button {
        background-color: #ed631c;
        color: #fff;
        font-weight: 600;
        font-size: 18;
      }
    }
  }
}
</style>
