<template>
  <StackLayout class="settings-tab" orientation="vertical">
    <Button class="disconnect" @tap="logout" text="Me déconnecter" />
    <Label :text="preview" />
  </StackLayout>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex';
import { Mode, LoadingIndicator } from 'nativescript-loading-indicator';

export default {
  name: 'Settings',
  data() {
    return {
      showPassword: false,
    };
  },
  computed: {
    ...mapState({
      storeUsername: 'username',
      storePassword: 'password',
    }),
  },
  methods: {
    logout() {
      confirm({
        title: "Déconnexion",
        message: "Êtes-vous sûr de vouloir vous déconnecter ?",
        okButtonText: "Ok",
        cancelButtonText: "Annuler"
      }).then(result => {
        if (result === true) {
          this.$store.dispatch('unsetUser');
        }
      });
    },
  },
}
</script>

<style lang="scss" scoped>
StackLayout.settings-tab {
  padding: 20;

  > Label.bold {
    font-weight: 500;
    font-size: 16;
  }

  Button {
    &.disconnect {
      background-color: #e74c3c;
      color: #fff;
    }
  }
}
</style>
