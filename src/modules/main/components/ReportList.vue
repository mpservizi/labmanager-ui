<template>
  <div>
    <v-simple-table>
      <template v-slot:default>
        <thead>
          <tr>
            <th class="text-left text-h5">My Reports</th>
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
  name: 'TaskList',
  components: {},
  data() {
    return {
      msg: 'Componente modello',
      tasks: [
        { id: 1, text: 'rp21lab004' },
        { id: 2, text: 'rp21lab0015' }
      ]
    };
  },
  props: {}
};
</script>

<style scoped></style>
