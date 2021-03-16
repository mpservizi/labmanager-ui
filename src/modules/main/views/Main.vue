<template>
  <div>
    <v-row>
      <v-col>
        <TaskList />
      </v-col>
      <v-col>
        <ReportList />
      </v-col>
    </v-row>
  </div>
</template>

<script>
// @ is an alias to /src
import TaskList from "./../components/TaskList.vue";
import ReportList from "./../components/ReportList.vue";
export default {
  name: "Main",
  components: {
    TaskList,
    ReportList,
  },
};
</script>
