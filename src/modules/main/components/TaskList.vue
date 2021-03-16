<template>
  <div>
    <v-simple-table>
      <template v-slot:default>
        <thead>
          <tr>
            <th class="text-left text-h5">My Tasks</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in tasks" :key="item.id">
            <td>{{ item.text }}</td>
          </tr>
        </tbody>
      </template>
    </v-simple-table>
  </div>
</template>

<script>
export default {
  name: "TaskList",
  components: {},
  data() {
    return {
      msg: "Componente modello",
      tasks: [
        { id: 1, text: "Task 1" },
        { id: 2, text: "Task 2" },
        { id: 3, text: "Task 3" },
        { id: 4, text: "Task 4" },
      ],
    };
  },
  props: {},
};
</script>

<style scoped></style>
