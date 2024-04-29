<template>
  <div>
    <input type="text" v-model="contents" @keydown="handleKeys">
    <ul>
      <li v-for="(item, index) in value" :key="index">
        {{ item }}
        <button @click="deleteField(index)">Delete</button>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      contents: '',
      value: []
    };
  },
  methods: {
    handleKeys(event) {
      if (event.key === 'Enter') {
        event.preventDefault();
        if (this.contents.length > 0 && this.contents.trim().length > 0) {
          this.value.push(this.contents.trim());
          this.contents = '';
        }
      }

      if (event.key === 'Backspace') {
        if (this.contents.length === 0) {
          event.preventDefault();
          this.contents = this.value.pop() ?? '';
        }
      }
    },
    deleteField(index) {
      this.value.splice(index, 1);
    }
  }
};
</script>
