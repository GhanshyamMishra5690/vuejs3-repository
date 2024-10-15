<script setup lang="ts">
import { computed, onMounted, reactive, ref } from "vue";
import router from "vue-router";
import { useApiStore } from "@/stores/apiStore";
import AddModal from "@/components/AddModal.vue";
import { useGlobalLoader } from "vue-global-loader";
const { displayLoader, destroyLoader } = useGlobalLoader();

import Swal from "sweetalert2";
import Vue3Datatable from "@bhplugin/vue3-datatable";
import "@bhplugin/vue3-datatable/dist/style.css";

//Add Modal
const isAddModalVisible = ref(false);
const openAddModal = () => {
  isAddModalVisible.value = true;
};
const closeAddModal = () => {
  isAddModalVisible.value = false;
};

const apiStore = useApiStore();
const limit = ref(20);
onMounted(async () => {
  getUsers();
});
const getUsers = async () => {
  try {
    loading.value = true;
    await apiStore.fetchUserData(limit.value);
  } catch (error) {
    //console.log(error);
  } finally {
    loading.value = false;
    // destroyLoader();
  }
};
const users = computed(() => apiStore.usersData || []);
const loading: any = ref(true);
const total_rows = ref(0);
const params = reactive({
  current_page: 1,
  pagesize: 10,
  search: "",
});
const columns =
  ref([
    { field: "id", title: "ID", isUnique: true, type: "number" },
    { title: "Name", field: "name" },
    { title: "Email", field: "email" },
    { title: "Role", field: "role" },
    { title: "Date", field: "creationAt", type: "date" },
    {
      title: "Actions",
      field: "actions",
      sortable: false,
    },
  ]) || [];

const viewUser = (user: any) => {
  alert("View User \n" + user.id + ", " + user.name + ", " + user.email);
};
const deleteUser = async (user: any) => {
  // alert("Delete User \n" + user.id + ", " + user.name + ", " + user.email);
  try {
    Swal.fire({
      title: "Deleting...",
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      },
    });

    const response = await apiStore.deleteUser(user.id);
    if (response === true) {
      Swal.fire({
        icon: "success",
        title: "Success",
        text: "User deleted successfully!",
      });
    }
  } catch (err) {
    // If there is an error, show an error alert
    Swal.fire({
      icon: "error",
      title: "Error",
      text: err || "Failed to delete user. Please try again.",
    });
  }
};
const changeServer = (data: any) => {
  // limit.value = data.pagesize;
  // alert(limit.value);
  params.current_page = data.current_page;
  params.pagesize = data.pagesize;

  getUsers();
};
</script>

<template>
  <div class="container">
    <div class="row">
      <div class="card">
        <div class="card-header">
          <div class="row">
            <div class="col-sm-10">
              <h2>Manage <b>User</b></h2>
            </div>
            <div class="col-sm-2">
              <button class="btn btn-success" @click="openAddModal">
                <i class="material-icons">&#xE147;</i>
                <span>Add Quote</span>
              </button>
              <AddModal v-show="isAddModalVisible" @close="closeAddModal" />
            </div>
          </div>
        </div>
        <div class="card-body">
          <div class="mb-5">
            <input
              v-model="params.search"
              class="form-control border"
              type="search"
              placeholder="Search..."
            />
          </div>
          <vue3-datatable
            :columns="columns"
            :rows="users"
            :loading="loading"
            :totalRows="total_rows"
            :hasCheckbox="true"
            :stickyHeader="true"
            :search="params.search"
            @change="changeServer"
          >
            <template #name="data">
              <div class="flex items-center gap-2">
                <img
                  :src="data.value.avatar"
                  class="w-9 h-9 rounded-full max-w-none"
                  alt="user-profile"
                />
                <b> {{ data.value.name }}</b>
              </div>
            </template>
            <template #id="data">
              <strong>{{ data.value.id }}</strong>
            </template>
            <template #actions="data">
              <div class="flex gap-4">
                <button
                  type="button"
                  class="btn btn-success !py-1"
                  @click="viewUser(data.value)"
                >
                  View
                </button>
                <button
                  type="button"
                  class="btn btn-danger !py-1"
                  @click="deleteUser(data.value)"
                >
                  Delete
                </button>
              </div>
            </template>
          </vue3-datatable>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.card {
  width: 1200px;
}
.max-w-none {
  max-width: none;
}
.w-9 {
  width: 2.25rem;
}
.h-9 {
  height: 2.25rem;
}
img {
  border-radius: 20px;
}
</style>
