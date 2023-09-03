<template>
  <body>
    <img
      class="background-img"
      src="../public/assets/todo/bg-desktop-light.jpg"
      alt="background"
      id="background"
    />
    <div class="wrapper">
      <div class="title">
        TODO
        <img
          class="switch"
          id="switch"
          src="../public/assets/todo/icon-moon.svg"
          @click="changeTheme"
          alt="theme"
          :style="{ transform: 'rotate(' + rotateDegrees + 'deg)' }"
        />
      </div>
      <div class="inputField">
        <button type="radio" @click="addToList" class="radioButton"></button>
        <input placeholder="Add task" type="text" name="" id="input" />
      </div>
      <div class="todoList">
        <div class="list">
          <div
            class="todo"
            @mouseover="handleHover"
            @mouseleave="handleLeave"
            v-for="(todo, index) in toDoList"
            :key="index"
          >
            <input
              type="checkbox"
              @click="complete(index)"
              :checked="todo.completed"
            />
            <p :class="{ underline: todo.completed }">{{ todo.text }}</p>
            <img
              class="clear"
              @click="remove(index)"
              src="../public/assets/todo/icon-cross.svg"
              alt=""
            />
          </div>
        </div>

        <div class="footer">
          <div class="bt-left">{{ toDoList.length }} items left</div>
          <div class="options">
            <span @click="all" class="current" id="All">All</span><span @click="active" id="Active">Active </span><span @click="completed" id="Completed">Completed</span>
             </div>
          <div @click="clear" class="bt-rigth">Clear Completed</div>
        </div>
      </div>
    </div>
  </body>
</template>

<script>
const toDoList = JSON.parse(localStorage.getItem("todo")) || [];
export default {
  name: "App",
  data() {
    return {
      theme: "light",
      toDoList: toDoList,
      rotateDegrees: 0,
    };
  },
  methods: {
    changeTheme() {
      document.body.classList.toggle("dark-mode");
      if (this.theme === "light") {
        this.theme = "dark";
        document.getElementById("background").src =
          "/assets/todo/bg-desktop-dark.jpg";
        document.getElementById("switch").src = "/assets/todo/icon-sun.svg";
        this.rotateDegrees += 360;
      } else {
        this.theme = "light";
        document.getElementById("background").src =
          "/assets/todo/bg-desktop-light.jpg";
        document.getElementById("switch").src = "/assets/todo/icon-moon.svg";
        this.rotateDegrees += 360;
      }
    },
    addToList() {
      const text = document.getElementById("input").value;
      const todo = {
        text,
        completed: false,
      };
      this.toDoList.push(todo);
      console.log(this.toDoList);
      document.getElementById("input").value = "";
      localStorage.setItem("todo", JSON.stringify(this.toDoList));
    },
    complete(index) {
      this.toDoList[index].completed = !this.toDoList[index].completed;
      console.log(this.toDoList[index].completed);

      localStorage.setItem("todo", JSON.stringify(this.toDoList));
    },
    remove(index) {
      this.toDoList.splice(index, 1);
      localStorage.setItem("todo", JSON.stringify(this.toDoList));
    },
    test(e) {
      console.log(e.target, e);
    },
    handleHover(e) {
      if (e.target.children[2]) {
        e.target.children[2].style.display = "block";
      }
    },
    handleLeave(e) {
      if (e.target.children[2]) {
        e.target.children[2].style.display = "none";
      }
    },
    clear() {
      localStorage.clear();
      this.toDoList = [];
    },
    active() {
      this.toDoList = JSON.parse(localStorage.getItem("todo")) || [];
      this.toDoList = this.toDoList.filter((todo) => !todo.completed);
      document.getElementById("Active").classList.add("current");
      document.getElementById("All").classList.remove("current");
      document.getElementById("Completed").classList.remove("current");
     
    },
    completed() {
      this.toDoList = JSON.parse(localStorage.getItem("todo")) || [];
      this.toDoList = this.toDoList.filter((todo) => todo.completed);
      document.getElementById("Completed").classList.add("current");
      document.getElementById("All").classList.remove("current");
      document.getElementById("Active").classList.remove("current");
    },
    all() {
      this.toDoList = JSON.parse(localStorage.getItem("todo")) || [];
      document.getElementById("All").classList.add("current");
      document.getElementById("Completed").classList.remove("current");
      document.getElementById("Active").classList.remove("current");
    },
  },
};
</script>

<style src="../src/styles.css"></style>
