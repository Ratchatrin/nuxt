<template>
  <div>
    <Login v-if="!isAuthenticated" @login-success="handleLoginSuccess"></Login>
    <div v-else class="p-10">
      <div class="flex flex-col justify-center items-center h-full w-full">
        <div
          class="flex flex-col justify-center text-center w-fit max-w-xs bg-slate-300 p-3 text-black mb-10 rounded-lg"
        >
          <p class="text-lg mb-2">ค้นหาหมายเลขใบนำส่ง</p>
          <input
            type="text"
            @change="searchBar"
            placeholder="หมายเลขใบนำส่ง"
            class="p-2 rounded-lg text-center"
          />
          <!-- <button class="bg-white px-2 rounded-lg">ค้นหา</button> -->
        </div>
        <table
          class="border-separate border-spacing-2 border-4 border-slate-400"
        >
          <thead>
            <tr class="border-b-2 border-slate-300">
              <th class="border-b-2 border-slate-300">หมายเลขใบนำส่ง</th>
              <th class="border-b-2 border-slate-300">เลขทะเบียนทดสอบ</th>
              <th class="border-b-2 border-slate-300">ข้อมูลผู้ขอทดสอบ</th>
              <th class="border-b-2 border-slate-300">วันที่ขอทดสอบ</th>
              <th class="border-b-2 border-slate-300">สถานะ</th>
            </tr>
          </thead>
          <tbody v-if="search.length === 0">
            <tr v-for="(detail, index) in data" :key="index">
              <td>{{ detail.id }}</td>
              <td>{{ detail.request_material_testing_document.id }}</td>
              <td>
                {{ detail.user_title }}{{ detail.user_firstname }}
                {{ detail.user_lastname }}
              </td>
              <td>{{ detail.center_send_date }}</td>
              <td
                v-if="detail.is_center_testing === 'Y'"
                class="text-black p-1 rounded-md font-bold bg-green-400"
              >
                ทดสอบเรียบร้อย
              </td>
              <td
                v-if="detail.is_center_testing === 'N'"
                class="text-black p-1 rounded-md font-bold bg-red-400"
              >
                ยังไม่ได้ทดสอบ
              </td>
              <button @click="setSelectId(detail.id)">view</button>
            </tr>
          </tbody>
          <tbody v-else>
            <tr v-for="(detail, index) in search" :key="index">
              <td>{{ detail.id }}</td>
              <td>{{ detail.request_material_testing_document.id }}</td>
              <td>
                {{ detail.user_title }}{{ detail.user_firstname }}
                {{ detail.user_lastname }}
              </td>
              <td>{{ detail.center_send_date }}</td>
              <td
                v-if="detail.is_center_testing === 'Y'"
                class="text-black p-1 rounded-md font-bold bg-green-400"
              >
                ทดสอบเรียบร้อย
              </td>
              <td
                v-if="detail.is_center_testing === 'N'"
                class="text-black p-1 rounded-md font-bold bg-red-400"
              >
                ยังไม่ได้ทดสอบ
              </td>
              <button @click="setSelectId(detail.id)">view</button>
            </tr>
          </tbody>
        </table>
      </div>
      <div v-if="selectId !== ''">
        <Detail :selectId="selectId" />
      </div>
    </div>
  </div>
</template>

<script>
import api from "./api.js";
import Detail from "./detail.vue";
import Login from "./login.vue";

export default {
  name: "index",
  components: {
    Detail,
    Login,
  },
  data() {
    return {
      data: [],
      search: [],
      selectId: "",
      isAuthenticated: false,
    };
  },
  methods: {
    searchBar(ev) {
      this.search = [];
      this.data.map((detail) => {
        if (detail.id === ev.target.value) {
          this.search = [detail];
        }
      });
    },
    setSelectId(ev) {
      this.selectId = ev;
    },
    handleLoginSuccess() {
      this.isAuthenticated = true;
      this.fetchData();
    },
    async fetchData() {
      try {
        const token = localStorage.getItem("authToken");
        this.data = await api.fetchRequests(token);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    },
  },
  mounted() {
    const token = localStorage.getItem("authToken");
    if (token) {
      this.isAuthenticated = true;
      this.fetchData();
    }
  },
};
</script>
<style>
#app {
  padding: 0;
  margin: 0;
  width: 100%;
  height: 100%;
}
body,
#__nuxt {
  height: 100vh;
  width: 100%;
  margin: 0;
  padding: 0;
}
</style>
