<template>
  <Page class="page">
    <ActionBar :title="grade.project">
      <NavigationButton text="Back" icon="res://ic_arrow_back" @tap="goBack" />
    </ActionBar>
    <GridLayout rows="*">
      <ScrollView class="view" row="0" orientation="vertical">
        <Label class="label" textWrap="true" :text="grade.comment"></Label>
      </ScrollView>
    </GridLayout>
  </Page>
</template>

<script>
export default {
  name: 'GradeDetail',
  props: {
    grade: {
      required: true,
    },
  },
  methods: {
    goBack() {
      this.$navigateBack();
    },
  },
  filters: {
    formattedProject(grade) {
      return `${grade.ECUE} - ${grade.project}`;
    }
  }
};
</script>

<style lang="scss" scoped>
  .label {
    padding: 10;
    margin: 0;
  }
</style>
