<template>
  <div v-if="detail">
    <p class="mb-10 text-2xl">หมายเลขใบนำส่ง : {{ detail.id }}</p>
    <div
      class="bg-slate-300 rounded-lg p-4 w-full max-w-lg flex flex-col gap-3"
    >
      <p class="text-2xl font-bold">รายละเอียดนัดหมายขอรับบริการทดสอบวัสดุ</p>
      <div class="flex flex-col gap-5">
        <p class="text-xl font-bold">ข้อมูลการนำส่ง</p>
        <div class="flex flex-col gap-3">
          <p><span>จังหวัด:</span> {{ detail.testing_province }}</p>
          <p><span>ประเภทการทดสอบ:</span> {{ detail.testing_title }}</p>
          <div class="grid grid-cols-2">
            <p>
              <span>วิธีการส่งวัสดุ:</span> {{ detail.center_send_sample_by }}
            </p>
            <p>
              <span>วันที่ต้องการวัสดุ:</span> {{ detail.center_send_date }}
            </p>
          </div>
        </div>
        <p class="text-xl font-bold">ข้อมูลผู้นำส่ง</p>
        <div class="grid grid-cols-2 gap-3">
          <p><span>ชื่อ:</span> {{ detail.testing_firstname }}</p>
          <p><span>นามสกุล:</span> {{ detail.testing_lastname }}</p>
          <p><span>อีเมล:</span> {{ detail.testing_email }}</p>
          <p><span>เบอร์โทรศัพท์:</span> {{ detail.testing_phone }}</p>
        </div>
      </div>
    </div>
    <div v-if="detail.fill_attachments.length > 0" class="mt-10">
      <div
        class="bg-slate-300 rounded-lg p-4 w-full max-w-lg flex flex-col gap-3"
      >
        <p class="text-2xl font-bold">เอกสารแนบ</p>
        <div
          v-for="attachment in detail.fill_attachments"
          :key="attachment.id"
          class="flex justify-between items-center w-10/12"
        >
          <p>{{ attachment.file_name }}</p>
          <a
            :href="attachment.file_path"
            :download="attachment.file_name"
            target="_blank"
            >Download</a
          >
        </div>
      </div>
    </div>
  </div>
  <div v-else>
    <p>Loading...</p>
  </div>
</template>

<script>
import api from "./api.js";
export default {
  name: "Detail",
  props: {
    selectId: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      detail: null,
    };
  },
  async mounted() {
    if (this.selectId) {
      await this.fetchDetails(this.selectId);
    }
  },
  watch: {
    selectId: {
      immediate: true,
      handler(newVal) {
        if (newVal) {
          this.fetchDetails(newVal);
        }
      },
    },
  },
  methods: {
    async fetchDetails(id) {
      try {
        const token = localStorage.getItem("authToken");
        const response = await api.fetchRequestDetails(token, id);
        this.detail = response;
      } catch (error) {
        console.error("Error fetching details:", error);
      }
    },
  },
};
</script>
<style></style>
