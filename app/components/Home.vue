<template>
  <Page class="page">
    <ActionBar class="action-bar">
      <Label class="action-bar-title" text="Home"></Label>
    </ActionBar>

    <TabView selectedTabTextColor="#42B883" androidTabsPosition="bottom">
      <TabViewItem class="grades-tab" title="Notes" textTransform="uppercase">
        <StackLayout>
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
        <GridLayout rows="auto, *">
          <Label row="0" class="header" text="Paramètres"/>
        </GridLayout>
      </TabViewItem>
    </TabView>
  </Page>
</template>

<script>
import axios from "axios";
import GradeDetail from "./GradeDetail.vue";
import { ObservableArray } from 'tns-core-modules/data/observable-array';

export default {
  created() {
    this.getGrades();
  },
  data: () => ({
    grades: ObservableArray([]),
  }),
  methods: {
    goToDetail({ item }) {
      this.$navigateTo(GradeDetail, {
        props: {
          grade: item,
        },
      });
    },
    getGrades() {
      return axios.post("https://nameless-taiga-44756.herokuapp.com/api/student/grades", {
          username: "neil.richter",
          password: "****"
        })
        .then(({ data }) => {
          this.grades = data.grades;
        })
        .catch(err => console.log(err));
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
  .grade-item {
    padding: 20;
  }
}
</style>
