<template>
  <!-- eslint-disable max-len -->
  <div>
    <button @click="toggleMessageForm = !toggleMessageForm" type="button" class="btn btn-secondary disabled mb-3 mt-3">Toggle Message Form</button>
    <form v-if="toggleMessageForm" @submit.prevent="addMessage" class="mb-3">
      <div class="form-group">
        <label for="username">Username</label>
        <input v-model="message.username" type="text" class="form-control" id="username" required>
      </div>
      <div class="form-group">
        <label for="subject">Subject</label>
        <input v-model="message.subject" type="text" class="form-control" id="subject" placeholder="Enter a subject..." required>
      </div>
      <div class="form-group">
        <label for="message">Message</label>
        <textarea v-model="message.message" class="form-control" id="message" rows="3" required></textarea>
      </div>
      <div class="form-group">
        <label for="imageURL">Image URL</label>
        <input v-model="message.imageURL" type="url" class="form-control" id="imageURL" placeholder="Enter an image url..." required >
      </div>
      <button type="submit" class="btn btn-primary">Add Message</button>
    </form>
    <div class="list-unstyled" v-for="message in reversedMessages" :key="message._id">
      <div class="media">
        <img v-if="message.imageURL" :src="message.imageURL" class="mr-3" :alt="message.subject">
        <div class="media-body">
          <h4 class="mt-0 mb-1">{{ message.username }}</h4>
          <h5 class="mt-0 mb-1">{{ message.subject }}</h5>
          {{ message.message }}
          <br/>
          <small>{{ message.created }}</small>
        </div>
      </div>
      <hr>
    </div>
  </div>
</template>

<script>
const API_URL = 'http://localhost:2727/messages';

export default {
  name: 'Home',
  data: () => ({
    toggleMessageForm: false,
    messages: [],
    message: {
      username: 'Anonymous',
      subject: '',
      message: '',
      imageURL: '',
    },
  }),
  mounted() {
    fetch(API_URL).then((response) => response.json()).then((result) => {
      this.messages = result;
    });
  },
  computed: {
    reversedMessages() {
      return this.messages.slice().reverse();
    },
  },
  methods: {
    addMessage() {
      fetch(API_URL, {
        method: 'POST',
        body: JSON.stringify(this.message),
        headers: {
          'content-type': 'application/json',
        },
      }).then((response) => response.json()).then((result) => {
        this.messages.push(result);
      });
    },
  },
};
</script>

<style>
hr {
  border-top: 1px solid white;
}

img {
  max-width: 300px;
  height: auto;
}
</style>
