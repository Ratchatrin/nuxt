<template>
  <div class="p-10">
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
      <table class="border-separate border-spacing-2 border-4 border-slate-400">
        <thead>
          <tr class="border-b-2 border-slate-300">
            <th class="border-b-2 border-slate-300">หมายเลขใบนำส่ง</th>
            <th class="border-b-2 border-slate-300">เลขทะเบียนทดสอบ</th>
            <th class="border-b-2 border-slate-300">ข้อมูลผู้ขอทดสอบ</th>
            <th class="border-b-2 border-slate-300">วันที่ขอทดสอบ</th>
            <th class="border-b-2 border-slate-300">สถานะ</th>
          </tr>
        </thead>
        <tbody v-if="search == 0">
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
        <tbody v-if="search != 0">
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
</template>
<script>
import axios from "axios";
import Detail from "./detail.vue";
export default {
  name: "index",
  components: {
    Detail,
  },
  data() {
    return {
      data: [],
      search: [],
      selectId: "",
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
  },
  mounted() {
    axios
      .get(
        "https://dpt-api-dev.extensionsoft.biz/request/v1/requests-testing?page=1&page_size=10"
      )
      .then((res) => {
        this.data = res.data.data;
      });
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
