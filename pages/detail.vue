<template>
  <div class="flex flex-col w-full justify-center  items-center p-10">
      <div v-for="(detail) in data" class="w-full flex flex-col justify-center items-center">
        <p class="mb-10 text-2xl">หมายเลขใบนำส่ง	: {{ detail.id }}</p>
        <div class="bg-slate-300 rounded-lg p-4  w-full max-w-lg flex flex-col gap-3">
          <p class="text-2xl font-bold">รายละเอียดนัดหมายขอรับบริการทดสอบวัสดุ</p>
          <div class="flex flex-col gap-5">
            <p class="text-xl font-bold">ข้อมูลการนำส่ง</p>
            <div class="flex flex-col gap-3">
              <p><p>จังหวัด</p>{{ detail.testing_province }}</p>
              <p><p>ประเภทการทดสอบ</p>{{ detail.testing_title }}</p>
              <div class="grid grid-cols-2">
                <p><p>วิธีการส่งวัสดุ</p>{{ detail.center_send_sample_by }}</p>
                <p><p>วันที่ต้องการวัสดุ</p>{{ detail.center_send_sample_by }}</p>
              </div>
            </div>
            <p class="text-xl font-bold">ข้อมูลผู้นำส่ง</p>
            <div>
              <div class="grid grid-cols-2 gap-3">
                <p><p>ชื่อ</p>{{ detail.testing_firstname }}</p>
                <p><p>นามสกุล</p>{{ detail.testing_lastname }}</p>
                <p><p>อีเมล</p>{{ detail.testing_email }}</p>
                <p><p>เบอร์โทรศัพท์</p>{{ detail.testing_phone }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    <div v-for="(detail) in data" class="mt-10 w-full flex justify-center items-center">
      <div class="bg-slate-300 rounded-lg p-4  w-full max-w-lg flex flex-col gap-3">
        <p class="text-2xl font-bold">รายละเอียดการทดสอบ</p>
        <div class="flex flex-col gap-5">
          <p class="text-xl font-bold">ข้อมูลผู้ทดสอบ</p>
          <div class="w-8/12 max-w-lg flex flex-col gap-3">
            <div class="grid grid-cols-2 gap-5">
              <p class="text-left">ชื่อ <p>{{ detail.user_title }} {{ detail.user_firstname }}</p></p>
              <p class="text-right">นามสกุล <p>{{ detail.user_lastname }}</p></p>
            </div>
            <div class="grid grid-cols-2 gap-5">
              <p class="text-left"><p>อีเมล</p>{{ detail.testing_email }}</p>
              <p class="text-right">เลขประจำตัวประชาชน<p>{{ detail.user_identification_number }}</p></p>
            </div>
          </div>
        </div>
        <div class="flex flex-col gap-5">
          <p class="text-xl font-bold">ข้อมูลที่อยู่</p>
          <div class="w-8/12 max-w-lg flex flex-col gap-3">
            <div class="grid grid-cols-2 gap-5">
              <p class="text-left">ที่อยู่<p>{{ detail.onsite_address }} </p></p>
              <p class="text-right">ตำบล/แขวง<p>{{ detail.onsite_subdistrict }}</p></p>
              <p class="text-left">อำเภอ<p>{{ detail.onsite_district }}</p></p>
              <p class="text-right">จังหวัด<p>{{ detail.onsite_province }}</p></p>
              <p class="text-left">รหัสไปรษณีย์<p>{{ detail.onsite_postal_code }}</p></p>
          </div>
          </div>
        </div>
        <div class="flex flex-col gap-5">
          <p class="text-xl font-bold">ข้อมูลที่อยู่</p>
          <div class="w-8/12 max-w-lg flex flex-col gap-3">
            <div class="grid grid-cols-2 gap-5">
              <p class="text-left">ชื่อโครงการ<p>{{ detail.project_name }} </p></p>
          </div>
          </div>
        </div>
        <div class="flex flex-col gap-5">
          <p class="text-xl font-bold">ข้อมูลสถานที่ก่อสร้าง</p>
          <div class="w-8/12 max-w-lg flex flex-col gap-3">
            <div class="grid grid-cols-2 gap-5">
              <p class="text-left">ที่อยู่<p>{{ detail.site_address }} </p></p>
              <p class="text-right">หมู่<p>{{ detail.site_moo }}</p></p>
              <p class="text-left">ซอย<p>{{ detail.site_soi }}</p></p>
              <p class="text-right">ถนน<p>{{ detail.site_road }}</p></p>
              <p class="text-left">ตำบล/แขวง<p>{{ detail.site_subdistrict }}</p></p>
              <p class="text-right">อำเภอ<p>{{ detail.site_district }}</p></p>
              <p class="text-left">รหัสไปรษณีย์<p>{{ detail.site_postal_code }}</p></p>
          </div>
          </div>
        </div>
      </div>
    </div>
    <div v-for="(detail) in data" class="mt-10 w-full flex  justify-center items-center">
      <div class="bg-slate-300 rounded-lg p-4 w-full max-w-lg flex flex-col gap-3">
        <p class="text-2xl font-bold">เอกสารแนบ</p>
        <div class="flex justify-between items-center w-10/12">
          <p>{{ detail.fill_attachments[0].file_name }}</p>
          <a :href="detail.fill_attachments[0].file_path" :download="detail.fill_attachments[0].file_name" target="_blank">Download</a>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios";
export default {
  name : "Detail",
  data() {
    return {
      data: [],
    };
  },
  props: {
    selectId: {
      type: String,
      required: true
    }
  },
   watch: {
    selectId: {
      immediate: true,
      handler(newId) {
        if (newId) {
          this.fetchData(newId);
        }
      }
    }
  },
  methods: {
    fetchData(id) {
      axios
        .get(`https://dpt-api-dev.extensionsoft.biz/request/v1/request-testing/${id}`, {
          headers: {
            Authorization:
              "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE3MTkzODI5NjgsImlhdCI6MTcxOTI5NjU2OCwiaXNzIjoiVUlEMjQwNTIwVEYxMjYwIiwidXNlcl9pZCI6IlVJRDI0MDUyMFRGMTI2MCJ9.W3W-Q2VfEiPFdD2MYNsgdmg8Xt-TlqIAAGIZ4FHW60g",
          },
        })
        .then((res) => {
          this.data = [res.data.data];
        });
    }
  }
};
</script>
<style></style>
